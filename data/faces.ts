export interface FaceMashup {
    id: string;
    nameA: string;
    nameB: string;
    categoryA: string;
    categoryB: string;
    emoji: string;
    image?: string;
}

export const faceMashups: FaceMashup[] = ([
    ["Evo Morales", "Lionel Messi", "Bolivia", "Fútbol"], ["Shakira", "Bad Bunny", "Música", "Música"],
    ["Taylor Swift", "Marcelo Martins", "Música", "Fútbol"], ["Diego Maradona", "Luisito Comunica", "Fútbol", "Internet"],
    ["Emma Watson", "Gael García Bernal", "Cine", "Cine"], ["Pedro Pascal", "Karla Sofía Gascón", "Cine", "Cine"],
    ["Jennifer Lopez", "Carlos Vives", "Música", "Música"], ["Cristiano Ronaldo", "The Weeknd", "Fútbol", "Música"],
    ["Brad Pitt", "Salma Hayek", "Cine", "Cine"], ["Billie Eilish", "Dua Lipa", "Música", "Música"],
] as const).map(([nameA, nameB, categoryA, categoryB], index) => ({
    id: `face-${index + 1}`, nameA, nameB, categoryA, categoryB, emoji: "👨‍🎤",
    image: `/images/coming-soon-${["blue", "pink", "green"][index % 3]}.png`,
}));
