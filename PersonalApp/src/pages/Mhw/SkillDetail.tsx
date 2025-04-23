import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../../css/SkillDetail.module.css";
import { Skills, Kind } from "../../interfaces/IMhwSkills";
import descriptionOverrides from "../../WildsSkillOverrides.json";
import Loading from "../../Loading";

async function fetchSkills(): Promise<Skills[]> {
    const response = await fetch('https://wilds.mhdb.io/en/skills');
    const data = await response.json();
    return data;
}

function applyOverrides(apiSkills: Skills[], overrides: any): Skills[] {
    return apiSkills.map(skill => {
        const override = overrides[skill.id];
        if (!override) return skill;

        return {
            ...skill,
            description: override.description || skill.description,
            ranks: skill.ranks.map(rank => ({
                ...rank,
                description: override.ranks?.[rank.id.toString()] || rank.description
            }))
        };
    });
}

export default function SkillDetail() {
    const { id } = useParams();
    const skillId = parseInt(id || "", 10);
    const [isLoading, setIsLoading] = useState(true);
    const [skills, setSkills] = useState<Skills[]>([]);

    useEffect(() => {
        setIsLoading(true);
        fetchSkills()
            .then(data => {
                const withOverrides = applyOverrides(data, descriptionOverrides);
                setSkills(withOverrides);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const skill = skills.find(s => s.id === skillId);

    if (isLoading) return <Loading />;
    if (!skill) return <p>Skill not found.</p>;

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
