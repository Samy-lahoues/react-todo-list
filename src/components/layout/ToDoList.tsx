import { useState } from "react";
import type { ChangeEvent } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { translations, type toDosTypes } from "../../constants";
import FilterButton from "../ui/FilterButton";
import TodoCard from "../ui/TodoCard";
import EditField from "../ui/EditField";
import { getTodaysDate } from "../../lib/utils";
import { useToast } from "../../hooks/useToast";
type filters = "all" | "active" | "completed";

const ToDoList = ({
    todos,
    setToDos,
    onDeleteClick,
    onEditClick,
}: {
    todos: toDosTypes[];
    setToDos: React.Dispatch<React.SetStateAction<toDosTypes[]>>;
    onDeleteClick: (taskId: number) => void;
    onEditClick: (taskid: number) => void;
}) => {
    const [filter, setFilter] = useState<filters>("all");
    const { isArabic } = useLanguage();
    const { toast } = useToast();
    // Event handlers
    const [taskInput, setTaskInput] = useState({ en: "", ar: "" });

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
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };
    const handlePrioritySelection = (
        taskId: number,
        priority: "high" | "low" | "medium"
    ) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === taskId) {
                return { ...todo, priority };
            }
            return todo;
        });
        setToDos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
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
            showErrorToast();
            return false;
        } else {
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
            localStorage.setItem("todos", JSON.stringify(todos));
            setTaskInput({ en: "", ar: "" });
            showSuccessToast();
        }
    };
    const showSuccessToast = () => {
        toast({
            title: "Success!",
            description: "Your task has been created successfully",
        });
    };
    const showErrorToast = () => {
        toast({
            title: "Error",
            description: "Enter a valid task title please!",
            variant: "destructive",
        });
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
                    <div className="todolist flex-1 overflow-y-auto max-h-96">
                        {filteredTodos.map((todo) => (
                            <TodoCard
                                taskId={todo.id}
                                key={todo.id}
                                isArabic={isArabic}
                                text={todo.text[isArabic ? "ar" : "en"]}
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
                    />
                </div>
            </div>
        </div>
    );
};
export default ToDoList;
