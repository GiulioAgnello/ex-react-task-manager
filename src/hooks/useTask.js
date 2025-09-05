const { VITE_APP_URL } = import.meta.env;
import { useEffect, useState } from "react";

export default function usetask() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch(`${VITE_APP_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  const addTask = async (newTask) => {
    const response = await fetch(`${VITE_APP_URL}/tasks`, {
      method: `POST`,
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const { success, message, task } = await response.json();
    if (!success) throw new Error(message);
    setTasks((prev) => [...prev, task]);
  };

  const removeTask = () => {
    // Effetture le op
  };
  const updateTask = () => {
    // Effetture le op
  };

  return { tasks, addTask, removeTask, updateTask };
}
