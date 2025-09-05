export default function TaskRow({ task }) {
  // Determina la classe di colore in base allo stato
  let statusBg = "bg-secondary";
  if (task.status === "To do") statusBg = "bg-danger";
  else if (task.status === "Doing") statusBg = "bg-warning text-dark";
  else if (task.status === "Done") statusBg = "bg-success";

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span className="fw-bold">{task.title}</span>
      <span className={`badge ${statusBg} mx-2`}>{task.status}</span>
      <span className="text-muted small">{task.createdAt}</span>
    </li>
  );
}
