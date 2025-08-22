import type { ChangeEvent, KeyboardEvent } from "react";
import { translations } from "../../constants";

interface editFieldProps {
  isArabic: boolean;
  inputValue: { en: string; ar: string };
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  hasError?: boolean;
  errorMessage?: string | null;
}

const EditField = ({
  inputValue,
  onChange,
  addTask,
  isArabic,
  hasError = false,
  errorMessage,
}: editFieldProps) => {
  // Handler for Enter key
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const value = isArabic ? inputValue.ar : inputValue.en;
    if (event.key === "Enter" && value.trim().length > 2 && !hasError) {
      addTask();
    }
  };

  return (
    <div className="edit-field flex-end w-full mt-5 overflow-hidden px-6">
      <div className={`flex gap-x-3 ${isArabic && "flex-row-reverse"}`}>
        <button
          onClick={addTask}
          disabled={hasError}
          className={`py-3 px-5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer ${
            hasError
              ? "bg-gray-400 cursor-not-allowed text-gray-200"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {translations.addTask[isArabic ? "ar" : "en"]}
        </button>
        <input
          type="text"
          placeholder={
            translations.taskInputPlaceholder[isArabic ? "ar" : "en"]
          }
          value={isArabic ? inputValue.ar : inputValue.en}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none ${
            hasError
              ? "border-red-500 bg-red-50 dark:bg-red-900/20"
              : "border-gray-300 focus:border-indigo-500"
          }`}
        />
      </div>
      {hasError && errorMessage && (
        <div className="mt-2 text-red-500 text-sm px-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default EditField;
