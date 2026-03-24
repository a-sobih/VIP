import { RouterProvider, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect } from "react";
import router from "./routes/router.jsx";
import { getTokenFromQuery } from "./utils/getTokenFromQuery.js";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserId } from "./rtk/features/authSlice.js";

export default function App() {
  const { i18n } = useTranslation();
  // change dir with language at the same time.
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
  }, [i18n.language]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />;
    </>
  );
}
