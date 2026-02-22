import HeaderAndBottomNavLayout from "@/components/layout/HeaderAndBottomNavLayout";
import { useEffect, useState } from "react";
import { BiChevronRight, BiMapPin } from "react-icons/bi";
import { BsPercent } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % liveProducts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <HeaderAndBottomNavLayout className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950">
      <div className="py-8 text-center">
        <h3 className="text-xl font-bold leading-snug text-slate-800 dark:text-slate-100">
          우리 동네 마트{" "}
          <span className="text-orange-500 underline underline-offset-4">
            마감 세일
          </span>
          <br />
          놓치기엔 너무 아까운{" "}
          <span className="text-sikggu-primary">신선함</span>
        </h3>
      </div>

      {/* 1. 스토리텔링 히어로 섹션 */}
      <section className="px-6 pb-16 space-y-16">
        <div className="space-y-4">
          <div className="overflow-hidden shadow-lg rounded-3xl aspect-video bg-slate-200 dark:bg-gray-800">
            <img
              src="/images/home1.png"
              alt="재고 처리에 고심하는 마트 사장님"
              className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="px-2">
            <h2 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white">
              "버리기엔 너무 아까운데..."
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              매일 밤, 멀쩡한 식재료들이 유통기한만으로 쓰레기통으로 향합니다.
              <span className="block mt-1 text-sm text-slate-400 dark:text-slate-500">
                사장님들의 한숨은 깊어만 갑니다.
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden shadow-lg rounded-3xl aspect-video bg-slate-200 dark:bg-gray-800">
            <img
              src="/images/home2.png"
              alt="라면으로 끼니를 해결하는 자취생"
              className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="px-2 text-right">
            <h2 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white">
              "애호박 하나가 3천 원?"
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              건강한 요리를 하고 싶지만, 높은 식재료비에 오늘도 라면입니다.
              <span className="block mt-1 text-sm text-slate-400 dark:text-slate-500">
                물가 부담은 너무나 큽니다.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. 해결책 제안 섹션 */}
      <section className="px-10 py-16 text-center bg-gradient-to-br from-emerald-50 to-sikggu-primary-50 dark:from-emerald-900/20 dark:to-sikggu-primary/20">
        <div>
          <div className="flex justify-center w-full">
            <img
              src="/images/logo_mini.png"
              alt="logo"
              width={600}
              height={100}
              className="opacity-80 dark:invert"
            />
          </div>
          <h1 className="text-3xl font-black leading-snug text-slate-900 dark:text-white">
            버려지는 아까움과 치솟는 부담,
            <br />
            <span className="mt-2 text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sikggu-primary">
              식구
            </span>
            가 해결합니다.
          </h1>
          <p className="max-w-md mx-auto mt-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            서로가 서로를 필요로 하는 순간을
            <br />
            <b className="font-extrabold text-emerald-600 dark:text-emerald-400">
              위치 기반 마감 할인 서비스
            </b>
            로 빠르게 연결합니다.
          </p>
          <button
            onClick={() => navigate("/sign-up")}
            className="w-full py-5 mt-10 text-lg font-bold text-white transition-all shadow-2xl bg-gradient-to-r from-emerald-500 to-sikggu-primary rounded-2xl hover:shadow-emerald-300 active:scale-95 dark:shadow-none"
          >
            식구 가입하고 식자재 구출하기
            <BiChevronRight className="inline-block w-5 h-5 ml-1" />
          </button>
        </div>
      </section>

      {/* 3. 라이브 캐러셀 */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between px-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-2 h-2 bg-red-500 rounded-full"></span>
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              LIVE 구출 대기 중
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            실시간 업데이트
          </span>
        </div>

        <div className="relative px-6 overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / 1.3)}%)`,
            }}
          >
            {liveProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 overflow-hidden transition-all bg-white border shadow-md cursor-pointer w-80 rounded-2xl border-slate-100 hover:shadow-xl hover:scale-105 dark:bg-gray-800 dark:border-gray-700 dark:shadow-none"
              >
                <div className="relative h-48">
                  <img
                    src={product.image}
                    className="object-cover w-full h-full"
                    alt={product.name}
                  />
                  <div className="absolute flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-red-500 rounded-lg shadow-lg top-3 left-3">
                    <BsPercent className="w-3 h-3" />
                    {product.discountRate}% 할인
                  </div>
                  <div className="absolute flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-white rounded-lg shadow-lg bottom-3 right-3 text-slate-700 dark:bg-gray-900 dark:text-gray-300">
                    <CgLock className="w-3 h-3" />
                    {product.deadline} 마감
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <BiMapPin className="w-3 h-3" />
                    <span className="font-medium">{product.storeName}</span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span>{product.distance}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-slate-900 line-clamp-1 dark:text-white">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-sm line-through text-slate-400 dark:text-slate-500">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {product.salePrice.toLocaleString()}원
                    </span>
                  </div>
                  <div className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    재고{" "}
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {product.stock}개
                    </span>{" "}
                    남음
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 캐러셀 인디케이터 */}
        <div className="flex justify-center gap-2 mt-6">
          {liveProducts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx
                  ? "w-8 bg-emerald-500"
                  : "w-2 bg-slate-300 dark:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4. 서비스 혜택 */}
      <section className="px-6 py-12 bg-slate-50 dark:bg-gray-950">
        <h2 className="mb-10 text-3xl font-bold text-center text-slate-900 dark:text-white">
          <span className="font-bold text-sikggu-primary-500">SIKGGU</span>는
          이런 가치를 만들어요
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 transition-all bg-white shadow-sm rounded-3xl hover:shadow-md dark:bg-gray-900 dark:shadow-none">
            <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl rounded-2xl bg-emerald-50 dark:bg-emerald-900/30">
              🌱
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">
              환경 보호
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              버려지는 음식물 쓰레기를 줄여 탄소 배출을 예방합니다
            </p>
          </div>
          <div className="p-6 transition-all bg-white shadow-sm rounded-3xl hover:shadow-md dark:bg-gray-900 dark:shadow-none">
            <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl rounded-2xl bg-amber-50 dark:bg-amber-900/30">
              🤝
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">
              상생 경제
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              우리 동네 마트의 재고 소진을 돕고 수익을 창출합니다
            </p>
          </div>
          <div className="p-6 transition-all bg-white shadow-sm rounded-3xl hover:shadow-md dark:bg-gray-900 dark:shadow-none">
            <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl rounded-2xl bg-orange-50 dark:bg-orange-900/30">
              🍱
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">
              건강한 식탁
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              저렴한 가격으로 신선한 요리 재료를 얻을 수 있습니다
            </p>
          </div>
          <div className="p-6 transition-all bg-white shadow-sm rounded-3xl hover:shadow-md dark:bg-gray-900 dark:shadow-none">
            <div className="flex items-center justify-center w-12 h-12 mb-4 text-2xl rounded-2xl bg-blue-50 dark:bg-blue-900/30">
              🏃
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">
              퇴근길 줍줍
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              복잡한 배달 없이 퇴근길에 슥- 들러서 가져가세요
            </p>
          </div>
        </div>
      </section>

      {/* 5. 최종 CTA */}
      <section className="px-6 pt-24 pb-12 text-center bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-950">
        <h2 className="text-3xl font-black leading-tight text-slate-900 dark:text-white">
          오늘 저녁 메뉴는
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sikggu-primary">
            구출한 식재료
          </span>
          로 만들어보실래요?
        </h2>
        <p className="max-w-sm mx-auto mt-4 text-sm text-slate-600 dark:text-slate-400">
          지금 가입하고 내 주변 마감 할인 식재료를 확인하세요
        </p>
        <button
          onClick={() => navigate("/stores")}
          className="w-full py-5 mt-10 text-lg font-bold text-white transition-all shadow-2xl bg-gradient-to-r from-emerald-500 to-sikggu-primary rounded-2xl hover:shadow-emerald-300 active:scale-95 dark:shadow-none"
        >
          내 주변 마트 둘러보기
          <BiChevronRight className="inline-block w-5 h-5 ml-1" />
        </button>
        <div className="pt-3 mt-12 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-600">
            © 2025 SIKGGU. 식재료를 구출하라!
            <br />
            당신의 현명한 소비가 지구를 살립니다
          </p>
        </div>
      </section>
    </HeaderAndBottomNavLayout>
  );
};

