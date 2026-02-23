# SIKGGU (식구, 식재료를 구출하라!)

유통기한 임박/B급 신선식품을 위치 기반 실시간 타임세일로 연결하는 동네 기반 O2O 커머스 플랫폼.
**선결제 → 후픽업** 구조로 노쇼 리스크 제거, 사장님 폐기 손실 해소 + 자취생 식비 절감.

## 도메인 용어

| 한국어 | English | 설명 |
|-------|---------|------|
| 타임세일 | Time Sale | 마감 임박 상품의 한시적 할인 판매 |
| 사장님 | Store Owner (STORE) | 판매자 - 동네 마트/청과물점/반찬가게 |
| 자취생/유저 | User (USER) | 구매자 - 1인 가구, 자취생 |
| 찜 | Zzim/Wish | 관심 상품 등록 (FOMO 유발용) |
| 픽업 | Pickup | 매장 방문 수령 |
| 예약 번호 | Reservation Code | 4자리 난수, 구두 전달 (QR 없음) |
| B급 사유 | B-Grade Reason | 상품이 할인되는 이유 설명 |

## 유저 역할 및 권한

| 역할 | 코드 | 주요 권한 |
|------|------|---------|
| 구매자 | `USER` | 상품 조회, 찜, 결제, 내 영수증 조회 |
| 판매자 | `STORE` | 가게 등록/관리, 상품 등록/수정/삭제, 픽업 수령 완료 처리 |

## 핵심 비즈니스 룰

- **환불**: 픽업 마감 1시간 전까지 100% 환불 가능. 이후 환불 불가
- **노쇼**: 선결제 필수이므로 미방문 시에도 사장님 손실 없음 (전액 환불 불가)
- **동시성**: 재고 1개에 다수 동시 결제 시 DB 비관적 락(Pessimistic Lock)으로 초과 결제 방지
- **스케줄링**: 마감 시간 경과 시 자동 EXPIRED 처리 (스케줄러/Cron)
- **픽업 인증**: 예약 번호 4자리 구두 전달 → 사장님이 번호 확인 후 수령 완료 터치
- **위치 기반**: 기본 반경 2km, 최대 5km

## 모노레포 구조

```
sikggu/
├── backend/    # NestJS + TypeScript + Prisma + MySQL
├── frontend/   # React 19 + TypeScript + Vite 7 + Tailwind
└── docs/       # 기획서, PRD, API 명세, 디자인/개발 마일스톤 (PDF)
```

## 백엔드 ↔ 프론트엔드 연결

- API prefix: `/api/`
- 인증: JWT Bearer 토큰 (Authorization 헤더)
- CORS 허용: `localhost:5173`, `localhost:3000`, `localhost:8080`, `https://sikggu-fe.vercel.app`
- 프론트엔드 환경변수: `VITE_API_URL=http://localhost:8080`

## MVP 구현 현황

| 기능 | 백엔드 | 프론트엔드 |
|------|--------|-----------|
| 회원가입/로그인 (JWT) | DONE | DONE |
| 가게 CRUD | DONE | DONE (조회) |
| 상품 등록/수정/삭제 | DONE | TODO (등록 폼) |
| 위치 기반 상품 조회 | DONE (ST_Distance_Sphere) | DONE (리스트) |
| 상품 상세 조회 | DONE | DONE |
| 결제 (PortOne 연동) | TODO | TODO |
| 주문 생성 + 동시성 제어 | TODO | TODO |
| 픽업 수령 완료 처리 | TODO | TODO |
| 내 영수증 조회 | TODO | TODO |
| 찜하기 (Zzim) | TODO | TODO |
| 만료 상품 스케줄링 | TODO | - |
| PWA 설정 | - | TODO |

## 참고 문서 (docs/)

| 파일 | 내용 |
|------|------|
| project-proposal.pdf | 프로젝트 기획서 (서비스 개요, 경쟁사, Phase 2&3 로드맵) |
| prd.md | PRD (화면 정의/IA, 유저 스토리, 기술 스택, NFR) |
| api-spec.md | API 명세서 (전체 엔드포인트 Request/Response 상세) |
| design.pdf | 4주 디자인 마일스톤 |
| milestone.pdf | 4주 개발 마일스톤 |
