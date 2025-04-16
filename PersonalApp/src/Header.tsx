import { Link } from "react-router-dom"
import styles from './Header.module.css'

function Header() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/smt" className={styles.link}>Super Market</Link>
        <Link to="/ScheduleI" className={styles.link}>Schedule I</Link>

      </div>
      <div className={styles.logo}>Specticol</div>
    </nav>
  )
}

export default Header
