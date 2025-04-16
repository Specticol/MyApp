import { useState } from 'react'
import styles from '../css/Smt.module.css'

export default function Smt() {
    const [price, setPrice] = useState<number>(0)

    const newPrice = (price * 2) / 100 - 0.01

    return (
        <div className={styles.calculator}>
            <h2 className={styles.heading}>Super Market Together Page</h2>
            <p className={styles.subtitle}>Price Calculator</p>

            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter price"
                className={styles.input}
            />

            <p className={styles.result}>Price: {newPrice.toFixed(2)}</p>
        </div>
    )
}
