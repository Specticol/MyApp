import { useState, useEffect } from "react";
import styles from "../../css/MhwSkills.module.css";
import { Skills, Kind } from "../../interfaces/IMhwSkills";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import descriptionOverrides from "../../WildsSkillOverrides.json";



async function fetchSkills(): Promise<Skills[]> {
    const response = await fetch('https://wilds.mhdb.io/en/skills');
    const data = await response.json();
    return data;
}
function applyDescriptionOverrides(apiSkills: Skills[], overrideDescriptions: any): Skills[] {
    return apiSkills.map(skill => {
        const override = overrideDescriptions[skill.id];
        if (!override) return skill;

        // Override top-level description
        const updatedSkill = {
            ...skill,
            description: override.description || skill.description,
            ranks: skill.ranks.map(rank => ({
                ...rank,
                description: override.ranks?.[rank.id] || rank.description
            }))
        };

        return updatedSkill;
    });
}

  


export default function MhwSkills() {
    const [skills, setSkills] = useState<Skills[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterKind, setFilterKind] = useState<Kind | "all">("all");

    useEffect(() => {
        setIsLoading(true);
        fetchSkills()
            .then((data) => {
                const overridden = applyDescriptionOverrides(data, descriptionOverrides);
                setSkills(overridden);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    

    const filteredSkills = skills.filter((skill) => {
        const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase());
        const matchesKind = filterKind === "all" || skill.kind === filterKind;
        return matchesSearch && matchesKind;
    });

    if (isLoading) { return <Loading /> }
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Monster Hunter Skills</h2>

            <input
                type="text"
                className={styles.searchBar}
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className={styles.filterButtons}>
                <button onClick={() => setFilterKind("all")}>All</button>
                <button onClick={() => setFilterKind(Kind.Armor)}>Armor</button>
                <button onClick={() => setFilterKind(Kind.Weapon)}>Weapon</button>
                <button onClick={() => setFilterKind(Kind.Group)}>Group</button>
                <button onClick={() => setFilterKind(Kind.Set)}>Set</button>
            </div>

            {filteredSkills.length === 0 ? (
                <p className={styles.noResults}>No skills found.</p>
            ) : (
                filteredSkills.map((skill) => (
                    <Link to={`/Mhw/skills/${skill.id}`} className={styles.skillCard}>
                        <p><strong>Name:</strong> {skill.name}</p>
                        <p><strong>Type:</strong> {skill.kind}</p>
                        <p><strong>Max Lv:</strong> {skill.ranks.length}</p>
                        <p><strong>Description:</strong> {skill.description || "No description"}</p>
                    </Link>

                ))
            )}
        </div>
    );
}
