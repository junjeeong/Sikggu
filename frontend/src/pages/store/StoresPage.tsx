import { useQuery } from "@tanstack/react-query";
import storeApi from "@/api/store";
import StoreInformationCard from "@/components/card/StoreInformationCard";
import HeaderAndBottomNavLayout from "@/components/layout/HeaderAndBottomNavLayout";
import type { StoreResponse } from "@/types/store";

const StoresPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: () => storeApi.getAllStores(),
  });

  const stores = data?.list || [];

  if (isLoading) {
    return (
      <HeaderAndBottomNavLayout>
        <div className="flex items-center justify-center h-screen">
          <p className="font-medium text-slate-500">
            상점 정보를 구출하는 중...
          </p>
        </div>
      </HeaderAndBottomNavLayout>
    );
  }

  return (
    <HeaderAndBottomNavLayout>
      <ul className="h-screen pb-[60px] overflow-scroll scrollbar-hide">
        {stores.length > 0 ? (
          stores.map((store: StoreResponse) => (
            <li key={store.id}>
              <StoreInformationCard info={store} />
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh] text-slate-400">
            <p>등록된 상점이 없습니다.</p>
          </div>
        )}
      </ul>
    </HeaderAndBottomNavLayout>
  );
};

export default StoresPage;