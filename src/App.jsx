import { RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect } from "react";
import router from "./routes/router.jsx";
import { getTokenFromQuery } from "./utils/getTokenFromQuery.js";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { i18n } = useTranslation();
  // const {t} = useTranslation("auth") // لازم تحدد لو مقسمين ملفات الترجمة

  // change dir with language at the same time.
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    const token = getTokenFromQuery("token");
    const userId = getTokenFromQuery("userId")
    if (token) {
      localStorage.setItem("token", token);
    }
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [])

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={router} />;
    </>
  );
}
