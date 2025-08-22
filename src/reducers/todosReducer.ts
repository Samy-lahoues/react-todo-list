import { getTodaysDate } from "../lib/utils";
import { v4 as uuid } from "uuid";
import type { toDoTypes } from "../constants";

// Define action types for better type safety
export type TodoAction =
  | { type: "update"; todos: toDoTypes[] }
  | { type: "add_task"; payload: { title: { en: string; ar: string } } }
  | { type: "check_task"; taskId: string }
  | { type: "delete_task"; taskToDelete: string }
  | {
      type: "edit_task";
      taskToEdit: string;
      editedTaskTitle: { en: string; ar: string };
    }
  | {
      type: "priority_selection";
      taskId: string;
      priority: "high" | "medium" | "low";
    }
  | { type: "find_by_id"; taskId: string };

// Validation utilities
const validateTaskTitle = (title: { en: string; ar: string }): boolean => {
  if (!title || typeof title !== "object") {
    return false;
  }

  const enValid = typeof title.en === "string" && title.en.trim().length > 2;
  const arValid = typeof title.ar === "string" && title.ar.trim().length > 2;

  return enValid || arValid;
};

const validateTaskId = (taskId: string): boolean => {
  return typeof taskId === "string" && taskId.trim().length > 0;
};

const validatePriority = (
  priority: string,
): priority is "high" | "medium" | "low" => {
  return ["high", "medium", "low"].includes(priority);
};

// Safe localStorage operations
const safeLocalStorageSet = (key: string, data: toDoTypes[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

const todosReducer = (
  currentTodos: toDoTypes[],
  action: TodoAction,
): toDoTypes[] => {
  switch (action.type) {
    case "update": {
      return action.todos;
    }

    case "add_task": {
      if (!action.payload || !action.payload.title) {
        return currentTodos;
      }

      if (!validateTaskTitle(action.payload.title)) {
        return currentTodos;
      }

      try {
        const newTodo: toDoTypes = {
          id: uuid(),
          text: {
            en: action.payload.title.en.trim(),
            ar: action.payload.title.ar.trim(),
          },
          completed: false,
          priority: "low" as const,
          dueDate: getTodaysDate(),
        };

        const newTodos = [...currentTodos, newTodo];
        safeLocalStorageSet("todos", newTodos);
        return newTodos;
      } catch {
        return currentTodos;
      }
    }

    case "check_task": {
      if (!validateTaskId(action.taskId)) {
        return currentTodos;
      }

      const taskExists = currentTodos.some((todo) => todo.id === action.taskId);
      if (!taskExists) {
        return currentTodos;
      }

      const newTodos = currentTodos.map((todo) => {
        if (todo.id === action.taskId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      safeLocalStorageSet("todos", newTodos);
      return newTodos;
    }

    case "delete_task": {
      if (!validateTaskId(action.taskToDelete)) {
        return currentTodos;
      }

      const taskExists = currentTodos.some(
        (todo) => todo.id === action.taskToDelete,
      );
      if (!taskExists) {
        return currentTodos;
      }

      const newTodos = currentTodos.filter(
        (todo) => todo.id !== action.taskToDelete,
      );
      safeLocalStorageSet("todos", newTodos);
      return newTodos;
    }

    case "edit_task": {
      if (!validateTaskId(action.taskToEdit)) {
        return currentTodos;
      }

      if (!validateTaskTitle(action.editedTaskTitle)) {
        return currentTodos;
      }

      const taskExists = currentTodos.some(
        (todo) => todo.id === action.taskToEdit,
      );
      if (!taskExists) {
        return currentTodos;
      }

      const editedTodos = currentTodos.map((todo) => {
        if (action.taskToEdit === todo.id) {
          return {
            ...todo,
            text: {
              en: action.editedTaskTitle.en.trim(),
              ar: action.editedTaskTitle.ar.trim(),
            },
          };
        }
        return todo;
      });
      safeLocalStorageSet("todos", editedTodos);
      return editedTodos;
    }

    case "priority_selection": {
      if (!validateTaskId(action.taskId)) {
        return currentTodos;
      }

      if (!validatePriority(action.priority)) {
        return currentTodos;
      }

      const taskExists = currentTodos.some((todo) => todo.id === action.taskId);
      if (!taskExists) {
        return currentTodos;
      }

      const newTodos = currentTodos.map((todo) => {
        if (todo.id === action.taskId) {
          return { ...todo, priority: action.priority };
        }
        return todo;
      });
      safeLocalStorageSet("todos", newTodos);
      return newTodos;
    }

    case "find_by_id": {
      return currentTodos;
    }

    default: {
      return currentTodos;
    }
  }
};

export default todosReducer;
