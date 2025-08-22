import { useContext } from "react";
import { todosContext } from "../context/todosContext";
export const useTodos = () => {
  const context = useContext(todosContext);
  if (!context) {
    throw new Error("useTodos hook must be within a TodosProvider.");
  }
  return context;
};
