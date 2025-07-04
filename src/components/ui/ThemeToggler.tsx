import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Toggle theme"
        >
            <div
                className={`absolute w-5 h-5 bg-white dark:bg-slate-900 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                    theme === "dark" ? "translate-x-3" : "-translate-x-3"
                }`}
            >
                {theme === "dark" ? (
                    <Moon className="w-3 h-3 text-indigo-600" />
                ) : (
                    <Sun className="w-3 h-3 text-amber-500" />
                )}
            </div>
        </button>
    );
};
export default ThemeToggle;
