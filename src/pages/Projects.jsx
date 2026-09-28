import { Link } from "react-router-dom";
import styles from "./Project.module.css";

const projects = [
  {
    name: "GitHub API",
    link: "/projects/github-profile",
    about:
      "This allows you to search for the user profile of anyone on GitHub using the github api.",
  },
  {
    name: "Country API",
    link: "/projects/countries",
    about:
      "This allows you to search for a county or use filters to get data from the Ninja County API",
  },
  {
    name: "Number Guessing Game",
    link: "",
    about:
      "Try to guess the randomly selected number in a set amount of guesses",
  },
  {
    name: "Movie Database",
    link: "",
    about: "This allows you to fetch the data about a movie using geh XYZ API",
  },
  {
    name: "Calculator",
    link: "",
    about: "This is a basic calculator using react and focusing on design",
  },
  {
    name: "Note App",
    link: "/projects/todolist",
    about:
      "A refined app to take, edit and check your notes to improve your productivity and using local storage to save your data on your browser.",
  },
];

function Projects() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Projects</h1>
        <p className={styles.headerSubtitle}>
          A collection of frontend experiments and practical apps built with React.
        </p>
      </header>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div key={project.link} className={styles.card}>
            <div>
              <div className={styles.cardHeader}>
                <span className={styles.index}>{index + 1}</span>
                <span className={styles.badge}>App</span>
              </div>

              <h2 className={styles.title}>{project.name}</h2>
              <p className={styles.description}>{project.about}</p>
            </div>

            <Link to={project.link} className={styles.link}>
              View Project
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
