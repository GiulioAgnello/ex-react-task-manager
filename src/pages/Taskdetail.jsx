import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TasksContext } from "../contexts/CountContext";
import usetask from "../hooks/useTask";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask } = useContext(TasksContext);
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return <h2 className="text-center text-danger p-5">Task non trovata !</h2>;
  }

  const deletTask = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliiminata!");
      navigate("/");
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
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
          <button className="btn btn-danger m-4" onClick={deletTask}>
            Cancella Task
          </button>
        </div>
      </div>
    </>
  );
}
