export interface ProductListResponse {
  store: StoreResponse;
  products: ProductResponse[];
}

export interface StoreResponse {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface ProductResponse {
  id: number;
  store: string; // Keep for compatibility if individual product still has it, or remove if backend removed it. I'll keep it for safety unless it causes issues.
  name: string;
  ProductCategory: ProductCategory;
  imageUrl: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  quantity: number;
  saleDeadline: string;
  createdAt: string;
  status: ProductStatus;
}

export type ProductCategory =
  | "ALL"
  | "VEGETABLE"
  | "FRUIT"
  | "MEAT_EGG"
  | "SEAFOOD"
  | "GRAIN"
  | "MEAL_KIT"
  | "DAIRY_CHEESE"
  | "PROCESSED"
  | "FROZEN_REFRIGERATED";

export const PRODUCT_CATEGORY_LABEL: Record<ProductCategory, string> = {
  ALL: "전체",
  VEGETABLE: "채소",
  FRUIT: "과일",
  MEAT_EGG: "정육·계란",
  SEAFOOD: "해산물",
  GRAIN: "곡류",
  MEAL_KIT: "밀키트",
  DAIRY_CHEESE: "유제품·치즈",
  PROCESSED: "가공식품",
  FROZEN_REFRIGERATED: "냉동·냉장",
};

export type ProductStatus = "AVAILABLE" | "SOLD_OUT" | "EXPIRED" | "STOPPED";

export const PRODUCT_STATUS_LABEL: Record<ProductStatus, string> = {
  AVAILABLE: "판매 가능",
  SOLD_OUT: "재고 소진",
  EXPIRED: "마감됨",
  STOPPED: "판매 중단",
};
