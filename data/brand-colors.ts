export interface BrandColor {
    id: string;
    name: string;
    hex: string;
    optionHexes: string[];
    emoji?: string;
}

export const brandColors: BrandColor[] = [
    { id: "google", name: "Google", hex: "#4285F4", optionHexes: ["#4285F4", "#357AE8", "#5A95F5", "#2F6FD6"], emoji: "🔍" },
    { id: "coca-cola", name: "Coca-Cola", hex: "#F40009", optionHexes: ["#F40009", "#E50914", "#D90012", "#FF1A24"], emoji: "🥤" },
    { id: "spotify", name: "Spotify", hex: "#1DB954", optionHexes: ["#1DB954", "#18A94B", "#21C967", "#169A48"], emoji: "🎵" },
    { id: "starbucks", name: "Starbucks", hex: "#00704A", optionHexes: ["#00704A", "#006241", "#00845A", "#005A3C"], emoji: "☕" },
    { id: "netflix", name: "Netflix", hex: "#E50914", optionHexes: ["#E50914", "#F40612", "#C90812", "#FF1722"], emoji: "🎬" },
    { id: "mcdonalds", name: "McDonald's", hex: "#FFC72C", optionHexes: ["#FFC72C", "#FFB900", "#FFD45A", "#F5AE00"], emoji: "🍔" },
    { id: "facebook", name: "Facebook", hex: "#1877F2", optionHexes: ["#1877F2", "#166FE5", "#2D83F4", "#1264D3"], emoji: "👍" },
    { id: "amazon", name: "Amazon", hex: "#FF9900", optionHexes: ["#FF9900", "#F08C00", "#FFA51A", "#E68100"], emoji: "📦" },
    { id: "instagram", name: "Instagram", hex: "#E4405F", optionHexes: ["#E4405F", "#D93657", "#EF5570", "#C82F4D"], emoji: "📸" },
    { id: "tiktok", name: "TikTok", hex: "#00F2EA", optionHexes: ["#00F2EA", "#00D8D2", "#19FFF6", "#00C5C0"], emoji: "🎶" },
    { id: "nike", name: "Nike", hex: "#111111", optionHexes: ["#111111", "#000000", "#252525", "#333333"], emoji: "✔️" },
    { id: "lego", name: "LEGO", hex: "#D01012", optionHexes: ["#D01012", "#C20E10", "#E51A1C", "#B90B0D"], emoji: "🧱" },
];
