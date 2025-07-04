import { useState } from "react";
import type { ChangeEvent } from "react";
import type { toDosTypes } from "../../constants";
import { useLanguage } from "../../hooks/useLanguage";
import { translations, defaultToDos } from "../../constants";
import FilterButton from "../ui/FilterButton";
import TodoCard from "../ui/TodoCard";
import EditField from "../ui/EditField";
import { getTodaysDate } from "../../lib/actions";

type filters = "all" | "active" | "completed";

const ToDoList = () => {
    const [todos, setToDos] = useState<toDosTypes[]>(defaultToDos);
    const [filter, setFilter] = useState<filters>("all");
    const { isArabic } = useLanguage();
    const [toast, setToast] = useState("");
    const [taskInput, setTaskInput] = useState({ en: "", ar: "" });
    const handleDeleteTask = (taskId: number) => {
        setToDos((prev) => prev.filter((todo) => todo.id !== taskId));
    };
    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });
    const handleCheckTask = (taskId: number) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === taskId) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setToDos(newTodos);
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
    const validateInput = () => {
        if (
            !(taskInput.ar.trim().length > 2 || taskInput.en.trim().length > 2)
        ) {
            return false;
        } else {
            setToast("Enter a valid task title please!");
            return true;
        }
    };
    const addTask = () => {
        if (validateInput()) {
            setToDos((prev) => [
                ...prev,
                {
                    id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
                    text: taskInput,
                    completed: false,
                    priority: "low",
                    dueDate: getTodaysDate(),
                },
            ]);
            setTaskInput({ en: "", ar: "" });
        }
    };
    return (
        <div className="relative w-xl h-[645px] bg-white dark:bg-gray-800 rounded-lg ring shadow-xl ring-gray-900/5 p-5">
            <div className="flex flex-col items-center">
                <h1 className="text-6xl font-bold pb-4">
                    {translations.title[isArabic ? "ar" : "en"]}
                </h1>
                <hr className="bg-gray-500 dark:bg-white" />
                {/* Filters */}
                <div
                    className={`flex mb-6 mt-5 mx-auto ${
                        isArabic && "flex-row-reverse"
                    }`}
                >
                    {["all", "completed", "active"].map((filterType, index) => (
                        <FilterButton
                            key={index}
                            index={index}
                            filter={filter}
                            filterType={filterType}
                            onClick={() => {
                                setFilter(filterType as filters);
                            }}
                            text={
                                translations[filterType][isArabic ? "ar" : "en"]
                            }
                        />
                    ))}
                </div>
                {/* To Do list */}
                <div className="w-full h-full flex flex-col mb-10">
                    <div className="flex-1 overflow-y-auto max-h-96">
                        {filteredTodos.map((todo) => (
                            <TodoCard
                                onDelete={handleDeleteTask}
                                taskId={todo.id}
                                key={todo.id}
                                isArabic={isArabic}
                                text={todo.text[isArabic ? "ar" : "en"]}
                                onComplete={handleCheckTask}
                                completed={todo.completed}
                                dueDate={todo.dueDate}
                            />
                        ))}
                    </div>
                    <EditField
                        inputValue={taskInput}
                        addTask={addTask}
                        onChange={handleTaskInput}
                        isArabic={isArabic}
                    />
                </div>
            </div>
        </div>
    );
};
export default ToDoList;
