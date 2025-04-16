import styles from "../css/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2>Welcome to my website!</h2>
      <p>
        Here you'll find tools I've made for some of the games I enjoy playing.
      </p>
      <p>
        In the future, I may add more features, but for now, feel free to
        explore and enjoy what’s available.
      </p>
      <p className={styles.feedback}>
        Got suggestions? Let me know!
      </p>
    </div>
  );
}
