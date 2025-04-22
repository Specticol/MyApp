import { useParams, Link } from "react-router-dom";
import data from "../../WildsSkills.json";
import { Skills, Kind } from "../../interfaces/IMhwSkills";
import styles from "../../css/SkillDetail.module.css";


export default function SkillDetail() {
    const { id } = useParams();

    const skillId = parseInt(id || "", 10);

    // Cast kind to enum while mapping
    const mappedData: Skills[] = data.map((item) => ({
        ...item,
        kind: item.kind as Kind,
    }));

    const skill: Skills | undefined = mappedData.find((s) => s.id === skillId);

    if (!skill) {
        return <p>Skill not found.</p>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{skill.name}</h2>
            <div className={styles.detailItem}>
                <strong>Type:</strong> {skill.kind}
            </div>
            <div className={styles.detailItem}>
                <strong>Description:</strong> {skill.description || "No description"}
            </div>

            <h3 className={styles.detailItem}>Ranks:</h3>
            <ul className={styles.rankList}>
                {skill.ranks.map((rank, index) => (
                    <li key={index} className={styles.rankItem}>
                        <strong>Level {rank.level}:</strong> {rank.description}
                    </li>
                ))}
            </ul>

            <Link to="/Mhw/Skills" className={styles.backLink}>← Back to Skills</Link>
        </div>

    );
}
