import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ChangeEvent,
} from "react";
import ToDoList from "../components/layout/ToDoList";
import Popup from "../components/ui/Popup";
import { translations } from "../constants";
import { useLanguage } from "../hooks/useLanguage";
import { toast } from "../hooks/useToast";
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

  // Memoized translation texts for better performance
  const translatedTexts = useMemo(
    () => ({
      titleConfirmation: translations.titleConfirmation[isArabic ? "ar" : "en"],
      descriptionConfirmation:
        translations.descriptionConfirmation[isArabic ? "ar" : "en"],
      close: translations.close[isArabic ? "ar" : "en"],
      yesDelete: translations.yesDelete[isArabic ? "ar" : "en"],
      editTask: translations.editTask[isArabic ? "ar" : "en"],
      inputTitlePlaceholder:
        translations.inputTitlePlaceholder[isArabic ? "ar" : "en"],
      cancel: translations.cancel[isArabic ? "ar" : "en"],
      edit: translations.edit[isArabic ? "ar" : "en"],
    }),
    [isArabic],
  );

  // Memoized popup configuration
  const deletePopupProps = useMemo(
    () => ({
      width: isArabic ? 400 : 455,
      height: 135,
      padding: "p-4" as const,
    }),
    [isArabic],
  );

  const editPopupProps = useMemo(
    () => ({
      width: 350,
      height: 180,
      padding: "p-4" as const,
    }),
    [],
  );

  // Memoized task finder function
  const findTaskById = useMemo(() => {
    return (taskId: number) => {
      return todos.find((todo) => todo.id === taskId);
    };
  }, [todos]);

  // Render tasks that has been created before
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.todos || "[]");
    setToDos(storedTodos);
  }, []);

  // Translate tasks from arabic to english or from english to arabic
  useEffect(() => {
    const translateTask = async () => {
      if (todos.length === 0) return;

      const lastTask = todos[todos.length - 1];

      // Skip if both languages already have content
      if (lastTask.text.ar.length && lastTask.text.en.length) return;

      // Determine which language has content and which needs translation
      const hasArabicContent = !!lastTask.text.ar.length;
      const hasEnglishContent = !!lastTask.text.en.length;

      // If neither has content, skip translation
      if (!hasArabicContent && !hasEnglishContent) return;

      // Determine source and target
      const isSourceArabic = hasArabicContent && !hasEnglishContent;
      const isSourceEnglish = hasEnglishContent && !hasArabicContent;

      if (!isSourceArabic && !isSourceEnglish) return;

      // Get the text to translate (the one that has content)
      const textToTranslate = isSourceArabic
        ? lastTask.text.ar
        : lastTask.text.en;

      const targetLang = isSourceArabic ? "en" : "ar";
      const sourceLang = isSourceArabic ? "ar" : "en";

      // Additional validation: ensure we have text to translate
      if (!textToTranslate || textToTranslate.trim().length === 0) {
        console.warn("No text content found to translate");
        return;
      }

      try {
        const url = import.meta.env.VITE_TRANSLATION_API_URL;
        const options = {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TRANSLATION_API_KEY}`,
          },
          body: JSON.stringify({
            platform: "api",
            from: sourceLang,
            to: targetLang,
            data: textToTranslate,
          }),
        };

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(
            `Translation API failed ${response.statusText} - ${response.status}`,
          );
        }

        const result = await response.json();
        const translatedText = result.result;

        // Validate that we got a translation result
        if (!translatedText) {
          console.warn("Translation API returned empty result");
          return;
        }

        const newTodos = todos.map((todo, index) => {
          if (index === todos.length - 1) {
            return {
              ...todo,
              text: {
                en: isSourceArabic ? translatedText : lastTask.text.en,
                ar: isSourceArabic ? lastTask.text.ar : translatedText,
              },
            };
          }
          return todo;
        });

        setToDos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
      } catch (e) {
        console.error(
          "Translation error:",
          e instanceof Error ? e.message : String(e),
        );
      }
    };

    translateTask();
  }, [todos.length]);

  // Event handlers
  const openDeletePopup = (taskId: number) => {
    setTaskToDelete(taskId);
    setIsConfirmDeleteActive(true);
  };

  const closeDeletePopup = () => {
    setIsConfirmDeleteActive(false);
    setTaskToDelete(null);
  };

  const handleDeleteTask = useCallback(() => {
    if (taskToDelete !== null) {
      setToDos((prev) => {
        const newTodos = prev.filter((todo) => todo.id !== taskToDelete);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return newTodos;
      });
      // Show delete success toast
      setTimeout(() => {
        toast({
          title: "Task Deleted!",
          description: "Your task has been deleted successfully",
          variant: "destructive",
        });
      }, 100);
    }
  }, [taskToDelete]);

  const openEditPopup = useCallback(
    (taskId: number) => {
      const task = findTaskById(taskId);
      const taskText = task ? (isArabic ? task.text.ar : task.text.en) : "";

      setEditedTaskTitle((prev) => {
        if (isArabic) {
          return { ...prev, ar: taskText };
        }
        return { ...prev, en: taskText };
      });
      setTaskToEdit(taskId);
      setIsEditActive(true);
    },
    [findTaskById, isArabic],
  );

  const closeEditPopup = useCallback(() => {
    setIsEditActive(false);
    setTaskToEdit(null);
  }, []);

  const handleEditTask = useCallback(() => {
    if (taskToEdit !== null) {
      setToDos((prev) => {
        const editedTodos = prev.map((todo) => {
          if (taskToEdit === todo.id) {
            return { ...todo, text: editedTaskTitle };
          }
          return todo;
        });
        localStorage.setItem("todos", JSON.stringify(editedTodos));
        return editedTodos;
      });
    }
  }, [taskToEdit, editedTaskTitle]);

  const handlePopupInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (isArabic) {
        setEditedTaskTitle((prev) => ({ ...prev, ar: event.target.value }));
      } else {
        setEditedTaskTitle((prev) => ({ ...prev, en: event.target.value }));
      }
    },
    [isArabic],
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 dark:text-white">
      {isConfirmDeleteActive && (
        <Popup
          onClose={closeDeletePopup}
          width={deletePopupProps.width}
          height={deletePopupProps.height}
          padding={deletePopupProps.padding}
        >
          <div className="flex flex-col gap-y-3.5"></div>
          <h2 className="px-3 text-xl">{translatedTexts.titleConfirmation}</h2>
          <p className={`px-3 text-gray-400 text-sm my-3`}>
            {translatedTexts.descriptionConfirmation}
          </p>
          <div
            className={`w-full flex justify-end space-x-4 text-sm px-3 mt-5`}
          >
            <button
              onClick={closeDeletePopup}
              className="popup-button cursor-pointer"
            >
              {translatedTexts.close}
            </button>
            <button
              onClick={() => {
                handleDeleteTask();
                closeDeletePopup();
              }}
              className="popup-button cursor-pointer"
            >
              {translatedTexts.yesDelete}
            </button>
          </div>
        </Popup>
      )}
      {isEditActive && (
        <Popup
          onClose={closeEditPopup}
          width={editPopupProps.width}
          height={editPopupProps.height}
          padding={editPopupProps.padding}
        >
          <div className="flex flex-col gap-y-3.5">
            <h2 className="px-3 text-2xl">{translatedTexts.editTask}</h2>
            <div className="flex flex-col">
              <input
                value={isArabic ? editedTaskTitle.ar : editedTaskTitle.en}
                onChange={handlePopupInput}
                className="popup-input"
                type="text"
                placeholder={translatedTexts.inputTitlePlaceholder}
              />
            </div>
            <div className="w-full flex justify-end space-x-4 text-sm px-3">
              <button onClick={closeEditPopup} className="popup-button">
                {translatedTexts.cancel}
              </button>
              <button
                onClick={() => {
                  handleEditTask();
                  closeEditPopup();
                }}
                className="popup-button"
              >
                {translatedTexts.edit}
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
