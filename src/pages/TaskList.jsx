import { useContext } from "react";
import { TasksContext } from "../contexts/CountContext";

export default function TaskList() {
  const { tasks } = useContext(TasksContext);
  console.log(`Tasks:`, tasks);

  return (
    <>
      <h1>Task List</h1>
    </>
  );
}
