import { useEffect, useState, type ChangeEvent } from "react";
import ToDoList from "../components/layout/ToDoList";
import Popup from "../components/ui/Popup";
import { translations } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
import type { toDosTypes } from "../constants";
function Home() {
    const [editedTaskTitle, setEditedTaskTitle] = useState({ en: "", ar: "" });
    const [todos, setToDos] = useState<toDosTypes[] | []>([]);
    const { isArabic } = useLanguage();
    const [isConfirmDeleteActive, setIsConfirmDeleteActive] =
        useState<boolean>(false);
    const [isEditActive, setIsEditActive] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const [taskToEdit, setTaskToEdit] = useState<number | null>(null);
    // Render tasks that has been created before
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.todos || "[]");
        setToDos(storedTodos);
    }, []);
    // Event handlers
    const openDeletePopup = (taskId: number) => {
        setTaskToDelete(taskId);
        setIsConfirmDeleteActive(true);
    };
    const closeDeletePopup = () => {
        setIsConfirmDeleteActive(false);
        setTaskToDelete(null);
    };
    const handleDeleteTask = () => {
        if (taskToDelete !== null) {
            setToDos((prev) => prev.filter((todo) => todo.id !== taskToDelete));
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    };
    const openEditPopup = (taskId: number) => {
        let task = "";
        for (const todo of todos) {
            if (todo.id === taskId) {
                task = isArabic ? todo.text.ar : todo.text.en;
            }
        }
        setEditedTaskTitle((prev) => {
            if (isArabic) {
                return { ...prev, ar: task };
            }
            return { ...prev, en: task };
        });
        setTaskToEdit(taskId);
        setIsEditActive(true);
    };
    const closeEditPopup = () => {
        setIsEditActive(false);
        setTaskToEdit(null);
    };
    const handleEditTask = () => {
        if (taskToEdit !== null) {
            const EditedTodos = todos.map((todo) => {
                if (taskToEdit === todo.id) {
                    return { ...todo, text: editedTaskTitle };
                }
                return todo;
            });
            setToDos(EditedTodos);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    };
    const handlePopupInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (isArabic) {
            setEditedTaskTitle((prev) => ({ ...prev, ar: event.target.value }));
        } else {
            setEditedTaskTitle((prev) => ({ ...prev, en: event.target.value }));
        }
    };
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 dark:text-white">
            {isConfirmDeleteActive && (
                <Popup
                    onClose={closeDeletePopup}
                    width={isArabic ? 400 : 455}
                    height={135}
                    padding="p-4"
                >
                    <div className="flex flex-col gap-y-3.5"></div>
                    <h2 className="px-3 text-xl">
                        {translations.titleConfirmation[isArabic ? "ar" : "en"]}
                    </h2>
                    <p className={`px-3 text-gray-400 text-sm my-3`}>
                        {
                            translations.descriptionConfirmation[
                                isArabic ? "ar" : "en"
                            ]
                        }
                    </p>
                    <div
                        className={`w-full flex justify-end space-x-4 text-sm px-3 mt-5`}
                    >
                        <button
                            onClick={closeDeletePopup}
                            className="popup-button cursor-pointer"
                        >
                            {translations.close[isArabic ? "ar" : "en"]}
                        </button>
                        <button
                            onClick={() => {
                                handleDeleteTask();
                                closeDeletePopup();
                            }}
                            className="popup-button cursor-pointer"
                        >
                            {translations.yesDelete[isArabic ? "ar" : "en"]}
                        </button>
                    </div>
                </Popup>
            )}
            {isEditActive && (
                <Popup
                    onClose={closeDeletePopup}
                    width={350}
                    height={180}
                    padding="p-4"
                >
                    <div className="flex flex-col gap-y-3.5">
                        <h2 className="px-3 text-2xl">
                            {translations.editTask[isArabic ? "ar" : "en"]}
                        </h2>
                        <div className="flex flex-col">
                            <input
                                value={
                                    isArabic
                                        ? editedTaskTitle.ar
                                        : editedTaskTitle.en
                                }
                                onChange={handlePopupInput}
                                className="popup-input"
                                type="text"
                                placeholder={
                                    translations.inputTitlePlaceholder[
                                        isArabic ? "ar" : "en"
                                    ]
                                }
                            />
                        </div>
                        <div className="w-full flex justify-end space-x-4 text-sm px-3">
                            <button
                                onClick={closeEditPopup}
                                className="popup-button"
                            >
                                {translations.cancel[isArabic ? "ar" : "en"]}
                            </button>
                            <button
                                onClick={() => {
                                    handleEditTask();
                                    closeEditPopup();
                                }}
                                className="popup-button"
                            >
                                {translations.edit[isArabic ? "ar" : "en"]}
                            </button>
                        </div>
                    </div>
                </Popup>
            )}
            <div className="flex justify-center items-center h-screen">
                <ToDoList
                    todos={todos}
                    setToDos={setToDos}
                    onDeleteClick={openDeletePopup}
                    onEditClick={openEditPopup}
                />
            </div>
        </div>
    );
}

export default Home;
