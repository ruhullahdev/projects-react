import { Outlet } from "react-router-dom";

function ProjectsLayout() {
  return (
    <main>
      {/* Child project routes render here, keeping each project on its own page. */}
      <Outlet />
    </main>
  );
}

export default ProjectsLayout;