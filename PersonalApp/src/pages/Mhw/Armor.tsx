import { useEffect, useState } from "react";
import { Armor } from "../../interfaces/IMhwArmor";
import Loading from "../../Loading";


async function fetchArmor(): Promise<Armor[]> {
    const response = await fetch('https://wilds.mhdb.io/en/armor');
    const data = await response.json();
    return data;
}


export default function MhwArmor() {

    const [armor, setArmor] = useState<Armor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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
            <div>
                {
                    armor.map((a, i) => (
                        <div key={i} style={{ backgroundColor: "black" }}>

                            <p>{a.kind} piece</p>
                            <p>Name: {a.name}</p>
                            <p>Rank: {a.rank}</p>
                            <p>Defense: {a.defense.base}</p>
                            <div>{a.skills.map(skill => (
                                <p key={skill.skill.id}>Skill: {skill.skill.name}</p>
                            ))}</div>

                            <p>{a.slots.map((a, i) => (<p>Slot {i + 1}: level {a}</p>))}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
//https://wilds.mhdb.io/en/armor