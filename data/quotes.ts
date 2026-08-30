export interface Quote {
    id: string;
    text: string;
    author: string;
    category?: string;
    emoji?: string;
}

export const quotes: Quote[] = [
    { id: "q1", text: "La vida es aquello que te pasa mientras estás ocupado haciendo otros planes.", author: "John Lennon", category: "cultura pop", emoji: "🎵" },
    { id: "q2", text: "El futuro pertenece a quienes creen en la belleza de sus sueños.", author: "Eleanor Roosevelt", category: "inspiración", emoji: "✨" },
    { id: "q3", text: "No hay peor gestión que la que no se hace.", author: "Víctor Paz Estenssoro", category: "Bolivia", emoji: "🇧🇴" },
    { id: "q4", text: "Bolivia cambia, Evo cumple.", author: "Evo Morales", category: "Bolivia", emoji: "🇧🇴" },
    { id: "q5", text: "La imaginación es más importante que el conocimiento.", author: "Albert Einstein", category: "ciencia", emoji: "🧠" },
    { id: "q6", text: "Que la fuerza te acompañe.", author: "Yoda", category: "cultura pop", emoji: "🌌" },
    { id: "q7", text: "Hasta la vista, baby.", author: "Arnold Schwarzenegger", category: "cultura pop", emoji: "🤖" },
    { id: "q8", text: "El fútbol es una escuela de vida.", author: "Marco Etcheverry", category: "Bolivia", emoji: "⚽" },
    { id: "q9", text: "Si buscas resultados distintos, no hagas siempre lo mismo.", author: "Albert Einstein", category: "ciencia", emoji: "💡" },
    { id: "q10", text: "La educación es el arma más poderosa para cambiar el mundo.", author: "Nelson Mandela", category: "inspiración", emoji: "📚" },
    { id: "q11", text: "No es que tenga miedo de morir, simplemente no quiero estar allí cuando suceda.", author: "Woody Allen", category: "humor", emoji: "😂" },
    { id: "q12", text: "Un gran poder conlleva una gran responsabilidad.", author: "Tío Ben", category: "cultura pop", emoji: "🕷️" },
    { id: "q13", text: "La suerte favorece a los audaces.", author: "Virgilio", category: "inspiración", emoji: "🍀" },
    { id: "q14", text: "Viva Bolivia, toda la vida.", author: "Gladys Moreno", category: "Bolivia", emoji: "🎤" },
];
