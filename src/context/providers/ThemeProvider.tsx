import { useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "../ThemeContext";
import type { Theme } from "../ThemeContext";
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");
    const newTheme = theme === "light" ? "dark" : "light";
    const toggleTheme = () => {
        setTheme(newTheme);
    };
    if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
