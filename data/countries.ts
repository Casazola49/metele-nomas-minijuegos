export interface Country {
    id: string;
    name: string;
    silhouette: string;
    rotateDeg: number;
    hint?: string;
    emoji?: string;
}

// Deliberately simple hand-authored outlines keep the game offline and dependency-free.
export const countries: Country[] = [
    { id: "bolivia", name: "Bolivia", silhouette: "M20 15 L75 10 L105 35 L95 90 L55 105 L15 75 Z", rotateDeg: 45, hint: "Un país sin salida al mar", emoji: "🇧🇴" },
    { id: "italia", name: "Italia", silhouette: "M52 8 L75 20 L67 42 L82 60 L72 84 L58 72 L48 52 L35 45 L42 25 Z", rotateDeg: 180, hint: "Tiene forma de bota", emoji: "🇮🇹" },
    { id: "australia", name: "Australia", silhouette: "M15 42 L35 18 L75 12 L108 30 L100 65 L78 88 L42 82 L18 65 Z", rotateDeg: 270, hint: "Es una isla-continente", emoji: "🇦🇺" },
    { id: "chile", name: "Chile", silhouette: "M45 8 L63 12 L57 38 L65 62 L54 105 L35 98 L40 70 L32 45 Z", rotateDeg: 90, hint: "Un país muy largo y estrecho", emoji: "🇨🇱" },
    { id: "mexico", name: "México", silhouette: "M12 25 L42 15 L65 28 L88 25 L105 48 L82 58 L68 82 L42 70 L30 52 L12 50 Z", rotateDeg: 135, hint: "Está al norte de Centroamérica", emoji: "🇲🇽" },
    { id: "brasil", name: "Brasil", silhouette: "M42 8 L78 15 L100 40 L88 78 L62 100 L35 82 L18 52 L25 22 Z", rotateDeg: 225, hint: "El país más grande de Sudamérica", emoji: "🇧🇷" },
    { id: "argentina", name: "Argentina", silhouette: "M48 8 L70 20 L63 48 L72 78 L58 108 L38 92 L42 60 L32 35 Z", rotateDeg: 315, hint: "Comparte frontera con Chile", emoji: "🇦🇷" },
    { id: "espana", name: "España", silhouette: "M15 28 L48 15 L86 22 L102 48 L82 70 L45 65 L20 52 Z", rotateDeg: 60, hint: "Está en la península ibérica", emoji: "🇪🇸" },
    { id: "japon", name: "Japón", silhouette: "M75 8 L88 22 L78 38 L92 53 L80 72 L68 58 L72 42 L58 28 Z", rotateDeg: 150, hint: "Un archipiélago del Pacífico", emoji: "🇯🇵" },
    { id: "india", name: "India", silhouette: "M38 10 L78 18 L92 42 L75 58 L65 100 L42 78 L30 50 Z", rotateDeg: 200, hint: "Está en el sur de Asia", emoji: "🇮🇳" },
    { id: "canada", name: "Canadá", silhouette: "M10 35 L28 15 L48 25 L68 10 L92 25 L108 42 L92 62 L60 58 L35 68 L15 55 Z", rotateDeg: 300, hint: "El segundo país más grande", emoji: "🇨🇦" },
    { id: "francia", name: "Francia", silhouette: "M42 10 L75 18 L98 42 L78 78 L45 92 L20 60 L25 28 Z", rotateDeg: 120, hint: "Su capital es París", emoji: "🇫🇷" },
];
