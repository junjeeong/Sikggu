import { Link } from "react-router-dom";

const SignUpIntroPage = () => {
  const baseButtonStyle =
    "w-full text-center py-3.5 text-white font-bold rounded-xl transition-all duration-200 bg-sikggu-primary hover:bg-sikggu-primary/90 active:scale-[0.98] shadow-md shadow-green-100 shrink-0";

  return (
    <main className="flex items-center justify-center w-full h-screen overflow-hidden bg-gray-50 p-4">
      <div className="flex flex-col w-full max-w-[500px] h-full max-h-[90vh] gap-4">
        {/* 사장님 버튼 */}
        <div className="bg-white shadow-sm border border-gray-100 w-full flex-1 flex flex-col items-center justify-center p-6 rounded-2xl transition-transform hover:translate-y-[-2px] min-h-0">
          <div className="flex flex-col justify-center w-full gap-1 mb-2 shrink-0">
            <h2 className="text-2xl font-black text-center text-gray-800">
              사장님
            </h2>
            <p className="text-center text-sm text-gray-500 break-keep">
              마트를 등록하고 당장 팔아야 하는 <br />
              신선한 식자재를 올려주세요
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center w-full py-2 min-h-0">
            <img
              src="/images/character_owner.png"
              alt="캐릭터_사장님"
              className="object-contain h-full max-h-[160px] w-auto"
            />
          </div>
          <Link to={"/sign-up?type=store"} className={baseButtonStyle}>
            마트 등록하러 가기
          </Link>
        </div>

        {/* 자취생/1인 가구 버튼 */}
        <div className="bg-white shadow-sm border border-gray-100 w-full flex-1 flex flex-col items-center justify-center p-6 rounded-2xl transition-transform hover:translate-y-[-2px] min-h-0">
          <div className="flex flex-col justify-center w-full gap-1 mb-2 shrink-0">
            <h2 className="text-2xl font-black text-center text-gray-800">
              일반 회원
            </h2>
            <p className="text-center text-sm text-gray-500 break-keep">
              주변의 식자재 마트를 찾고, <br />
              필요했던 식재료를 저렴하게 득템하세요
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center w-full py-2 min-h-0">
            <img
              src="/images/character_user.png"
              alt="캐릭터_자취생및1인가구"
              className="object-contain h-full max-h-[160px] w-auto"
            />
          </div>
          <Link to={"/sign-up?type=user"} className={baseButtonStyle}>
            식재료 찾으러 가기
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpIntroPage;
