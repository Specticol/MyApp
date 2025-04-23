import { useEffect, useState } from "react";
import { Armor } from "../../interfaces/IMhwArmor";
import Loading from "../../Loading";

type SlotProps = {
    Slots: number[]
}

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
        if (Slots[i] == 1) {
            SlotShown.push(`\u2460`)
        } else if (Slots[i] == 2) {
            SlotShown.push(`\u2461`)
        } else if (Slots[i] == 3) {
            SlotShown.push(`\u2462`)
        } else { SlotShown.push(`\u3280`) }
    }
    return <p>Slots: {SlotShown.map(a => (a))}</p>
}
//group armor sets into array
function groupArmorSets(){
    
}


export default function MhwArmor() {

    const [armor, setArmor] = useState<Armor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState("infoPieces");


    // Loadin Api
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
    // Searchbar
    const filteredArmor = armor.filter((a) => {
        const nameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
        const skillMatch = a.skills.some(skill =>
            skill.skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return nameMatch || skillMatch;
    });
    if (isLoading) {
        return (
            <>
                <Loading />
            </>
        )
    }




    return (
        <>
            <h2>Armor Page WIP</h2>
            {/*SearchBar */}
            <div>
                <input
                    type="text"
                    placeholder="Search by armor or skill name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: "0.5rem", margin: "1rem 0", width: "100%" }}
                />
            </div>
            {/*RadioCheck */}
            <div>
                <label>
                    <input
                        type="radio"
                        name="info"
                        value="infoPieces"
                        checked={selectedOption === "infoPieces"}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    Armor Pieces
                </label>

                <label>
                    <input
                        type="radio"
                        name="info"
                        value="infoSets"
                        checked={selectedOption === "infoSets"}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    Armor Sets
                </label>
            </div>
            {/*Armor pieces */}
            {selectedOption === "infoPieces" && (
                <div>
                    {
                        filteredArmor.map((a, i) => (
                            <div key={i} style={{ backgroundColor: `var(--bg-color)` }}>

                                <p>{a.kind} piece</p>
                                <p>Name: {a.name}</p>
                                <p>Rank: {a.rank}</p>
                                <p>Defense: {a.defense.base}</p>
                                <div>{a.skills.map(skill => (
                                    <p key={skill.skill.id}>Skill: {skill.skill.name}</p>
                                ))}</div>

                                <p>{<SlotAmount Slots={a.slots} />}</p>
                            </div>
                        ))
                    }
                </div>
            )}
            {/*Armor set */}

            {selectedOption === "infoSets" && (
                <div>
                    {
                        filteredArmor.map((a, i) => (
                            <div key={i} style={{ backgroundColor: `var(--bg-color)` }}>

                                <p>{a.armorSet.name} set</p>

                            </div>
                        ))
                    }
                </div>
            )}


        </>
    )
}
//https://wilds.mhdb.io/en/armor