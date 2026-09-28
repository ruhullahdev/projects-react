import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
  return (
    <header className={styles.header}>
      <h2 className={styles.brand}>Portfolio</h2>

      <nav className={styles.nav} aria-label="Main navigation">
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/projects" className={styles.link}>
          Projects
        </Link>
        <Link to="/" className={styles.link}>
          Profile
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;