import { useEffect, useState } from "react";
import { Armor } from "../../interfaces/IMhwArmor";
import Loading from "../../Loading";
import styles from "../../css/Mhwarmor.module.css";
import { Link } from "react-router-dom";

type SlotProps = {
    Slots: number[];
};

type GroupedArmorSet = {
    name: string;
    rank: string;
    totalDefense: number;
    skills: { [name: string]: number};
    slotCounts: Record<1 | 2 | 3, number>;
};

// Fetches APi
async function fetchArmor(): Promise<Armor[]> {
    const response = await fetch('https://wilds.mhdb.io/en/armor');
    const data = await response.json();
    return data;
}

// Shows Slots nicely
function SlotAmount({ Slots }: SlotProps) {
    let SlotShown: string[] = [];
    for (let i = 0; i < 3; i++) {
        if (Slots[i] === 1) {
            SlotShown.push(`\u2460`);
        } else if (Slots[i] === 2) {
            SlotShown.push(`\u2461`);
        } else if (Slots[i] === 3) {
            SlotShown.push(`\u2462`);
        } else {
            SlotShown.push(`\u3280`);
        }
    }
    return <p className={styles.slotAmount}>Slots: {SlotShown.join(", ")}</p>;
}

function groupArmorSets(armorArray: Armor[]): GroupedArmorSet[] {
    const grouped: { [name: string]: GroupedArmorSet } = {};

    for (const piece of armorArray) {
        const setName = piece.armorSet.name;

        if (!grouped[setName]) {
            grouped[setName] = {
                name: setName,
                rank: piece.rank,
                totalDefense: 0,
                skills: {},
                slotCounts: { 1: 0, 2: 0, 3: 0 },
            };
        }

        // Add defense
        grouped[setName].totalDefense += piece.defense.base;

        // Add skills
        for (const s of piece.skills) {
            const skillName = s.skill.name;
            if (!grouped[setName].skills[skillName]) {
                grouped[setName].skills[skillName] = 0;
            }
            grouped[setName].skills[skillName] += s.level;
        }

        // Add slots
        for (const slot of piece.slots) {
            if (slot >= 1 && slot <= 3) {
                (grouped[setName].slotCounts[slot as 1 | 2 | 3])++;
            }
        }
    }

    return Object.values(grouped);
}

export default function MhwArmor() {
    const [armor, setArmor] = useState<Armor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState("infoPieces");
    const [rankFilter, setRankFilter] = useState<"All" | "Low" | "High">("All");

    // Load data
    useEffect(() => {
        setIsLoading(true);
        fetchArmor()
            .then((data) => {
                setArmor(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Filtering based on search term and rank
    const filteredArmor = armor.filter((a) => {
        const nameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
        const skillMatch = a.skills.some(skill =>
            skill.skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const rankMatch =
            rankFilter === "All" || a.rank.toLowerCase() === rankFilter.toLowerCase();

        return (nameMatch || skillMatch) && rankMatch;
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Monster Hunter Armors</h1>

            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBar}
            />

            <div className={styles.buttonContainer}>
                <div className={styles.filterButtons}>
                    <button
                        className={selectedOption === "infoPieces" ? styles.active : ""}
                        onClick={() => setSelectedOption("infoPieces")}
                    >
                        Armor Pieces
                    </button>
                    <button
                        className={selectedOption === "infoSets" ? styles.active : ""}
                        onClick={() => setSelectedOption("infoSets")}
                    >
                        Armor Sets
                    </button>
                </div>

                <div className={styles.filterButtonsRight}>
                    <button
                        className={rankFilter === "All" ? styles.active : ""}
                        onClick={() => setRankFilter("All")}
                    >
                        All Ranks
                    </button>
                    <button
                        className={rankFilter === "Low" ? styles.active : ""}
                        onClick={() => setRankFilter("Low")}
                    >
                        Low Rank
                    </button>
                    <button
                        className={rankFilter === "High" ? styles.active : ""}
                        onClick={() => setRankFilter("High")}
                    >
                        High Rank
                    </button>
                </div>
            </div>

            {selectedOption === "infoPieces" && (
                <div>
                    {filteredArmor.map((a, i) => (
                        <div key={i} className={styles.skillCard}>
                            <h3>{a.name}</h3>
                            <p><strong>Type:</strong> {a.kind}</p>
                            <p><strong>Rank:</strong> {a.rank}</p>
                            <p><strong>Defense:</strong> {a.defense.base}</p>
                            <p><strong>Skills:</strong></p>
                            <div>{a.skills.map(skill => (
                                <li key={skill.skill.id}> {skill.skill.name} Lv{skill.level}</li>
                            ))}</div>
                            <SlotAmount Slots={a.slots} />
                        </div>
                    ))}
                </div>
            )}

            {selectedOption === "infoSets" && (
                <div>
                    {groupArmorSets(filteredArmor).map((set, i) => (
                        <div key={i} className={styles.skillCard}>
                            <h3>{set.name} Set</h3>
                            <p><strong>Rank:</strong> {set.rank}</p>
                            <p><strong>Total Defense:</strong> {set.totalDefense}</p>
                            <p><strong>Skills:</strong></p>
                            <div>
                                {Object.entries(set.skills).map(([skillName, level]) => (
                                   <li key={skillName}>{skillName} Lv{level}</li>
                                ))}
                            </div>
                            <p><strong>Slots:</strong></p>
                            <div>
                                <li><strong>Lv 1:</strong> {set.slotCounts[1]}</li>
                                <li><strong>Lv 2:</strong> {set.slotCounts[2]}</li>
                                <li><strong>Lv 3:</strong> {set.slotCounts[3]}</li>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {filteredArmor.length === 0 && (
                <p className={styles.noResults}>No matching skills found.</p>
            )}
        </div>
    );

}
