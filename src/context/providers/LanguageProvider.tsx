import { LanguageContext } from "../LanguageContext";
import type { ReactNode } from "react";
import { useState } from "react";

const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [isArabic, setIsArabic] = useState<boolean>(true);
    const newLanguage = !isArabic;
    if (!newLanguage) {
        document.documentElement.lang = "ar";
        document.documentElement.style.direction = "rtl";
    } else {
        document.documentElement.lang = "en";
        document.documentElement.style.direction = "ltr";
    }
    const toggleIsArabic = () => {
        setIsArabic(newLanguage);
    };
    return (
        <LanguageContext.Provider value={{ isArabic, toggleIsArabic }}>
            {children}
        </LanguageContext.Provider>
    );
};
export default LanguageProvider;
