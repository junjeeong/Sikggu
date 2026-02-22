import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductInformationCard from "@/components/card/ProductInformationCard";
import HeaderAndBottomNavLayout from "@/components/layout/HeaderAndBottomNavLayout";
import ProductMenuNavBar from "@/components/ProductMenuNavBar";
import NoStoreItemMessage from "@/components/NoStoreItemMessage";
import productApi from "@/api/product";
import type { ProductCategory } from "@/types/product";

const StoreProductsPage = () => {
  const { storeId } = useParams();
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>("ALL");

  // Fetch products using TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", storeId, selectedCategory],
    queryFn: () =>
      productApi.getProductsByStoreId(Number(storeId), selectedCategory),
    enabled: !!storeId, // Only fetch if storeId is present
  });

  const products = data?.products || [];
  const storeInfo = data?.store;

  if (isLoading) {
    // Simple loading state
    return (
      <HeaderAndBottomNavLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>상품 목록을 불러오는 중입니다...</p>
        </div>
      </HeaderAndBottomNavLayout>
    );
  }

  if (isError) {
    // Simple error state
    return (
      <HeaderAndBottomNavLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>상품 정보를 불러오는데 실패했습니다.</p>
        </div>
      </HeaderAndBottomNavLayout>
    );
  }

  return (
    <HeaderAndBottomNavLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* 1. Hero Banner Area (Store Image + Info) */}
        <section className="relative w-full h-72 shrink-0">
          <img
            src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzB7oAA46R42G4ahbOKIvKyKm2B7XuiS2SPmKUeJjB66Ztez5Hp4rIqprdTfUlC5ErnmzPYAcV052lTA2JUHEfx9_5bysqfofaGE8E49ZjM-TDX19ItPXiaZ7H7c7YAPZlVaE8=w520-h350-n-k-no"
            alt="store_banner"
            className="object-cover w-full h-full"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Store Info Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-white/20 backdrop-blur-sm rounded border border-white/30 text-white">
                영업중
              </span>
              <span className="text-xs font-light text-gray-200">
                {storeInfo?.address || "위치 정보 확인 불가"}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {storeInfo?.name || "상점 정보 확인 불가"}
            </h1>
          </div>
        </section>

        {/* 2. Sticky Category Navbar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100/50">
          <ProductMenuNavBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* 3. Product List Area */}
        <section className="flex-1 px-4 py-6 pb-24">
          <ul className="flex flex-col gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <li
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <ProductInformationCard
                    info={product}
                    storeId={Number(storeId)}
                  />
                </li>
              ))
            ) : (
              <div className="mt-10">
                <NoStoreItemMessage
                  message="등록된 상품이 없습니다."
                  subMessage="다른 카테고리를 선택하거나 나중에 다시 확인해주세요."
                />
              </div>
            )}
          </ul>
        </section>
      </div>
    </HeaderAndBottomNavLayout>
  );
};

export default StoreProductsPage;