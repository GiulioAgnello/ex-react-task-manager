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
    const existTask = tasks.some((t) => t.title === newTask.title);
    if (existTask) {
      throw new Error("La task con questo nome già esiste");
    }
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

  const removeMultipleTask = async (taskIds) => {
    const deleteTaskReq = taskIds.map((taskId) =>
      fetch(`${VITE_APP_URL}/tasks/${taskId}`, {
        method: `DELETE`,
      }).then((res) => res.json())
    );
    const results = await Promise.allSettled(deleteTaskReq);
    const fullFillDelet = [];
    const rejectedDelet = [];

    results.forEach((result, index) => {
      const id = taskIds[index];
      if (result.status === "fulfilled" && result.value.success) {
        fullFillDelet.push(id);
      } else {
        rejectedDelet.push(id);
      }
    });

    if (fullFillDelet.length > 0) {
      setTasks((prev) => prev.filter((t) => !fullFillDelet.includes(t.id)));
    }

    if (rejectedDelet.length > 0) {
      throw new Error(
        `errore nell'eliminazione delle tasks ${rejectedDelet.join(",")}`
      );
    }
  };

  const updateTask = async (updatedTask) => {
    const response = await fetch(`${VITE_APP_URL}/tasks/${updatedTask.id}`, {
      method: `PUT`,
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const { success, message, task } = await response.json();
    if (!success) throw new Error(message);

    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  return { tasks, addTask, removeTask, updateTask, removeMultipleTask };
}
