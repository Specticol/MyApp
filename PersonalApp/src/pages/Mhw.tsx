import { useState, useEffect } from "react";
import data from "../Wilds.json"; // adjust path if needed

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

    return (
        <>
            <h2>Monster Hunter Skills</h2>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%" }}
            />

            {/* Filter Buttons */}
            <div style={{ marginBottom: "1rem" }}>
                <button onClick={() => setFilterKind("all")}>All</button>
                <button onClick={() => setFilterKind(Kind.Armor)}>Armor</button>
                <button onClick={() => setFilterKind(Kind.Weapon)}>Weapon</button>
                <button onClick={() => setFilterKind(Kind.Group)}>Group</button>
                <button onClick={() => setFilterKind(Kind.Set)}>Set</button>
            </div>

            {/* Skill List */}
            <div>
                {filteredSkills.map((skill) => (
                    <div
                        key={skill.id}
                        style={{
                            marginBottom: "1rem",
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "0.5rem",
                        }}
                    >
                        <p><strong>Name:</strong> {skill.name}</p>
                        <p><strong>Kind:</strong> {skill.kind}</p>
                        <p><strong>Max Lv:</strong> {skill.ranks.length}</p>
                        <p><strong>Description:</strong> {skill.description || "No description"}</p>
                        <ul>
                            {skill.ranks.map((rank) => (
                                <li key={rank.id}>
                                    <strong>Lv {rank.level}:</strong> {rank.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
