import styles from "../css/Footer.module.css";
import { lastUpdate } from "../lastUpdate";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Last Update: <span>{lastUpdate}</span>
    </footer>
  );
}
