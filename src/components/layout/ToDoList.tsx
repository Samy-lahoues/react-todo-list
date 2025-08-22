import { useState } from "react";
import type { ChangeEvent } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants";
import FilterButton from "../ui/FilterButton";
import TodoCard from "../ui/TodoCard";
import EditField from "../ui/EditField";
import { useTodos } from "../../hooks/useTodos";
import useValidation from "../../hooks/useValidation";
type filters = "all" | "active" | "completed";

const ToDoList = ({
  onDeleteClick,
  onEditClick,
}: {
  onDeleteClick: (taskId: string) => void;
  onEditClick: (taskid: string) => void;
}) => {
  const [filter, setFilter] = useState<filters>("all");
  const { isArabic } = useLanguage();
  const [taskInput, setTaskInput] = useState({ en: "", ar: "" });
  const { todos, dispatch } = useTodos();

  // Validation hook
  const { validateTodoTitle, getFieldError, hasFieldError, clearErrors } =
    useValidation();
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });
  const handleCheckTask = (taskId: string) => {
    dispatch({ type: "check_task", taskId });
  };
  const handlePrioritySelection = (
    taskId: string,
    priority: "high" | "low" | "medium",
  ) => {
    dispatch({ type: "priority_selection", taskId, priority });
  };
  const handleTaskInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskInput((prev) => {
      if (isArabic) {
        return { ...prev, ar: event.target.value };
      } else {
        return { ...prev, en: event.target.value };
      }
    });
  };

  const addTask = () => {
    // Clear previous errors
    clearErrors();

    // Validate input
    const validationResult = validateTodoTitle(taskInput);

    if (!validationResult.isValid) {
      return;
    }

    // Dispatch the action if validation passes
    dispatch({ type: "add_task", payload: { title: taskInput } });
    setTaskInput({ en: "", ar: "" });
  };

  return (
    <div
      className={`relative mt-20 w-xl h-[590px] md:h-[645px] bg-white dark:bg-gray-800 rounded-lg ring shadow-xl ring-gray-900/5 p-5`}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold pb-2 md:pb-4 max-md:pt-4">
          {translations.title[isArabic ? "ar" : "en"]}
        </h1>
        {/* Filters */}
        <div
          className={`flex mb-5 md:mb-6 mt-5 mx-auto ${isArabic && "flex-row-reverse"}`}
        >
          {(["all", "completed", "active"] as const).map(
            (filterType, index) => (
              <FilterButton
                key={index}
                index={index}
                filter={filter}
                filterType={filterType}
                onClick={() => {
                  setFilter(filterType as filters);
                }}
                text={
                  translations[filterType as keyof typeof translations][
                    isArabic ? "ar" : "en"
                  ]
                }
              />
            ),
          )}
        </div>
        {/* To Do list */}
        <div className="w-full h-full flex flex-col mb-10">
          <div className="todolist flex-1 overflow-y-auto max-h-96">
            {filteredTodos.map((todo) => (
              <TodoCard
                taskId={todo.id}
                key={todo.id}
                isArabic={isArabic}
                text={
                  todo.text?.[isArabic ? "ar" : "en"] ||
                  todo.text?.[isArabic ? "en" : "ar"] ||
                  "Untitled Task"
                }
                onComplete={handleCheckTask}
                completed={todo.completed}
                priority={todo.priority}
                dueDate={todo.dueDate}
                onPrioritize={handlePrioritySelection}
                onDelete={onDeleteClick}
                onEdit={onEditClick}
              />
            ))}
          </div>
          <EditField
            inputValue={taskInput}
            addTask={addTask}
            onChange={handleTaskInput}
            isArabic={isArabic}
            hasError={
              hasFieldError("title") ||
              hasFieldError("English title") ||
              hasFieldError("Arabic title")
            }
            errorMessage={
              getFieldError("title") ||
              getFieldError("English title") ||
              getFieldError("Arabic title")
            }
          />
        </div>
      </div>
    </div>
  );
};
export default ToDoList;
