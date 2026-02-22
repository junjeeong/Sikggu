import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HeaderAndBottomNavLayout from "@/components/layout/HeaderAndBottomNavLayout";
import ProductDescription from "@/components/ProductDescription";
import ProductThumbnail from "@/components/ProductThumbnail";
import StoreInformation from "@/components/StoreInformation";
import productApi from "@/api/product";

const ProductDetailPage = () => {
  const { storeId, productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", storeId, productId],
    queryFn: () =>
      productApi.getProductById(Number(storeId), Number(productId)),
    enabled: !!storeId && !!productId,
  });

  if (isLoading) {
    return (
      <HeaderAndBottomNavLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>상품 상세 정보를 불러오는 중입니다...</p>
        </div>
      </HeaderAndBottomNavLayout>
    );
  }

  if (isError || !product) {
    return (
      <HeaderAndBottomNavLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>상품을 찾을 수 없습니다.</p>
        </div>
      </HeaderAndBottomNavLayout>
    );
  }

  return (
    <HeaderAndBottomNavLayout>
      <ProductThumbnail imageUrl={product.imageUrl} />
      <StoreInformation storeName={product.store} />
      <ProductDescription info={product} />
    </HeaderAndBottomNavLayout>
  );
};

export default ProductDetailPage;