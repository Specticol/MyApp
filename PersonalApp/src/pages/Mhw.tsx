import { useState, useEffect } from "react";
import data from "../Wilds.json";
import styles from "./Mhw.module.css";


export interface Skills {
    name: string;
    kind: Kind;
    description: null | string;
    ranks: Rank[];
    id: number;
    gameId: number;
}

export enum Kind {
    Armor = "armor",
    Group = "group",
    Set = "set",
    Weapon = "weapon",
}

export interface Rank {
    skill: Skill;
    level: number;
    name: null | string;
    description: string;
    id: number;
}

export interface Skill {
    id: number;
}

export default function Mhw() {
    const [skills, setSkills] = useState<Skills[]>([]);
    const [search, setSearch] = useState("");
    const [filterKind, setFilterKind] = useState<Kind | "all">("all");

    useEffect(() => {
        const mappedData: Skills[] = data.map((item) => ({
            ...item,
            kind: item.kind as Kind, // 👈 Force the 'kind' field to match the enum
        }));

        setSkills(mappedData);
    }, []);


    const filteredSkills = skills.filter((skill) => {
        const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase());
        const matchesKind = filterKind === "all" || skill.kind === filterKind;
        return matchesSearch && matchesKind;
    });


    // Then in your return:
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
                    <div key={skill.id} className={styles.skillCard}>
                        <p><strong>Name:</strong> {skill.name}</p>
                        <p><strong>Kind:</strong> {skill.kind}</p>
                        <p><strong>Max Lv:</strong> {skill.ranks.length}</p>
                        <p><strong>Description:</strong> {skill.description || "No description"}</p>
                    </div>
                ))
            )}
        </div>
    );
}
