import { translations } from "../../constants";
import { useLanguage } from "../../hooks/useLanguage";
import ThemeToggler from "../ui/ThemeToggler";

const Navbar = () => {
    const { isArabic, toggleIsArabic } = useLanguage();

    return (
        <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 md:px-6 py-2 bg-secondary-bg text-text-primary shadow-lg rounded-b-xl z-50">
            <nav className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                <div className="text-3xl font-bold tracking-tight">
                    {translations.logo[isArabic ? "ar" : "en"]}
                </div>
                <div className="flex items-center gap-6">
                    <a
                        href="/"
                        className="text-text-primary hover:text-btn-info transition-colors duration-300"
                    >
                        Home
                    </a>
                    <a
                        href="/about"
                        className="text-text-primary hover:text-btn-info transition-colors duration-300"
                    >
                        About
                    </a>
                    <button
                        onClick={toggleIsArabic}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {translations.language[isArabic ? "en" : "ar"]}
                    </button>
                    <ThemeToggler />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
