import { useState } from "react";
import styles from "../css/ScheduleI.module.css";

export default function ScheduleI() {
    const [price, setPrice] = useState<number>(0);
    const [amount, setAmount] = useState<number>(1);
    let newPrice = Math.min(Math.floor(price * 1.6), 999);
    const sellValue = Math.floor(newPrice * amount * 1.4);

    const [items, setItems] = useState([
        { name: "Motor", checked: false },
        { name: "Cuke", checked: false },
        { name: "Paracetamol", checked: false },
        { name: "Gasoline", checked: false },
        { name: "Cuke", checked: false },
        { name: "Battery", checked: false },
        { name: "Horse", checked: false },
        { name: "MegaBean", checked: false },
    ]);

    const toggleCheck = (index: number) => {
        const newItems = [...items];
        newItems[index].checked = !newItems[index].checked;
        setItems(newItems);
    };

    const resetChecklist = () => {
        const resetItems = items.map((item) => ({ ...item, checked: false }));
        setItems(resetItems);
    };

    return (
        <div className={styles.container}>
            <h2>Schedule I</h2>

            <div className={styles.section}>
                <p>Grand Daddy: $44</p>
                <p>Pink Diamond: $735</p>
            </div>

            <div className={styles.section}>
                <h3>Calculator</h3>

                <label className={styles.label}>Base Price</label>
                <input
                    type="text"
                    className={styles.input}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <p className={styles.result}>New Base Price: ${newPrice}</p>

                <label className={styles.label}>Amount</label>
                <input
                    type="text"
                    className={styles.input}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <p className={styles.result}>Max Sell Value: ${sellValue}</p>
            </div>

            <div className={styles.section}>
                <h3>Checklist</h3>
                {items
                    .sort((a, b) => Number(a.checked) - Number(b.checked))
                    .map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.checkItem} ${item.checked ? styles.checkedItem : ""}`}
                        >
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => toggleCheck(index)}
                            />
                            <label>{item.name}</label>
                        </div>
                    ))}
                <button className={styles.resetButton} onClick={resetChecklist}>
                    Reset
                </button>
            </div>
        </div>
    );
}
