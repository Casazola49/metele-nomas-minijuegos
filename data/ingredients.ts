export interface Dish {
    id: string;
    name: string;
    ingredients: string[];
    category: string;
    emoji: string;
    image?: string;
}

export const dishes: Dish[] = ([
    ["Silpancho", ["carne de res", "arroz", "papa", "huevo", "cebolla"], "carne"],
    ["Fricasé", ["carne de cerdo", "maíz", "chuño", "ají amarillo"], "carne"],
    ["Picana", ["carne de res", "pollo", "choclo", "vino"], "carne"],
    ["Lomo saltado", ["carne de res", "papa", "tomate", "sillao"], "carne"],
    ["Majadito", ["arroz", "charque", "plátano", "huevo"], "arroz"],
    ["Arroz chaufa", ["arroz", "pollo", "huevo", "cebollín", "sillao"], "arroz"],
    ["Paella", ["arroz", "mariscos", "azafrán", "pimiento"], "arroz"],
    ["Risotto", ["arroz", "hongos", "parmesano", "vino blanco"], "arroz"],
    ["Huminta", ["choclo", "queso", "anís", "mantequilla"], "maíz"],
    ["Tamal", ["maíz", "carne", "ají", "aceituna"], "maíz"],
    ["Arepa", ["maíz", "queso", "mantequilla"], "maíz"],
    ["Tacos", ["maíz", "carne", "cebolla", "cilantro"], "maíz"],
] as const).map(([name, ingredients, category], index) => ({
    id: `dish-${index + 1}`, name, ingredients: [...ingredients], category, emoji: "🍽️",
    image: `/images/coming-soon-${["pink", "green", "blue"][index % 3]}.png`,
}));
