export interface Armor {
    kind:        ArmorKind;
    name:        string;
    description: string;
    rank:        Rank;
    rarity:      number;
    resistances: Resistances;
    defense:     Defense;
    skills:      SkillElement[];
    slots:       number[];
    armorSet:    ArmorSet;
    crafting:    Crafting;
    id:          number;
}

export interface ArmorSet {
    id:   number;
    name: string;
}

export interface Crafting {
    armor:     ArmorClass;
    materials: Material[];
    zennyCost: number;
    id:        number;
}

export interface ArmorClass {
    id: number;
}

export interface Material {
    item:     Item;
    quantity: number;
    id:       number;
}

export interface Item {
    id:          number;
    gameId:      number;
    rarity:      number;
    name:        string;
    description: string;
    value:       number;
    carryLimit:  number;
    recipes:     any[];
    icon:        ItemIcon;
}

export interface ItemIcon {
    id:      number;
    kind:    PurpleKind;
    colorId: number;
    color:   Color;
}

export enum Color {
    Blue = "blue",
    BluePurple = "blue-purple",
    Brown = "brown",
    DarkPurple = "dark-purple",
    Gray = "gray",
    Green = "green",
    Ivory = "ivory",
    Lemon = "lemon",
    Orange = "orange",
    Pink = "pink",
    Purple = "purple",
    Red = "red",
    Rose = "rose",
    Sky = "sky",
    Ultramarine = "ultramarine",
    Vermilion = "vermilion",
    White = "white",
    Yellow = "yellow",
}

export enum PurpleKind {
    Bone = "bone",
    Bug = "bug",
    Certificate = "certificate",
    Claw = "claw",
    Coin = "coin",
    Crystal = "crystal",
    Extract = "extract",
    Gem = "gem",
    Hide = "hide",
    Honey = "honey",
    Medulla = "medulla",
    MysteryMaterial = "mystery-material",
    Ore = "ore",
    Plant = "plant",
    Plate = "plate",
    Powder = "powder",
    Question = "question",
    Scale = "scale",
    Shell = "shell",
    Skull = "skull",
    Tail = "tail",
    Wing = "wing",
}

export interface Defense {
    base: number;
    max:  number;
}

export enum ArmorKind {
    Arms = "arms",
    Chest = "chest",
    Head = "head",
    Legs = "legs",
    Waist = "waist",
}

export enum Rank {
    High = "high",
    Low = "low",
}

export interface Resistances {
    fire:    number;
    water:   number;
    ice:     number;
    thunder: number;
    dragon:  number;
}

export interface SkillElement {
    skill:       SkillSkill;
    level:       number;
    name:        null;
    description: string;
    id:          number;
}

export interface SkillSkill {
    id:     number;
    gameId: number;
    name:   string;
    kind:   SkillKind;
    icon:   SkillIcon;
}

export interface SkillIcon {
    id:   number;
    kind: FluffyKind;
}

export enum FluffyKind {
    Attack = "attack",
    Defense = "defense",
    Gathering = "gathering",
    Health = "health",
    Item = "item",
    Offense = "offense",
    Stamina = "stamina",
    Utility = "utility",
}

export enum SkillKind {
    Armor = "armor",
}
