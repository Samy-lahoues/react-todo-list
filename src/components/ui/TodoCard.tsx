import { Check, Calendar, Edit3, Trash2 } from "lucide-react";
import { translations } from "../../constants";
const TodoCard = ({
    text,
    onComplete,
    onDelete,
    onEdit,
    completed,
    taskId,
    isArabic,
    dueDate,
}: {
    text: string;
    onComplete: (taskId: number) => void;
    completed: boolean;
    isArabic: boolean;
    taskId: number;
    dueDate: string;
    onDelete: (taskId: number) => void;
    onEdit: (taskId: number) => void;
}) => {
    return (
        <div
            className={`bg-white dark:bg-gray-800 shadow-md p-6 transition-all hover:shadow-lg ${
                completed && "opacity-70"
            }`}
        >
            <div className="flex justify-between items-center overflow-hidden">
                {/* left Side */}
                <div className="w-fit flex gap-3.5 items-center">
                    <button
                        onClick={() => onComplete(taskId)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            completed
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "border-gray-300 dark:border-gray-600 hover:border-emerald-500"
                        }`}
                    >
                        <Check className="w-4 h-4" />
                    </button>
                    <div className="flex flex-col gap-y-2.5">
                        <p
                            className={`text-lg font-medium ${
                                completed && "line-through text-gray-500"
                            }`}
                        >
                            {text}
                        </p>
                        {/* if todo completed : text-gray-800 */}
                        <div
                            className={`flex gap-2 ${
                                isArabic && "flex-row-reverse"
                            }`}
                        >
                            <span
                                className={`text-sm px-1.5 py-1 rounded-xl bg-yellow-600`}
                            >
                                Medium
                            </span>
                            <div
                                className={`text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1`}
                            >
                                <Calendar className="w-4 h-4" />
                                {/* due date */}
                                <p>{dueDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* right Side */}
                <div className=" flex gap-2.5">
                    <button
                        onClick={() => onEdit(taskId)}
                        className="bg-blue-500 hover:bg-blue-600 icon-button"
                        title={translations.edit[isArabic ? "ar" : "en"]}
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(taskId)}
                        className="icon-button bg-red-500 hover:bg-red-600"
                        title={translations.delete[isArabic ? "ar" : "en"]}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TodoCard;
