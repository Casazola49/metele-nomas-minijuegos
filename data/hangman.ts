export interface HangmanWord {
    id: string;
    image: string;
    imageAlt: string;
    trapWord: string;
    correctWord: string;
    emoji: string;
}

export const hangmanWords: HangmanWord[] = ([
    ["persona negando", "negro", "negar", "🙅"], ["ladrón en acción", "delicioso", "delinquir", "🦹"],
    ["persona que corre", "corredor", "correr", "🏃"], ["niño que salta", "salto", "saltar", "🤸"],
    ["persona que cocina", "cocinero", "cocinar", "👨‍🍳"], ["alguien que pinta", "pintor", "pintar", "🎨"],
    ["persona que canta", "cantante", "cantar", "🎤"], ["alguien que baila", "bailarín", "bailar", "💃"],
    ["persona que duerme", "dormido", "dormir", "😴"], ["persona que escribe", "escritor", "escribir", "✍️"],
    ["persona que nada", "nadador", "nadar", "🏊"], ["persona que ríe", "risueño", "reír", "😂"],
] as const).map(([imageAlt, trapWord, correctWord, emoji], index) => ({
    id: `hangman-${index + 1}`, image: `/images/coming-soon-${["blue", "pink", "green"][index % 3]}.png`,
    imageAlt, trapWord, correctWord, emoji,
}));