const liveProducts = [
  {
    id: 1,
    name: "못난이 양송이버섯 500g",
    storeName: "신촌청과마트",
    originalPrice: 3000,
    salePrice: 1200,
    discountRate: 60,
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600",
    distance: "250m",
    stock: 3,
    deadline: "19:30",
  },
  {
    id: 2,
    name: "한우 국거리 300g (당일 마감)",
    storeName: "동네정육점",
    originalPrice: 26500,
    salePrice: 14500,
    discountRate: 45,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600",
    distance: "420m",
    stock: 2,
    deadline: "20:00",
  },
  {
    id: 3,
    name: "유기농 애호박 2개 (흠집)",
    storeName: "우리마트",
    originalPrice: 3200,
    salePrice: 950,
    discountRate: 70,
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600",
    distance: "120m",
    stock: 5,
    deadline: "19:00",
  },
  {
    id: 4,
    name: "손질된 대파 1단 (당일 입고)",
    storeName: "연남청과",
    originalPrice: 2500,
    salePrice: 1000,
    discountRate: 60,
        image: "https://via.placeholder.com/600",
    distance: "550m",
    stock: 8,
    deadline: "21:00",
  },
  {
    id: 7,
    name: "꿀부사 사과 4입 (봉지)",
    storeName: "서강프레시",
    originalPrice: 12000,
    salePrice: 5900,
    discountRate: 51,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600",
    distance: "180m",
    stock: 3,
    deadline: "18:45",
  },
  {
    id: 8,
    name: "우유 식빵 (연희베이커리 당일)",
    storeName: "우리동네 빵집",
    originalPrice: 4500,
    salePrice: 2000,
    discountRate: 55,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    distance: "300m",
    stock: 2,
    deadline: "19:00",
  },
  {
    id: 9,
    name: "냉동 볶음밥 3종 골라담기",
    storeName: "편의점 플러스",
    originalPrice: 9900,
    salePrice: 4500,
    discountRate: 54,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600",
    distance: "450m",
    stock: 12,
    deadline: "23:00",
  },
  {
    id: 10,
    name: "손질 고등어 2마리 (국내산)",
    storeName: "동교수산",
    originalPrice: 8500,
    salePrice: 3800,
    discountRate: 55,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600",
    distance: "620m",
    stock: 3,
    deadline: "18:30",
  },
];

export default HomePage;