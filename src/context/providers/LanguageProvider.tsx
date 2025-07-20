import { LanguageContext } from "../LanguageContext";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage or default to Arabic
  const [isArabic, setIsArabic] = useState<boolean>(() => {
    const saved = localStorage.getItem("isArabic");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Update document properties and persist to localStorage
  useEffect(() => {
    if (isArabic) {
      document.documentElement.lang = "ar";
      document.documentElement.style.direction = "rtl";
    } else {
      document.documentElement.lang = "en";
      document.documentElement.style.direction = "ltr";
    }
    localStorage.setItem("isArabic", JSON.stringify(isArabic));
  }, [isArabic]);

  const toggleIsArabic = () => {
    setIsArabic((prev) => !prev);
  };

  return (
    <LanguageContext.Provider value={{ isArabic, toggleIsArabic }}>
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageProvider;
