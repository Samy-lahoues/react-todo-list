import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

// Define types for better structure
interface AnimatedElement {
  id: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  emoji: string;
}

function NotFound() {
  const { isArabic } = useLanguage();
  const navigate = useNavigate();

  const [animatedElements, setAnimatedElements] = useState<AnimatedElement[]>(
    [],
  );

  // Current language selector
  const currentLang = isArabic ? "ar" : "en";

  // Static translations object (no dependency on isArabic needed)
  const translations = useMemo(
    () => ({
      pageTitle: {
        en: "Page Not Found",
        ar: "الصفحة غير موجودة",
      },
      errorCode: {
        en: "404",
        ar: "404",
      },
      mainMessage: {
        en: "Oops! The page you're looking for seems to have wandered off like a completed task.",
        ar: "عذراً! يبدو أن الصفحة التي تبحث عنها قد اختفت مثل مهمة مكتملة.",
      },
      subMessage: {
        en: "Don't worry, even the best task managers lose track sometimes!",
        ar: "لا تقلق، حتى أفضل مديري المهام يفقدون المسار أحياناً!",
      },
      suggestions: {
        en: "Here's what you can do:",
        ar: "إليك ما يمكنك فعله:",
      },
      suggestionsList: {
        en: [
          "Go back to the home page and organize your tasks",
          "Check if the URL is spelled correctly",
          "Create a new task to find what you're looking for",
          "Take a break - you've earned it!",
        ],
        ar: [
          "العودة إلى الصفحة الرئيسية وتنظيم مهامك",
          "تحقق من أن الرابط مكتوب بشكل صحيح",
          "إنشاء مهمة جديدة للعثور على ما تبحث عنه",
          "خذ استراحة - لقد استحققتها!",
        ],
      },
      goHome: {
        en: "Go Home",
        ar: "الذهاب للرئيسية",
      },
      goBack: {
        en: "Go Back",
        ar: "العودة",
      },

      taskNotFound: {
        en: "Task not found in your list!",
        ar: "المهمة غير موجودة في قائمتك!",
      },
      encouragement: {
        en: "Keep calm and keep organizing! 📝",
        ar: "ابق هادئاً واستمر في التنظيم! 📝",
      },
    }),
    [],
  );

  // Create floating animated elements
  const createAnimatedElements = useCallback(() => {
    const emojis = ["📝", "✅", "📋", "⚡", "🎯", "📌", "🔄", "💡"];
    const elements: AnimatedElement[] = [];

    for (let i = 0; i < 8; i++) {
      elements.push({
        id: `element-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 20,
        speed: Math.random() * 2 + 1,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }

    return elements;
  }, []);

  // Initialize animated elements
  useEffect(() => {
    setAnimatedElements(createAnimatedElements());
  }, [createAnimatedElements]);

  // Animate floating elements
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedElements((prev) =>
        prev.map((element) => ({
          ...element,
          y: (element.y + element.speed) % 120,
        })),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Set page title
  useEffect(() => {
    document.title = isArabic
      ? "404 - الصفحة غير موجودة"
      : "404 - Page Not Found";
  }, [isArabic]);

  // Event handlers
  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleGoBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 dark:text-white relative overflow-hidden pt-10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {animatedElements.map((element) => (
          <div
            key={element.id}
            className="absolute opacity-10 dark:opacity-20 transition-all duration-100"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              fontSize: `${element.size}px`,
              transform: isArabic ? "scaleX(-1)" : "scaleX(1)",
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number with special styling */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text animate-pulse">
              {translations.errorCode[currentLang]}
            </h1>
          </div>

          {/* Error Messages */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              {translations.pageTitle[currentLang]}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4">
              {translations.mainMessage[currentLang]}
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-6">
              {translations.subMessage[currentLang]}
            </p>
          </div>

          {/* Task Not Found Card */}
          {/* <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg mb-8 border-l-4 border-yellow-500">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              {translations.taskNotFound[currentLang]}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {translations.encouragement[currentLang]}
            </p>
          </div> */}

          {/* Suggestions */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              {translations.suggestions[currentLang]}
            </h3>
            <ul
              className={`space-y-3 text-gray-600 dark:text-gray-300 ${isArabic ? "text-right" : "text-left"}`}
            >
              {translations.suggestionsList[currentLang].map(
                (suggestion, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>{suggestion}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>🏠</span>
              <span>{translations.goHome[currentLang]}</span>
            </button>
            <button
              onClick={handleGoBack}
              className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>↩️</span>
              <span>{translations.goBack[currentLang]}</span>
            </button>
          </div>

          {/* Fun Easter Egg */}
          {/* <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 rounded-full p-1">
              <div className="bg-white dark:bg-slate-800 rounded-full px-6 py-3">
                <span className="text-transparent bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text font-semibold">
                  Error 404: Task not found in productivity.exe
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default NotFound;
