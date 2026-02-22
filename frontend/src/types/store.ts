export interface StoreResponse {
  id: number;
  storeName: string;
  address: string;
  latitude: number;
  longitude: number;
  storeContactNumber: string;
  description?: string;
  imageUrl?: string;
}

export interface StoreListResponse {
  list: StoreResponse[];
}

export interface CreateStoreRequest {
  storeName: string;
  storeContactNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
  image_url?: string;
}
