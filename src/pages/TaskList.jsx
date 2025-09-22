import { useContext, useMemo, useState } from "react";
import { TasksContext } from "../contexts/CountContext";
import TaskRow from "../components/TaskRow";

function debounce(callback, wait) {
  let timer;
  return (value) => {
    console.log(timer);
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, wait);
  };
}

export default function TaskList() {
  const { tasks, removeMultipleTask } = useContext(TasksContext);
  console.log(`Tasks:`, tasks);
  const [sortBy, setSortBy] = useState(`createdAt`);
  const [sortOrder, setSortOrder] = useState(1);
  const [query, setQuery] = useState("");
  const sortIcon = sortOrder === 1 ? "↓" : "↑";
  const [selectedTaskId, setSelectedTaskId] = useState([]);
  function toggleSelection(taskId) {
    setSelectedTaskId((prev) => {
      if (selectedTaskId.includes(taskId)) {
        return prev.filter((id) => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  }

  function callBackDebounce() {}

  const debouncedQuery = debounce(setQuery, 500);

  const handelSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const handeldeliteMutiple = async () => {
    try {
      await removeMultipleTask(selectedTaskId);
      alert(`Tasks eliminate con successo`);
      setSelectedTaskId([]);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const sortedTask = useMemo(() => {
    return [...tasks]
      .filter((t) => t.title.toLowerCase().includes(query.toLocaleLowerCase()))
      .sort((a, b) => {
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
  }, [tasks, sortBy, sortOrder, query]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Task List</h1>
      <input
        type="text"
        className="form-control mb-4 w-100"
        placeholder="Cerca Task"
        onChange={(e) => debouncedQuery(e.target.value)}
      />
      {selectedTaskId.length > 0 && (
        <button onClick={handeldeliteMutiple}>Elimina select</button>
      )}
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
                  <TaskRow
                    key={task.id}
                    task={task}
                    checked={selectedTaskId.includes(task.id)}
                    onToggle={toggleSelection}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
