import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { TasksContext } from "../contexts/CountContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
import dayjs from "dayjs";
export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useContext(TasksContext);
  const [showModal, setShowModal] = useState(false);
  const [showModifayModal, setShowModifayModal] = useState(false);
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return <h2 className="text-center text-danger p-5">Task non trovata !</h2>;
  }

  const deletTask = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleUpdate = async (editTask) => {
    try {
      await updateTask(editTask);
      setShowModifayModal(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  return (
    <>
      <div className="container">
        <div className="Card d-flex flex-column justify-content-center align-items-center p-5">
          <h1>{task.title} </h1>
          <strong>Description: {task.description}</strong>
          <strong>Status: {task.status}</strong>
          <p>
            <strong>Data creazione: </strong>
            {dayjs(task.createdAt).format("DD/MM/YYYY")}
          </p>
          <button
            className="btn btn-danger m-4"
            onClick={() => setShowModal(true)}
          >
            Cancella Task
          </button>
          <button
            className="btn btn-danger m-4"
            onClick={() => setShowModifayModal(true)}
          >
            Modifica Task
          </button>
        </div>
        <Modal
          title="Conferma eliminazione"
          content="Sei sicuro di violer eliminare questa Task?"
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={deletTask}
          confirmText="Eliminata"
        />
        <EditTaskModal
          task={task}
          show={showModifayModal}
          onClose={() => setShowModifayModal(false)}
          onSave={handleUpdate}
        />
      </div>
    </>
  );
}
