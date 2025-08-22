import { useReducer, useCallback } from "react";
import { todosContext } from "../todosContext";
import type { ReactNode } from "react";
import todosReducer, { type TodoAction } from "../../reducers/todosReducer";
import { useToast } from "../../hooks/useToast";
import { translations } from "../../constants";
import { useLanguage } from "../../hooks/useLanguage";

const ToDosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, baseDispatch] = useReducer(todosReducer, []);
  const { toast } = useToast();
  const { isArabic } = useLanguage();

  // Enhanced dispatch with toast notifications
  const dispatch = useCallback(
    (action: TodoAction) => {
      try {
        const result = baseDispatch(action);

        // Show success messages for successful operations
        switch (action.type) {
          case "add_task": {
            if (action.payload?.title) {
              const hasValidContent =
                action.payload.title.en?.trim().length > 2 ||
                action.payload.title.ar?.trim().length > 2;

              if (hasValidContent) {
                toast({
                  title: translations.taskAdded[isArabic ? "ar" : "en"],
                  description: isArabic
                    ? "تم إضافة المهمة بنجاح!"
                    : "Task added successfully!",
                  variant: "success",
                });
              } else {
                toast({
                  title: isArabic ? "خطأ" : "Error",
                  description: isArabic
                    ? "يرجى إدخال عنوان صالح للمهمة!"
                    : "Please enter a valid task title!",
                  variant: "destructive",
                });
              }
            }
            break;
          }

          case "check_task": {
            const task = todos.find((todo) => todo.id === action.taskId);
            if (task) {
              toast({
                title: task.completed
                  ? isArabic
                    ? "تم إلغاء المهمة"
                    : "Task Unchecked"
                  : translations.taskCompleted[isArabic ? "ar" : "en"],
                description: task.completed
                  ? isArabic
                    ? "تم إلغاء تحديد المهمة"
                    : "Task has been unchecked"
                  : isArabic
                    ? "تم إكمال المهمة بنجاح!"
                    : "Task completed successfully!",
                variant: "success",
              });
            }
            break;
          }

          case "delete_task":
            toast({
              title: translations.taskDeleted[isArabic ? "ar" : "en"],
              description: isArabic
                ? "تم حذف المهمة بنجاح!"
                : "Task has been deleted successfully!",
              variant: "destructive",
            });
            break;

          case "edit_task":
            toast({
              title: isArabic ? "تم التحديث" : "Task Updated",
              description: isArabic
                ? "تم تحديث المهمة بنجاح!"
                : "Task has been updated successfully!",
              variant: "success",
            });
            break;

          case "priority_selection": {
            const priorityText =
              translations[action.priority as keyof typeof translations];
            toast({
              title: isArabic ? "تم تحديث الأولوية" : "Priority Updated",
              description: `${isArabic ? "تم تعيين الأولوية إلى" : "Priority set to"} ${priorityText[isArabic ? "ar" : "en"]}`,
              variant: "success",
            });
            break;
          }
        }

        return result;
      } catch {
        // Show error messages for failed operations
        toast({
          title: isArabic ? "خطأ" : "Error",
          description: isArabic
            ? "حدث خطأ أثناء تنفيذ العملية"
            : "An error occurred while performing the operation",
          variant: "destructive",
        });

        return baseDispatch(action);
      }
    },
    [baseDispatch, toast, isArabic, todos],
  );

  const showSuccessMessage = useCallback(
    (message: string, title?: string) => {
      toast({
        title: title || (isArabic ? "نجح" : "Success"),
        description: message,
        variant: "success",
      });
    },
    [toast, isArabic],
  );

  const showErrorMessage = useCallback(
    (message: string, title?: string) => {
      toast({
        title: title || (isArabic ? "خطأ" : "Error"),
        description: message,
        variant: "destructive",
      });
    },
    [toast, isArabic],
  );

  return (
    <todosContext.Provider
      value={{
        dispatch,
        todos,
        showSuccessMessage,
        showErrorMessage,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};

export default ToDosProvider;
