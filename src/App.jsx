import { BrowserRouter, Routes, Route } from "react-router";
import { GlobalProvider } from "./contexts/CountContext";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<TaskList />} />
              <Route path="/addTask" element={<AddTask />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
