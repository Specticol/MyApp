export interface Skills {
    name:        string;
    kind:        Kind;
    description: null | string;
    ranks:       Rank[];
    id:          number;
    gameId:      number;
}

export enum Kind {
    Armor = "armor",
    Group = "group",
    Set = "set",
    Weapon = "weapon",
}

export interface Rank {
    skill:       Skill;
    level:       number;
    name:        null | string;
    description: string;
    id:          number;
}

export interface Skill {
    id: number;
}
