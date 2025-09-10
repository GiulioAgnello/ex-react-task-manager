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

  const removeTask = async (taskId) => {
    const response = await fetch(`${VITE_APP_URL}/tasks/${taskId}`, {
      method: `DELETE`,
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };
  const updateTask = () => {
    // Effetture le op
  };

  return { tasks, addTask, removeTask, updateTask };
}
