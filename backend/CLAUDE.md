# SIKGGU Backend

## 기술 스택 (PRD 기준)

| 항목 | 도구 |
|------|-----|
| Framework | NestJS |
| Language | TypeScript |
| ORM | Prisma |
| DB | MySQL |
| Auth | JWT (Bearer Token) |
| PG 결제 | PortOne (포트원) |

## 프로젝트 구조 (NestJS 권장)

```
src/
├── auth/          # 인증 모듈 (JWT 발급, 회원가입, 로그인)
├── user/          # 유저 모듈 (프로필 조회/수정)
├── store/         # 가게 모듈 (등록/수정/조회, 위치 기반)
├── product/       # 상품 모듈 (타임세일 CRUD, 위치 기반 조회)
├── order/         # 주문/결제 모듈 (Init → Confirm → Pickup)
├── wish/          # 찜 모듈 (토글, FOMO 카운트)
├── common/        # 공통 (에러 필터, 가드, 데코레이터)
├── prisma/        # Prisma 서비스 및 스키마
├── app.module.ts
└── main.ts
```

## DB 스키마 (DDL 기준)

### User
| 필드 | 타입 | 제약 | 설명 |
|------|------|------|------|
| id | INT | PK | 고유 식별자 |
| email | VARCHAR(255) | NOT NULL | 로그인 아이디 |
| password | VARCHAR(255) | NOT NULL | 해시 처리된 비밀번호 |
| name | VARCHAR(50) | NOT NULL | 이름 |
| phone | VARCHAR(20) | NOT NULL | 연락처 |
| role | ENUM('USER','STORE') | NOT NULL | 구매자/판매자 |
| createdAt | DATETIME | DEFAULT CURRENT_TIMESTAMP | 가입 일시 |
| updatedAt | DATETIME | DEFAULT CURRENT_TIMESTAMP | 수정 일시 |

### Store
| 필드 | 타입 | 제약 | 설명 |
|------|------|------|------|
| id | INT | PK | 고유 식별자 |
| ownerId | INT | NOT NULL, FK → User.id | 가게 사장님 |
| name | VARCHAR(100) | NOT NULL | 가게명 |
| address | VARCHAR(255) | NOT NULL | 가게 전체 주소 |
| lat | DECIMAL(10,8) | NOT NULL | 위도 |
| lng | DECIMAL(11,8) | NOT NULL | 경도 |
| phone | VARCHAR(20) | NOT NULL | 매장 전화번호 |
| createdAt | DATETIME | DEFAULT CURRENT_TIMESTAMP | 등록 일시 |

### Product (타임세일 상품)
| 필드 | 타입 | 제약 | 설명 |
|------|------|------|------|
| id | INT | PK | 고유 식별자 |
| storeId | INT | NOT NULL, FK → Store.id | 등록한 가게 |
| name | VARCHAR(255) | NOT NULL | 상품명 |
| originalPrice | INT | NOT NULL | 원가 |
| discountPrice | INT | NOT NULL | 할인가 |
| stock | INT | NOT NULL, DEFAULT 0 | 남은 재고 (동시성 제어 대상) |
| expireTime | DATETIME | NOT NULL | 마감 시간 (스케줄링 기준) |
| bGradeReason | TEXT | NULL | B급 사유 |
| imageUrl | VARCHAR(255) | NOT NULL | 상품 이미지 URL |
| status | ENUM('OPEN','CLOSED','EXPIRED') | DEFAULT 'OPEN' | 판매 상태 |
| wishCount | INT | DEFAULT 0 | 찜 횟수 (반정규화) |
| createdAt | DATETIME | DEFAULT CURRENT_TIMESTAMP | 등록 일시 |

### Order (주문)
| 필드 | 타입 | 제약 | 설명 |
|------|------|------|------|
| id | INT | PK | 고유 식별자 (주문번호) |
| userId | INT | NOT NULL, FK → User.id | 구매자 |
| productId | INT | NOT NULL, FK → Product.id | 구매 상품 |
| quantity | INT | NOT NULL | 구매 수량 |
| amount | INT | NOT NULL | 총 결제 금액 |
| impUid | VARCHAR(255) | NULL | 포트원 결제 고유 번호 |
| reservationCode | VARCHAR(10) | NULL | 픽업용 4자리 난수 번호 |
| status | ENUM('INIT','PAID','COMPLETED','CANCELED') | DEFAULT 'INIT' | 주문 상태 |
| pickupDeadline | DATETIME | NOT NULL | 픽업 마감 기한 |
| createdAt | DATETIME | DEFAULT CURRENT_TIMESTAMP | 주문 생성 일시 |
| updatedAt | DATETIME | DEFAULT CURRENT_TIMESTAMP | 상태 변경 일시 |

