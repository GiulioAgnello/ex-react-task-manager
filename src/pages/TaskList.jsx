import { useContext } from "react";
import { TasksContext } from "../contexts/CountContext";

export default function TaskList() {
  const { tasks } = useContext(TasksContext);
  console.log(`Tasks:`, tasks);

  return (
    <>
      <h1 className="text-center">Task List </h1>
      <div className="d-flex jusify-content-center align-item-center">
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                {task.title}, {task.status}:, {task.createdAt}:{" "}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
