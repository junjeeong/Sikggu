import axiosInstance from "@/api/axiosInstance";
import type {
  ProductCategory,
  ProductListResponse,
  ProductResponse,
} from "@/types/product";

const productApi = {
  getProductsByStoreId: async (storeId: number, category?: ProductCategory) => {
    const response = await axiosInstance.get<ProductListResponse>(
      `/api/v1/stores/${storeId}/products`,
      {
        params: {
          category: category && category !== "ALL" ? category : undefined,
        },
      }
    );
    return response.data;
  },
  getProductById: async (storeId: number, productId: number) => {
    const response = await axiosInstance.get<ProductResponse>(
      `/api/v1/stores/${storeId}/products/${productId}`
    );
    return response.data;
  },
};

export default productApi;