### Wish (찜)
| 필드 | 타입 | 제약 | 설명 |
|------|------|------|------|
| id | INT | PK | 고유 식별자 |
| userId | INT | NOT NULL, FK → User.id | 찜한 사용자 |
| productId | INT | NOT NULL, FK → Product.id | 찜한 상품 |
| createdAt | DATETIME | DEFAULT CURRENT_TIMESTAMP | 찜한 일시 |

## Enum 값

```
UserRole: USER, STORE
ProductStatus: OPEN, CLOSED, EXPIRED
OrderStatus: INIT, PAID, COMPLETED, CANCELED
```

## API 엔드포인트 (API 명세서 기준)

### Auth (`/api/auth`)
| Method | Path | Auth | 설명 |
|--------|------|------|------|
| POST | `/signup` | X | 회원가입 (role: USER/OWNER) |
| POST | `/login` | X | 로그인, JWT 발급 |

### Store (`/api/stores`) — STORE 전용
| Method | Path | Auth | 설명 |
|--------|------|------|------|
| POST | `/` | O (STORE) | 가게 등록 |

### Product (`/api/products`)
| Method | Path | Auth | 설명 |
|--------|------|------|------|
| POST | `/` | O (STORE) | 타임세일 상품 등록 |
| GET | `/nearby?lat=&lng=&radius=2&sort=` | X | 위치 기반 주변 상품 조회 |
| GET | `/:id` | X | 상품 상세 (B급 사유, 찜 수 포함) |
| PATCH | `/:id` | O (STORE) | 상품 수정 / 조기 마감 |
| POST | `/:id/wish` | O (USER) | 찜 토글 |

### Order (`/api/orders`)
| Method | Path | Auth | 설명 |
|--------|------|------|------|
| POST | `/init` | O (USER) | 주문 생성 + 재고 임시 선점 (비관적 락) |
| POST | `/confirm` | O (USER) | PG 결제 검증 + 최종 완료 (imp_uid 대조) |
| GET | `/my` | O (USER) | 내 결제/픽업 영수증 조회 |
| PATCH | `/pickup` | O (STORE) | 예약번호로 수령 완료 처리 |

## 공통 에러 응답 포맷

```json
{
  "statusCode": 400,
  "message": "재고가 소진되었습니다.",
  "error": "OUT_OF_STOCK"
}
```

## 핵심 구현 포인트

### 1. 위치 기반 조회 (NFR: 2초 이내)
- MySQL Spatial Index (POINT 타입) 활용
- `ST_Distance_Sphere`로 반경 내 상품 필터링
- 정렬: `distance` (거리순) / `expire` (마감임박순)

### 2. 결제 동시성 제어 (NFR: 초과 결제 0%)
- `/orders/init` 시 Prisma `$transaction` + 비관적 락으로 재고 임시 선점
- 제한 시간(5분) 내 미결제 시 재고 롤백

### 3. 결제 위변조 방지
- 프론트 → `/orders/init` (서버가 amount 결정)
- 프론트 → PG 결제창 (서버 amount로 호출)
- 프론트 → `/orders/confirm` (imp_uid + amount 전달)
- 서버 → 포트원 API로 실제 결제 금액 검증 후 확정

### 4. 만료 상품 스케줄링
- Cron 또는 NestJS `@Cron` 데코레이터로 마감 시간 경과 상품 자동 EXPIRED 처리

## 개발 마일스톤 (4주)

| 주차 | 목표 |
|------|------|
| 1주차 | 프로젝트 세팅, Prisma 스키마, Auth/Store/Product API |
| 2주차 | 주문/결제 API (동시성 제어), 포트원 연동 |
| 3주차 | 찜 API, 스케줄러, 나머지 엔드포인트 완성 |
| 4주차 | 스트레스 테스트, 최적화, 프로덕션 배포 |

## 실행 방법

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```
