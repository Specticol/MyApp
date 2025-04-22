import { useEffect, useState } from "react";
import { Armor } from "../../interfaces/IMhwArmor";
import Loading from "../../Loading";

type SlotProps = {
    Slots: number[]
}


async function fetchArmor(): Promise<Armor[]> {
    const response = await fetch('https://wilds.mhdb.io/en/armor');
    const data = await response.json();
    return data;
}

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
    return (
        <>
            <p>Slots: {SlotShown.map(a => (a))}</p>
        </>
    )
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
                        <div key={i} style={{ backgroundColor: "#1e1e1e" }}>

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
        </>
    )
}
//https://wilds.mhdb.io/en/armor