import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./GitHubProfile.module.css";

function GitHubProfile() {
  const [userName, setUserName] = useState("octocat");
  const [searchUser, setSearchUser] = useState("octocat");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const url = `https://api.github.com/users/${searchUser}`;

    const getData = async () => {
      setMessage("Loading...");
      setUser(null);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          setMessage("Sorry failed to fetch. Try again!");
          return;
        }

        const data = await response.json();

        if (data.message === "Not Found") {
          setMessage("No user found!");
          return;
        }

        setMessage("");
        setUser(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    getData();
  }, [searchUser]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchUser(userName.trim());
  };

  const messageClass =
    message === "Loading..."
      ? styles.messageLoading
      : message && (message.includes("Sorry") || message.includes("No user found"))
        ? styles.messageError
        : styles.messageSuccess;

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Link to="/projects" className={styles.backLink}>
          ← Back to Projects
        </Link>

        <header className={styles.header}>
          <h1 className={styles.pageTitle}>GitHub User Profiles</h1>
        </header>

        <div className={styles.searchCard}>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <input
              className={styles.input}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="Search for a user..."
            />
            <button type="submit" className={styles.button}>
              Search
            </button>
          </form>

          {message && (
            <p className={`${styles.message} ${messageClass}`}>{message}</p>
          )}
        </div>

        {user && (
          <>
            <div className={styles.profileCard}>
              <div className={styles.profileLeft}>
                <a
                  className={styles.nameLink}
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className={styles.name}>{user.name || user.login || ""}</h3>
                </a>

                <img
                  className={styles.avatar}
                  src={user.avatar_url}
                  alt="Profile Picture"
                />
              </div>

              <div className={styles.profileInfo}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>ID</span>
                    <span className={styles.value}>{user.id || ""}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.label}>Followers</span>
                    <span className={styles.value}>{user.followers}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.label}>Following</span>
                    <span className={styles.value}>{user.following}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.label}>Repos</span>
                    <span className={styles.value}>
                      {user.public_repos || "No public repository"}
                    </span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.label}>Location</span>
                  <span className={styles.value}>{user.location || "No data"}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.label}>Company</span>
                  <span className={styles.value}>{user.company || "No data"}</span>
                </div>

                <a
                  className={styles.linkText}
                  href={user.repos_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View public repositories
                </a>
              </div>
            </div>

            <div className={styles.bioCard}>
              <h4 className={styles.bioTitle}>Bio</h4>
              <p className={styles.bioText}>{user.bio || "Nothing to read here"}</p>

              {user.blog && (
                <a
                  className={styles.blogLink}
                  href={user.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read their blog
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GitHubProfile;
