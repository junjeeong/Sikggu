import type {
  CreateStoreRequest,
  StoreListResponse,
  StoreResponse,
} from "@/types/store";
import axiosInstance from "./axiosInstance";

const storeApi = {
  /** 전체 마트 조회  */
  getAllStores: async (): Promise<StoreListResponse> => {
    const response = await axiosInstance.get<StoreListResponse>(
      "/api/v1/stores"
    );
    return response.data;
  },

  /** 주변 마트 조회  */
  getNearbyStores: async (): Promise<StoreListResponse> => {
    const response = await axiosInstance.get<StoreListResponse>(
      "/api/v1/stores/nearby"
    );
    return response.data;
  },

  /** 내 가게 조회 (사장님 전용) */
  getMyStore: async (): Promise<StoreResponse> => {
    const response = await axiosInstance.get<StoreResponse>(
      "/api/v1/stores/me"
    );
    return response.data;
  },

  /** 가게 등록 (사장님 전용) */
  createStore: async (data: CreateStoreRequest): Promise<StoreResponse> => {
    const response = await axiosInstance.post<StoreResponse>(
      "/api/v1/stores",
      data
    );
    return response.data;
  },
};

export default storeApi;
