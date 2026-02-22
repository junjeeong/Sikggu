import ProductDetailPage from "@/pages/products/ProductDetailPage";
import StoreProductsPage from "@/pages/store/StoreProductsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import HomePage from "./pages/home/HomePage";
import StoresPage from "./pages/store/StoresPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route
          path="/stores/:storeId/products"
          element={<StoreProductsPage />}
        />
        <Route
          path="/stores/:storeId/products/:productId"
          element={<ProductDetailPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
