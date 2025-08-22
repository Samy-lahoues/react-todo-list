import { Check, Calendar, Edit3, Trash2 } from "lucide-react";
import { translations } from "../../constants";
import type { ChangeEvent } from "react";
import useIsMobile from "../../hooks/useIsMobile";

type priorityTypes = "high" | "low" | "medium";

const TodoCard = ({
  text,
  onComplete,
  onPrioritize,
  onDelete,
  onEdit,
  completed,
  priority,
  isArabic,
  taskId,
  dueDate,
}: {
  text: string;
  onComplete: (taskId: string) => void;
  onPrioritize: (taskId: string, priority: priorityTypes) => void;
  completed: boolean;
  priority: priorityTypes;
  isArabic: boolean;
  taskId: string;
  dueDate: string;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md p-3.5 md:p-6 transition-all hover:shadow-lg ${
        completed && "opacity-70"
      } rounded-lg`}
    >
      <div
        className={`flex items-center justify-between ${
          isMobile && "gap-4"
        } overflow-hidden`}
      >
        {/* Left Side */}
        <div className="w-fit flex gap-3.5 items-start">
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
              className={`text-base md:text-lg font-medium ${
                completed && "line-through text-gray-500"
              }`}
            >
              {text}
            </p>

            <div
              className={`flex flex-wrap gap-2 items-center ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <select
                disabled={completed}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  onPrioritize(taskId, event.target.value as priorityTypes)
                }
                value={priority}
                className={`text-xs md:text-sm capitalize font-semibold text-center px-2 py-1 rounded-xl hover:cursor-pointer ${
                  priority === "high"
                    ? "bg-red-600"
                    : priority === "medium"
                      ? "bg-yellow-600"
                      : "bg-green-600"
                } text-white`}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>

              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <p className="text-xs md:text-sm">{dueDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div
          className={`flex ${isMobile ? "justify-end gap-1.5" : "gap-2.5"} mt-2 md:mt-0`}
        >
          <button
            disabled={completed}
            onClick={() => onEdit(taskId)}
            className={`bg-blue-500 hover:bg-blue-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-md ${
              isMobile ? "p-1.5" : "p-2"
            }`}
            title={translations.edit[isArabic ? "ar" : "en"]}
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(taskId)}
            className={`bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-md ${
              isMobile ? "p-1.5" : "p-2"
            }`}
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
