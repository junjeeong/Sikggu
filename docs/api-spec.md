# SIKGGU API 명세서 - MVP 기준

## 기본 정보

- **Base URL**: `/api`
- **Content-Type**: `application/json`
- **Authentication**: JWT — `Authorization: Bearer {token}`
- **Roles**: `USER` (구매자), `STORE` (판매자)

## 공통 에러 응답

```json
{
  "statusCode": 400,
  "message": "재고가 소진되었습니다.",
  "error": "OUT_OF_STOCK"
}
```

---

## 1. Auth (인증)

### 1.1 회원가입

`POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123!",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "role": "USER"
}
```
- `role`: `"USER"` 또는 `"STORE"`

**Response (201 Created):**
```json
{
  "message": "회원가입이 완료되었습니다.",
  "userId": 1
}
```

---

### 1.2 로그인

`POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123!"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1...",
  "role": "USER"
}
```

---

## 2. Store (가게) — STORE 전용

### 2.1 내 가게 등록

`POST /api/stores`

**Auth**: Bearer Token (Role: STORE)

**Request Body:**
```json
{
  "name": "우리동네 싱싱마트",
  "address": "서울시 관악구 신림동 123-4",
  "lat": 37.4842,
  "lng": 126.9297,
  "phone": "02-123-4567"
}
```

**Response (201 Created):** 가게 ID 반환

---

## 3. Product (상품)

### 3.1 타임세일 상품 등록

`POST /api/products`

**Auth**: Bearer Token (Role: STORE)

**Request Body:**
```json
{
  "storeId": 1,
  "name": "B급 제주 감귤 1박스",
  "originalPrice": 20000,
  "discountPrice": 6000,
  "stock": 5,
  "expireTime": "2023-11-01T20:00:00Z",
  "bGradeReason": "크기 들쭉날쭉, 껍질 스크래치",
  "imageUrl": "https://storage.example.com/images/1.jpg"
}
```

**Response (201 Created):** 상품 ID 반환

---

### 3.2 위치 기반 주변 상품 조회

`GET /api/products/nearby`

**Query Parameters:**

| 파라미터 | 필수 | 설명 |
|---------|------|------|
| lat | O | 위도 |
| lng | O | 경도 |
| radius | X | 반경 km (기본 2, 최대 5) |
| sort | X | `distance` (거리순) / `expire` (마감임박순) |

**Response (200 OK):**
```json
{
  "products": [
    {
      "id": 101,
      "storeName": "우리동네 싱싱마트",
      "name": "B급 제주 감귤 1박스",
      "discountPrice": 6000,
      "stock": 5,
      "distance": 800,
      "expireTime": "2023-11-01T20:00:00Z",
      "imageUrl": "...",
      "zzimCount": 12
    }
  ]
}
```

- `distance`: 미터 단위
- **NFR**: Spatial Index 활용, 2초 이내 응답

---

### 3.3 상품 상세 조회

`GET /api/products/:id`

상품 상세 정보, B급 사유, 남은 수량, 찜한 이웃 수 반환.

---

### 3.4 상품 수정 / 조기 마감

`PATCH /api/products/:id`

**Auth**: Bearer Token (Role: STORE)

**Request Body (예시):**
```json
{ "status": "CLOSED" }
```
또는
```json
{ "stock": 3 }
```

---

## 4. Order (주문/결제) — 위변조 방지 3단계 플로우

결제 흐름: **사전 준비(Init)** → **PG사 결제** → **서버 검증(Confirm)**

### 4.1 주문 사전 준비 + 재고 임시 선점

`POST /api/orders/init`

**Auth**: Bearer Token (Role: USER)

**Request Body:**
```json
{
  "productId": 101,
  "quantity": 1
}
```

**Response (201 Created):**
```json
{
  "orderId": 5001,
  "amount": 6000,
  "status": "INIT"
}
```

- `amount`: 프론트는 반드시 이 금액으로 PG 결제창 호출
- **NFR (동시성 제어)**: DB 비관적 락으로 재고 안전하게 차감/홀딩

---

### 4.2 결제 검증 + 완료 (핵심)

`POST /api/orders/confirm`

**Auth**: Bearer Token (Role: USER)

**Request Body:**
```json
{
  "orderId": 5001,
  "imp_uid": "imp_1234567890",
  "amount": 6000
}
```

- `imp_uid`: 포트원(PortOne) 결제 고유 번호
- `amount`: 클라이언트가 결제했다고 주장하는 금액 (서버가 PG사와 직접 대조 검증)

**Response (200 OK):**
```json
{
  "message": "결제 및 예약이 완료되었습니다.",
  "orderId": 5001,
  "reservationCode": "9204",
  "status": "PAID"
}
```

- `reservationCode`: 충돌 방지를 위해 난수로 생성된 4자리 고유 번호

---

### 4.3 내 결제/픽업 영수증 조회

`GET /api/orders/my`

**Auth**: Bearer Token (Role: USER)

**Response (200 OK):**
```json
{
  "orders": [
    {
      "orderId": 5001,
      "storeName": "우리동네 싱싱마트",
      "productName": "B급 제주 감귤 1박스",
      "status": "PAID",
      "reservationCode": "9204",
      "pickupDeadline": "2023-11-01T20:00:00Z"
    }
  ]
}
```

- `status`: `PAID` (수령대기) / `COMPLETED` (수령완료) / `CANCELED` (취소)

---

### 4.4 매장 방문 수령 완료 처리

`PATCH /api/orders/pickup`

**Auth**: Bearer Token (Role: STORE)

**Request Body:**
```json
{
  "storeId": 1,
  "reservationCode": "9204"
}
```

**Response (200 OK):**
```json
{
  "message": "수령 완료 처리되었습니다.",
  "orderId": 5001,
  "status": "COMPLETED"
}
```

---

## 5. Wish/Zzim (찜)

### 5.1 찜하기 / 취소하기 (토글)

`POST /api/products/:id/wish`

**Auth**: Bearer Token (Role: USER)

**Response (200 OK):**
```json
{
  "isWished": true,
  "currentZzimCount": 13
}
```

- 마감 30분 전 찜한 유저에게 푸시 알림 트리거
- 상품 상세에 "현재 이웃 N명이 찜했어요!" 노출 (FOMO 유발)

---

## API 요약 테이블

| Method | Path | Auth | Role | 설명 |
|--------|------|------|------|------|
| POST | `/api/auth/signup` | X | - | 회원가입 |
| POST | `/api/auth/login` | X | - | 로그인, JWT 발급 |
| POST | `/api/stores` | O | STORE | 가게 등록 |
| POST | `/api/products` | O | STORE | 상품 등록 |
| GET | `/api/products/nearby` | X | - | 위치 기반 상품 조회 |
| GET | `/api/products/:id` | X | - | 상품 상세 |
| PATCH | `/api/products/:id` | O | STORE | 상품 수정/조기 마감 |
| POST | `/api/products/:id/wish` | O | USER | 찜 토글 |
| POST | `/api/orders/init` | O | USER | 주문 생성 + 재고 선점 |
| POST | `/api/orders/confirm` | O | USER | 결제 검증 + 완료 |
| GET | `/api/orders/my` | O | USER | 내 영수증 조회 |
| PATCH | `/api/orders/pickup` | O | STORE | 수령 완료 처리 |
