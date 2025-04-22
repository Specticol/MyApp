import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.vortex}>
        <div className={styles.ring1}></div>
        <div className={styles.ring2}></div>
        <div className={styles.ring3}></div>
      </div>
    </div>
  );
}
