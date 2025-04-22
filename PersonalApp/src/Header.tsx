import { Link } from "react-router-dom"
import styles from './Header.module.css'
import { useState, useEffect } from "react";

function Header() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
<nav className={styles.navbar}>
  <div className={styles.links}>
    <Link to="/" className={styles.link}>Home</Link>
    <Link to="/SuperMarket" className={styles.link}>Super Market</Link>
    <Link to="/ScheduleI" className={styles.link}>Schedule I</Link>
    <Link to="/Mhw" className={styles.link}>Mhw</Link>
  </div>

  <div className={styles.rightSection}>
    <button className={styles.themeToggle} onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
    <div className={styles.logo}>Specticol</div>
  </div>
</nav>
  )
}

export default Header
