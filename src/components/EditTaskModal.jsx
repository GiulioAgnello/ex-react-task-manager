import { useState, useRef } from "react";
import Modal from "./Modal";
import { Form } from "react-router-dom";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editTask, setEditTask] = useState(task);
  const editRef = useRef();
  const modifyEditedTask = (key, event) => {
    setEditTask((prev) => ({ ...prev, [key]: event.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editTask);
  };

  return (
    <Modal
      title="Modifica Task"
      content={
        <>
          <form ref={editRef} onSubmit={handleSubmit}>
            <label>
              Name Task:
              <input
                type="text"
                value={editTask.title}
                onChange={(e) => modifyEditedTask(`title`, e)}
              />
            </label>
            <label>
              Descrizione:
              <textarea
                value={editTask.description}
                onChange={(e) => modifyEditedTask(`description`, e)}
              ></textarea>
            </label>
            <label>
              Stato:
              <select
                value={editTask.status}
                onChange={(e) => modifyEditedTask(`status`, e)}
              >
                {["to do", "doing", "done"].map((value, i) => {
                  <option value={value} key={i}>
                    {value}
                  </option>;
                })}
              </select>
            </label>
          </form>
        </>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => editRef.current.requestSubmit()}
    />
  );
}
