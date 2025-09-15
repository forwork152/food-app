import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import SignUp from "./UI/auth/Signup";
import MainLayput from "./UI/Main/MainLayput";
import Login from "./UI/auth/Login";
import UserProfile from "./UI/pages/user/UserProfile";
import ForgotPassword from "./UI/auth/ForgetPassword";
import HeroSection from "./UI/pages/HeroSection";
import SearchPage from "./UI/pages/SearchPage";
import ViewMenu from "./UI/pages/ViewMenu";
import Cart from "./UI/pages/Cart";
import AddResturents from "./UI/admin/AddResturents";
import AddMenu from "./UI/admin/AddMenu";
import AdminOrder from "./UI/admin/AdminOrder";
import UserOrderPage from "./UI/pages/user/UserOrderPage";
import { UserStore } from "./store/UserStroe";
import { useEffect } from "react";
import { useThemeStore } from "./store/UseThemeStore";
import CaptainSignUp from "./UI/auth/admin/CaptainSignUp";
import CaptainLogin from "./UI/auth/admin/CaptainLogin";
import Auth from "./UI/pages/Auth";

import Loading from "./UI/pages/utils/Loading";
import Dashboard from "./UI/Layout/Dashboard";
import RestaurantTable from "./UI/admin/Data/AllRestaurents";
import AllUsers from "./UI/admin/Data/AllUsers";
import FoodPandaDashboard from "./UI/admin/DashboardHome";
import axios from "axios";

function App() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.baseURL = API_URL;

  // Protected Routes

  const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthentiacte } = UserStore();
    if (!isAuthentiacte) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const AuthRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthentiacte } = UserStore();
    if (isAuthentiacte) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  // admin route
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isAdmin, isCheckAuth } = UserStore();

    if (isCheckAuth) {
      return (
        <div className="w-full flex items-center justify-center h-screen">
          <Loading />
        </div>
      );
    }

    if (!user?.isAdmin || !isAdmin) {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayput />,
      children: [
        { path: "/", element: <HeroSection /> },
        // user-page

        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          ),
        },

        // auth
        {
          path: "/login",
          element: (
            <AuthRoutes>
              <Login />
            </AuthRoutes>
          ),
        },
        {
          path: "/signup",

          element: (
            <AuthRoutes>
              <SignUp />
            </AuthRoutes>
          ),
        },

        {
          path: "/forget-password",
          element: (
            <AuthRoutes>
              <ForgotPassword />
            </AuthRoutes>
          ),
        },
        {
          path: "/auth",
          element: (
            <AuthRoutes>
              <Auth />
            </AuthRoutes>
          ),
        },
        {
          path: "/restaurant-signup",
          element: (
            <AuthRoutes>
              <CaptainSignUp />
            </AuthRoutes>
          ),
        },
        {
          path: "/restaurant-login",
          element: (
            <AuthRoutes>
              <CaptainLogin />
            </AuthRoutes>
          ),
        },
        {
          path: "/order-status",
          element: (
            <ProtectedRoutes>
              <UserOrderPage />
            </ProtectedRoutes>
          ),
        },

        // main pages
        { path: "/search/:text", element: <SearchPage /> },
        { path: "/resturent-menu/:id", element: <ViewMenu /> },
        {
          path: "/cart-page",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },

        // Admin

        {
          path: "/admin",
          element: (
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          ),
          children: [
            { index: true, element: <FoodPandaDashboard /> }, // default content
            { path: "users", element: <AllUsers /> },
            { path: "resturent/:id", element: <RestaurantTable /> },
            { path: "add-resturents", element: <AddResturents /> },
            { path: "menus", element: <AddMenu /> },
            { path: "orders", element: <AdminOrder /> },
          ],
        },
      ],
    },
  ]);
  const { CheckingAuth, isCheckAuth } = UserStore();
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    CheckingAuth(); // 🔐 Step 2: Check auth
    initializeTheme(); // 🎨 Step 3: Init theme
  }, [CheckingAuth, initializeTheme, API_URL]);

  if (isCheckAuth) {
    return <Loading />;
  }

  return (
    <>
      <main>
        <RouterProvider router={appRouter}></RouterProvider>
      </main>
    </>
  );
}

export default App;
