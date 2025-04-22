import { useEffect, useState } from "react";
import { Armor } from "../../interfaces/IMhwArmor";


async function fetchUsers(): Promise<Armor[]> {
    const response = await fetch('https://wilds.mhdb.io/en/armor');
    const data = await response.json();
    return data;
}


export default function MhwArmor() {

    const [users, setUsers] = useState<Armor[]>([]);
    useEffect(() => {
        fetchUsers().then((data) => setUsers(data));
    }, []);


    return (
        <>
            <h2>Armor Page WIP</h2>
            <div>
                {
                    users.map(a => (
                        <div style={{ backgroundColor: "black" }}>
                            <p>{a.kind} piece</p>
                            <p>Name: {a.name}</p>
                            <p>Rank: {a.rank}</p>
                            <p>Defense: {a.defense.base}</p>
                            <p>{a.skills.map(a => (
                                <p>Skill: {a.skill.name}                   </p>
                            ))}</p>
                            <p>{a.slots.map((a,i)=>(<p>Slot {i+1}: level {a}</p>))}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
//https://wilds.mhdb.io/en/armor