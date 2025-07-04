import type { ChangeEvent } from "react";
import { translations } from "../../constants";
interface editFieldProps {
    isArabic: boolean;
    inputValue: { en: string; ar: string };
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    addTask: () => void;
}
const EditField = ({
    inputValue,
    onChange,
    addTask,
    isArabic,
}: editFieldProps) => {
    return (
        <div className="edit-field flex-end w-full mt-5 overflow-hidden px-6">
            <div className={`flex gap-x-3 ${isArabic && "flex-row-reverse"}`}>
                <button
                    onClick={addTask}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                    {translations.addTask[isArabic ? "ar" : "en"]}
                </button>
                <input
                    type="text"
                    placeholder={
                        translations.taskInputPlaceholder[
                            isArabic ? "ar" : "en"
                        ]
                    }
                    value={isArabic ? inputValue.ar : inputValue.en}
                    onChange={onChange}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none"
                />
            </div>
        </div>
    );
};
export default EditField;
