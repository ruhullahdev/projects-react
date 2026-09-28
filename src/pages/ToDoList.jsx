import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useReducer, useState } from "react";
import styles from "./ToDoList.module.css";

const initialState = [];

function todoReducer(state, action) {
  switch (action.type) {
    case "Add-ToDo":
      return [
        ...state,
        {
          task: action.payload,
          id: Date.now(),
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );
    case "DELETE_TODO":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

function ToDoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputTask, setInputTask] = useState("");

  const activeTasks = state.filter((task) => !task.completed);
  const completedTasks = state.filter((task) => task.completed);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const trimmedTask = inputTask.trim();
    if (!trimmedTask) return;

    dispatch({
      type: "Add-ToDo",
      payload: trimmedTask,
    });

    setInputTask("");
  };

  return (
    <div className={styles.pageShell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link
            to="/projects"
            className={styles.backLink}
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>

          <h1 className={styles.pageTitle}>To-Do List</h1>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.hero}>
          <p className={styles.kicker}>Stay focused</p>
          <h2 className={styles.heroTitle}>Keep your day in order.</h2>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className={styles.taskForm}
        >
          <input
            className={styles.taskInput}
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            placeholder="Add a task..."
          />
          <button
            className={styles.addButton}
            type="submit"
          >
            Add Task
          </button>
        </form>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Active Tasks</h3>
            <span className={styles.sectionCount}>{activeTasks.length}</span>
          </div>

          <div className={styles.taskList}>
            {activeTasks.length === 0 ? (
              <p className={styles.emptyState}>No active tasks. Add one above.</p>
            ) : (
              activeTasks.map((task, index) => (
                <div
                  key={task.id}
                  className={styles.taskCard}
                >
                  <label className={styles.taskLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={task.completed}
                      onChange={() =>
                        dispatch({
                          type: "TOGGLE_TODO",
                          payload: task.id,
                        })
                      }
                    />
                    <span className={styles.taskText}>
                      {index + 1}. {task.task}
                    </span>
                  </label>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "DELETE_TODO",
                        payload: task.id,
                      })
                    }
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Completed Tasks</h3>
            <span className={styles.sectionCount}>{completedTasks.length}</span>
          </div>

          <div className={styles.taskList}>
            {completedTasks.length === 0 ? (
              <p className={styles.emptyState}>No completed tasks yet.</p>
            ) : (
              completedTasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`${styles.taskCard} ${styles.taskCardCompleted}`}
                >
                  <label className={styles.taskLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={task.completed}
                      onChange={() =>
                        dispatch({
                          type: "TOGGLE_TODO",
                          payload: task.id,
                        })
                      }
                    />
                    <span
                      className={`${styles.taskText} ${styles.taskTextCompleted}`}
                    >
                      {index + 1}. {task.task}
                    </span>
                  </label>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "DELETE_TODO",
                        payload: task.id,
                      })
                    }
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ToDoList;
