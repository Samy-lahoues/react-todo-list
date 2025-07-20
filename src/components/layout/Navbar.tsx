import { Home, Info, Languages } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";
import { translations } from "../../constants";
import { useLanguage } from "../../hooks/useLanguage";
import ThemeToggler from "../ui/ThemeToggler";

const Navbar = () => {
  const { isArabic, toggleIsArabic } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 md:px-6 py-2 bg-secondary-bg text-text-primary shadow-lg rounded-b-xl z-50">
      <nav className="flex flex-col md:flex-row md:justify-between items-center space-y-2 md:space-y-0">
        {/* Logo */}
        <a
          href="/"
          className="text-3xl font-extrabold tracking-tight hover:text-btn-info transition-colors"
        >
          {translations.logo[isArabic ? "ar" : "en"]}
        </a>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          {/* Home Link */}
          <a
            href="/"
            className="text-text-primary hover:text-btn-info transition-colors duration-300"
          >
            {isMobile ? (
              <Home className="w-5 h-5 text-black dark:text-white" />
            ) : (
              "Home"
            )}
          </a>

          {/* About Link */}
          <a
            href="/about"
            className="text-text-primary hover:text-btn-info transition-colors duration-300"
          >
            {isMobile ? (
              <Info className="w-5 h-5 text-black dark:text-white" />
            ) : (
              "About"
            )}
          </a>

          {/* Language Toggle */}
          <button
            onClick={toggleIsArabic}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isMobile ? (
              <Languages className="w-5 h-5 text-white" />
            ) : (
              translations.language[isArabic ? "en" : "ar"]
            )}
          </button>

          {/* Theme Toggler */}
          <ThemeToggler />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
