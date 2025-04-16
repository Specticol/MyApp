import { Link } from "react-router-dom"
import styles from './Header.module.css'

function Header() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/smt" className={styles.link}>SuperMarketTogether</Link>
      </div>
      <div className={styles.logo}>MyApp</div>
    </nav>
  )
}

export default Header
