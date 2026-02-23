# SIKGGU Frontend

## 기술 스택

| 항목 | 버전/도구 |
|------|---------|
| Framework | React 19.2.0 |
| Language | TypeScript 5.9 |
| Build | Vite 7.2 |
| Styling | Tailwind CSS 3.4 |
| Router | React Router 7.10 |
| State (Client) | Zustand 5.0 |
| State (Server) | TanStack Query 5.90 |
| Form | React Hook Form 7.70 + Zod 4.3 |
| HTTP | Axios 1.13 |
| Animation | Framer Motion 12.23 |
| Icons | React Icons 5.5 |
| Test | Vitest 4.0 + Testing Library |

## 디렉토리 구조

```
src/
├── api/          # Axios 인스턴스 + API 모듈 (auth, store, product)
├── components/   # 재사용 가능 UI 컴포넌트 (layout, card, button, svg)
├── pages/        # 페이지 컴포넌트 (auth, home, store, products)
├── store/        # Zustand 글로벌 상태 (useAuthStore)
├── types/        # TypeScript 인터페이스 (auth, product, store)
├── utils/        # 유틸리티 함수 (cn)
├── mock/         # 목업 데이터
├── App.tsx       # 라우팅 설정
├── main.tsx      # 엔트리포인트 (QueryClient 설정)
└── index.css     # 글로벌 스타일 (Pretendard 폰트, 스크롤바 숨김)
```

## 컴포넌트 생성 규칙

모든 컴포넌트는 반드시 다음을 포함:
1. **`.stories.tsx`** — Storybook 문서
2. **`.test.tsx`** — 유닛 테스트 (Vitest + Testing Library)
3. **JSDoc** — 컴포넌트/함수 설명
4. **다크 모드** — `dark:` 프리픽스로 지원
5. **인라인 스타일 금지** — Tailwind만 사용
6. **모바일 퍼스트** — 반응형 디자인

코딩 페르소나: **"Pragmatic Junior"** — 가독성 우선, 과도한 추상화 지양, 한국어 주석으로 "왜"를 설명

## 디자인 시스템

### 컬러 팔레트 (tailwind.config.js)
```
sikggu-primary-50:  #E8F5E5  (배경)
sikggu-primary-300: #9ACD8A  (액센트)
sikggu-primary-500: #6AB94D  (메인 그린, DEFAULT)
sikggu-primary-700: #458532  (호버/다크 버튼)
sikggu-primary-900: #2A511C  (가장 진한)

sikggu-gray-100: #F5F5F5  (인풋 배경)
sikggu-gray-300: #D3D3D3  (보더)
sikggu-gray-500: #888888  (기본 텍스트)
sikggu-gray-700: #333333  (제목/강조)

error: #E53E3E    safe: #38A169
kakao-yellow: #FEE500    google-blue: #4285F4
```

### 폰트
- 기본: **Pretendard** (한국어 친화)

### 유틸리티
```typescript
// src/utils/cn.ts — Tailwind 클래스 병합
cn(...inputs) = twMerge(clsx(inputs))
```

## 상태 관리 전략

| 계층 | 도구 | 용도 |
|------|------|------|
| 글로벌 클라이언트 상태 | Zustand | 인증 토큰 (`useAuthStore`) |
| 서버 상태 | TanStack Query | API 데이터 캐싱, 자동 리페칭 |
| 로컬 UI 상태 | useState | 캐러셀 슬라이드, 페이지네이션 등 |

### useAuthStore
```typescript
token: string | null
setToken(token): void  // localStorage + state 동시 저장
logout(): void         // localStorage 클리어
isAuthenticated: boolean
```

## API 클라이언트 패턴

```
src/api/axiosInstance.ts  → baseURL: VITE_API_URL, JWT 인터셉터
src/api/auth.ts           → signIn, userSignUp, storeSignUp
src/api/store.ts          → getAllStores, getNearbyStores, getMyStore, createStore
src/api/product.ts        → getProductsByStoreId, getProductById
```

- 인터셉터가 `localStorage.getItem("accessToken")`을 자동으로 Authorization 헤더에 주입
- 환경변수: `.env.local`의 `VITE_API_URL=http://localhost:8080`

## 라우팅 구조

| Path | 페이지 | 설명 |
|------|--------|------|
| `/` | HomePage | 랜딩/히어로, 상품 캐러셀 |
| `/sign-in` | SignInPage | 로그인 (이메일/비밀번호) |
| `/sign-up` | SignUpPage | 회원가입 (역할 선택 → 폼) |
| `/stores` | StoresPage | 전체 가게 목록 |
| `/stores/:storeId/products` | StoreProductsPage | 가게별 상품 (카테고리 필터) |
| `/stores/:storeId/products/:productId` | ProductDetailPage | 상품 상세 |

## Type 정의 패턴

```
src/types/auth.ts     → UserRole, SignInRequest, AuthResponse, ...
src/types/product.ts  → ProductResponse, ProductCategory, ProductStatus, ...
src/types/store.ts    → StoreResponse, StoreListResponse, CreateStoreRequest
```

- Enum 타입은 string union: `"USER" | "STORE"`
- 한국어 라벨 lookup 객체: `PRODUCT_CATEGORY_LABEL`, `PRODUCT_STATUS_LABEL`

## Path Alias

`@` → `src/` (vite.config.ts + tsconfig.app.json)

## 구현 완료 vs TODO

**완료:**
- 로그인/회원가입 (역할 선택, 폼 검증)
- 가게 목록/상세 조회
- 상품 목록/상세 조회 (카테고리 필터)
- 공통 레이아웃 (Header, BottomNavigation)
- Zustand 인증 상태 관리
- Tailwind 디자인 시스템

**TODO (MVP 잔여):**
- 위치 기반 홈 화면 (Geolocation API → 주변 상품)
- 결제 플로우 (PortOne 클라이언트 SDK, Checkout UI)
- 마이페이지 (영수증 목록, 예약 번호 확인)
- 사장님 대시보드 (타임세일 목록, 픽업 대기)
- 상품 등록 폼 (이미지 업로드)
- 픽업 관리 화면 (예약 번호 검색, 수령 완료)
- 찜하기 기능
- PWA 설정 (manifest.json, Service Worker, A2HS)
- 에러 바운더리 및 빈 상태(Empty State) UI

## 실행 방법

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # 타입 체크 + 빌드
npm run lint     # ESLint
```
