import Auth from "./components/Auth";
import DashBoard from "./pages/DashBoard";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import RecipesPage from "./layout/RecipesPage";
import Cart from "./components/Cart";
import ForgotPassword from "./components/ForgotPassword";
import MyOrders from './pages/MyOrders';
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";
import { loginStatus } from "./store/authSlice";


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginStatus());
  });
  return (
    <>
      <Header />
      {/* Add spacing so content doesn't go behind fixed header/footer */}
      <Container style={{ paddingTop: "10px", paddingBottom: "80px" }}>
        <Routes>
          {!isLoggedIn && (
            <>
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
            </>
          )}
          {isLoggedIn && (
            <>
              <Route path="/home" element={<DashBoard />} />
              <Route path="/category/:categoryName" element={<RecipesPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path='/myorders' element={<MyOrders />} />
            </>
          )}
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
