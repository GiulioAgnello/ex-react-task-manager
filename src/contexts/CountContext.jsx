import usetask from "../hooks/useTask";
import { createContext } from "react";
const TasksContext = createContext();
// Definiamo un custom Provider
function GlobalProvider({ children }) {
  // stato che vogliamo condividere
  const taskData = usetask();
  return (
    <TasksContext.Provider value={{ ...taskData }}>
      {children}
    </TasksContext.Provider>
  );
}

export { GlobalProvider, TasksContext };
