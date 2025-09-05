import { useContext } from "react";
import { TasksContext } from "../contexts/CountContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(TasksContext);
  console.log(`Tasks:`, tasks);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Task List</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {tasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
