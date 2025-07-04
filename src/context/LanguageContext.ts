import { createContext } from "react";
interface toggleArabicTypes {
    isArabic: boolean;
    toggleIsArabic: () => void;
}
export const LanguageContext = createContext<toggleArabicTypes | undefined>(
    undefined
);
