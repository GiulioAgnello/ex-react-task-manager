import { useContext, useMemo, useState } from "react";
import { TasksContext } from "../contexts/CountContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(TasksContext);
  console.log(`Tasks:`, tasks);
  const [sortBy, setSortBy] = useState(`createdAt`);
  const [sortOrder, setSortOrder] = useState(1);

  const sortIcon = sortOrder === 1 ? "↓" : "↑";

  const handelSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortedTask = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let comparison;

      if (sortBy === `title`) {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === `status`) {
        const statusOption = ["To do", "Doing", "Done"];
        comparison =
          statusOption.indexOf(a.status) - statusOption.indexOf(b.status);
      } else if (sortBy === `createdAt`) {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
      }
      return comparison * sortOrder;
    });
  }, [tasks, sortBy, sortOrder]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Task List</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold" onClick={() => handelSort(`title`)}>
                    Title {sortBy === `title` && sortIcon}
                  </span>
                  <span
                    className="fw-bold"
                    onClick={() => handelSort(`status`)}
                  >
                    Status {sortBy === `status` && sortIcon}
                  </span>
                  <span
                    className="fw-bold"
                    onClick={() => handelSort(`createdAt`)}
                  >
                    CreatedAt {sortBy === `createdAt` && sortIcon}
                  </span>
                </li>
                {sortedTask.map((task) => (
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
