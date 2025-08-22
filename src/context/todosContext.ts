import type { Dispatch } from "react";
import { createContext } from "react";
import type { toDoTypes } from "../constants";
import type { TodoAction } from "../reducers/todosReducer";

interface todosTypes {
  todos: toDoTypes[] | [];
  dispatch: Dispatch<TodoAction>;
  showSuccessMessage: (message: string, title?: string) => void;
  showErrorMessage: (message: string, title?: string) => void;
}

export const todosContext = createContext<null | todosTypes>(null);
