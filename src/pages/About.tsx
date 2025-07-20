import { useEffect, useMemo } from "react";
import { useLanguage } from "../hooks/useLanguage";
// Define types for better structure
interface Feature {
  icon: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

interface TechItem {
  name: string;
  version?: string;
  category: string;
}

function About() {
  const { isArabic } = useLanguage();

  // Current language selector
  const currentLang = isArabic ? "ar" : "en";

  // Static translations object (no dependency on isArabic needed)
  const translations = useMemo(
    () => ({
      pageTitle: {
        en: "About React Todo List",
        ar: "حول تطبيق قائمة المهام",
      },
      subtitle: {
        en: "Modern Task Management Application",
        ar: "تطبيق إدارة المهام الحديث",
      },
      description: {
        en: "A modern, feature-rich Todo List application built with React, TypeScript, and TailwindCSS. This project demonstrates best practices in React development including context-based state management, theming, localization, and responsive UI.",
        ar: "تطبيق قائمة مهام حديث وغني بالميزات مبني بـ React و TypeScript و TailwindCSS. يعرض هذا المشروع أفضل الممارسات في تطوير React بما في ذلك إدارة الحالة القائمة على السياق والتخطيط والترجمة والواجهة المتجاوبة.",
      },
      featuresTitle: {
        en: "Key Features",
        ar: "الميزات الأساسية",
      },
      techStackTitle: {
        en: "Technology Stack",
        ar: "المكدس التقني",
      },
      contactTitle: {
        en: "Contact Information",
        ar: "معلومات الاتصال",
      },
      developedBy: {
        en: "Developed by Samy Lahoues",
        ar: "تم التطوير بواسطة سامي لهواس",
      },
      version: {
        en: "Version 1.0.0",
        ar: "الإصدار 1.0.0",
      },
      license: {
        en: "MIT License",
        ar: "رخصة MIT",
      },
      viewGithub: {
        en: "View on GitHub",
        ar: "عرض في GitHub",
      },
      contactEmail: {
        en: "Contact Email",
        ar: "البريد الإلكتروني",
      },
      linkedinProfile: {
        en: "LinkedIn Profile",
        ar: "الملف الشخصي LinkedIn",
      },
    }),
    [],
  );

  // Memoized features data
  const features = useMemo(
    (): Feature[] => [
      {
        icon: "📌",
        title: {
          en: "Task Management",
          ar: "إدارة المهام",
        },
        description: {
          en: "Add, complete, edit, and delete tasks with intuitive controls",
          ar: "إضافة وإكمال وتعديل وحذف المهام بضوابط بديهية",
        },
      },
      {
        icon: "🎯",
        title: {
          en: "Prioritization",
          ar: "تحديد الأولويات",
        },
        description: {
          en: "Categorize tasks with High/Medium/Low priority indicators",
          ar: "تصنيف المهام بمؤشرات الأولوية عالية/متوسطة/منخفضة",
        },
      },
      {
        icon: "📅",
        title: {
          en: "Due Dates",
          ar: "تواريخ الاستحقاق",
        },
        description: {
          en: "Set and visualize task deadlines with date picker",
          ar: "تعيين وتصور مواعيد المهام باستخدام منتقي التاريخ",
        },
      },
      {
        icon: "🌗",
        title: {
          en: "Dark/Light Mode",
          ar: "الوضع المظلم/الفاتح",
        },
        description: {
          en: "Context-based theme switching with system preference detection",
          ar: "تبديل الموضوع القائم على السياق مع كشف تفضيلات النظام",
        },
      },
      {
        icon: "🌐",
        title: {
          en: "Multi-language",
          ar: "متعدد اللغات",
        },
        description: {
          en: "English/Arabic support with RTL layout switching",
          ar: "دعم الإنجليزية/العربية مع تبديل تخطيط RTL",
        },
      },
      {
        icon: "📱",
        title: {
          en: "Responsive Design",
          ar: "تصميم متجاوب",
        },
        description: {
          en: "Optimized for all device sizes and screen resolutions",
          ar: "محسّن لجميع أحجام الأجهزة ودقة الشاشة",
        },
      },
    ],
    [],
  );

  // Memoized tech stack data
  const techStack = useMemo(
    (): TechItem[] => [
      { name: "React", version: "19", category: "Core" },
      { name: "TypeScript", version: "5.8.3", category: "Core" },
      { name: "TailwindCSS", version: "4.1", category: "Core" },
      { name: "Vite", version: "7.0.0", category: "Core" },
      { name: "React Router", category: "Libraries" },
      { name: "React Icons", category: "Libraries" },
      { name: "Date-fns", category: "Libraries" },
      { name: "usehooks-ts", category: "Libraries" },
    ],
    [],
  );

  // Effect for any initialization (keeping pattern from Home.tsx)
  useEffect(() => {
    // Any initialization logic can go here
    document.title = isArabic ? "حول - قائمة المهام" : "About - Todo List";
  }, [isArabic]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 dark:text-white pt-12">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {translations.pageTitle[currentLang]}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
            {translations.subtitle[currentLang]}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {translations.description[currentLang]}
          </p>
        </div>

        {/* Features Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-8 text-center">
            {translations.featuresTitle[currentLang]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {feature.title[currentLang]}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-8 text-center">
            {translations.techStackTitle[currentLang]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                Core Technologies
              </h4>
              <div className="space-y-3">
                {techStack
                  .filter((tech) => tech.category === "Core")
                  .map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md"
                    >
                      <span className="font-medium text-gray-800 dark:text-white">
                        {tech.name}
                      </span>
                      {tech.version && (
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                          v{tech.version}
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
                Key Libraries
              </h4>
              <div className="space-y-3">
                {techStack
                  .filter((tech) => tech.category === "Libraries")
                  .map((tech, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md"
                    >
                      <span className="font-medium text-gray-800 dark:text-white">
                        {tech.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
          <h3 className="text-3xl font-bold mb-6 text-center">
            {translations.contactTitle[currentLang]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {/* <span className="text-white text-2xl font-bold">SL</span> */}
                  <img
                    src="public/developer-avatar.jpg"
                    alt="developer-avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  {translations.developedBy[currentLang]}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {translations.version[currentLang]}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium">
                    {translations.contactEmail[currentLang]}
                  </p>
                  <a
                    href="mailto:samylahoues@outlook.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    samylahoues@outlook.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="font-medium">
                    {translations.linkedinProfile[currentLang]}
                  </p>
                  <a
                    href="https://linkedin.com/in/samy-lahoues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    linkedin.com/in/samy-lahoues
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔗</span>
                <div>
                  <p className="font-medium">
                    {translations.viewGithub[currentLang]}
                  </p>
                  <a
                    href="https://github.com/Samy-lahoues/react-todo-list"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    github.com/Samy-lahoues/react-todo-list
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-300">
              {translations.license[currentLang]} • ©{" "}
              {new Date().getFullYear()}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
