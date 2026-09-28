import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectsLayout from "./pages/ProjectsLayout";
import GitHubProfile from "./pages/GitHubProfile";
import Country from "./pages/Country";
import ToDoList from "./pages/ToDoList"

// This layout keeps the navbar visible while the route-specific page changes.
function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All pages share the navbar through AppLayout's Outlet. */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />

          {/* Project pages are nested so they share the /projects URL prefix. */}
          <Route path="/projects" element={<ProjectsLayout />}>
            {/* The index route is displayed at exactly /projects. */}
            <Route index element={<Projects />} />
            <Route path="github-profile" element={<GitHubProfile />} />
            <Route path="countries" element={<Country />} />
            <Route path="todolist" element={<ToDoList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
