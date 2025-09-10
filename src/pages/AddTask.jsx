import { useState, useRef, useContext } from "react";
import { TasksContext } from "../contexts/CountContext";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const { addTask } = useContext(TasksContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };
    await addTask(newTask);
    setTitle("");
    descriptionRef.current.value = "";
    statusRef.current.value = "To do";
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome del task</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrizione</label>
          <textarea
            className="form-control"
            ref={descriptionRef}
            rows={3}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Stato</label>
          <select className="form-select" ref={statusRef} defaultValue="To do">
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Aggiungi Task
        </button>
      </form>
    </div>
  );
}
