import ToDoList from "../components/layout/ToDoList";
import Popup from "../components/ui/Popup";
import { useState } from "react";
import { translations } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
function Home() {
    const { isArabic } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const handleOpening = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 dark:text-white">
            {isOpen && (
                <Popup
                    width={350}
                    height={180}
                    padding="p-4"
                    onBgClick={handleOpening}
                >
                    <div className="flex flex-col gap-y-3.5">
                        <h2 className="px-3 text-2xl">
                            {translations.editTask[isArabic ? "ar" : "en"]}
                        </h2>
                        <div className="flex flex-col">
                            <input
                                className="popup-input"
                                type="text"
                                placeholder={
                                    translations.inputTitlePlaceholder[
                                        isArabic ? "ar" : "en"
                                    ]
                                }
                            />
                            <input
                                className="popup-input"
                                type="text"
                                placeholder={
                                    translations.inputDetailsPlaceholder[
                                        isArabic ? "ar" : "en"
                                    ]
                                }
                            />
                        </div>
                        <div className="w-full flex justify-end space-x-4 text-sm px-3">
                            <button className="popup-button">
                                {translations.cancel[isArabic ? "ar" : "en"]}
                            </button>
                            <button className="popup-button">
                                {translations.edit[isArabic ? "ar" : "en"]}
                            </button>
                        </div>
                    </div>
                </Popup>
            )}
            <div className="flex justify-center items-center h-screen">
                <ToDoList />
            </div>
        </div>
    );
}

export default Home;
