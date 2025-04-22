import { Link } from "react-router-dom";
import styles from "../../css/Mhw.module.css";



export default function Mhw() {
    return (
        <>

            <div className={styles.container}>
                <h2 className={styles.heading}>Monster Hunter Wilds Info</h2>

                <div className={styles.links}>

                    <Link to="Skills" className={styles.link}>Skills</Link>
                    <Link to="Armor" className={styles.link}>Armor</Link>

                </div>

            </div>
        </>
    )
}
