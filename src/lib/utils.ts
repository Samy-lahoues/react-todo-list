import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const getTodaysDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Data sanitization utilities
import type { toDoTypes } from "../constants";

const sanitizeTodoText = (text: unknown): { en: string; ar: string } => {
  if (!text || typeof text !== "object") {
    return { en: "", ar: "" };
  }

  const textObj = text as Record<string, unknown>;

  return {
    en: typeof textObj.en === "string" ? textObj.en : "",
    ar: typeof textObj.ar === "string" ? textObj.ar : "",
  };
};

const validatePriority = (priority: unknown): "high" | "medium" | "low" => {
  if (
    typeof priority === "string" &&
    ["high", "medium", "low"].includes(priority)
  ) {
    return priority as "high" | "medium" | "low";
  }
  return "low";
};

const sanitizeTodo = (todo: unknown): toDoTypes | null => {
  if (!todo || typeof todo !== "object") {
    return null;
  }

  const todoObj = todo as Record<string, unknown>;

  if (!todoObj.id) {
    return null;
  }

  return {
    id: typeof todoObj.id === "string" ? todoObj.id : String(todoObj.id),
    text: sanitizeTodoText(todoObj.text),
    completed: Boolean(todoObj.completed),
    priority: validatePriority(todoObj.priority),
    dueDate:
      typeof todoObj.dueDate === "string" ? todoObj.dueDate : getTodaysDate(),
  };
};

const sanitizeTodosArray = (todos: unknown): toDoTypes[] => {
  if (!Array.isArray(todos)) {
    return [];
  }

  return todos
    .map(sanitizeTodo)
    .filter((todo): todo is toDoTypes => todo !== null);
};

const loadTodosFromStorage = (): toDoTypes[] => {
  try {
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) {
      return [];
    }

    const parsedTodos = JSON.parse(storedTodos);
    return sanitizeTodosArray(parsedTodos);
  } catch {
    return [];
  }
};

export {
  getTodaysDate,
  cn,
  sanitizeTodo,
  sanitizeTodosArray,
  loadTodosFromStorage,
};
