export type OpinionMajority = "a favor" | "en contra";

export interface Opinion {
    id: string;
    text: string;
    majority: OpinionMajority;
    percentage: number;
    emoji?: string;
}

export const opinions: Opinion[] = [
    { id: "opinion-01", text: "La pizza con piña es deliciosa", majority: "a favor", percentage: 58, emoji: "🍕" },
    { id: "opinion-02", text: "El desayuno es la comida más importante del día", majority: "en contra", percentage: 54, emoji: "🍳" },
    { id: "opinion-03", text: "Los libros son siempre mejores que las películas", majority: "en contra", percentage: 62, emoji: "📚" },
    { id: "opinion-04", text: "El mate se disfruta mejor sin azúcar", majority: "a favor", percentage: 67, emoji: "🧉" },
    { id: "opinion-05", text: "La salteña debe comerse con cuchara", majority: "en contra", percentage: 71, emoji: "🥟" },
    { id: "opinion-06", text: "Los lunes deberían empezar después del mediodía", majority: "a favor", percentage: 83, emoji: "😴" },
    { id: "opinion-07", text: "El ají mejora absolutamente cualquier plato", majority: "a favor", percentage: 64, emoji: "🌶️" },
    { id: "opinion-08", text: "Es mejor viajar de noche que de día", majority: "en contra", percentage: 57, emoji: "🚌" },
    { id: "opinion-09", text: "La música se escucha mejor en vinilo", majority: "a favor", percentage: 55, emoji: "💿" },
    { id: "opinion-10", text: "El chocolate blanco cuenta como chocolate", majority: "en contra", percentage: 69, emoji: "🍫" },
    { id: "opinion-11", text: "La sopa es una bebida con tropezones", majority: "en contra", percentage: 61, emoji: "🍲" },
    { id: "opinion-12", text: "Un buen api merece buñuelo extra", majority: "a favor", percentage: 78, emoji: "☕" },
    { id: "opinion-13", text: "Las vacaciones deberían durar exactamente un mes", majority: "a favor", percentage: 73, emoji: "🏖️" },
    { id: "opinion-14", text: "El ketchup no pertenece a las papas fritas", majority: "en contra", percentage: 52, emoji: "🍟" },
];
