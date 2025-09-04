const { VITE_APP_URL } = import.meta.env;
import { createContext, useEffect, useState } from "react";
const TasksContext = createContext();
// Definiamo un custom Provider
function GlobalProvider({ children }) {
  // stato che vogliamo condividere
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch(`${VITE_APP_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
// Definiamo un hook per consumare il contesto
// function useCount() {
//   const context = useContext(CountContext);
//   return context;
// }
// Esportiamo il nostro provider ed il nostro hook
export { GlobalProvider, TasksContext };
