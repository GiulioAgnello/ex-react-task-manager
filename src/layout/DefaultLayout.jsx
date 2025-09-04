import { Outlet } from "react-router";
import Header from "./Header";

export default function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
