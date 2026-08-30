export interface Product {
    id: string;
    name: string;
    price: number; // in BOB
    currency: "BOB";
    image: string;
    category: "Super" | "Tecnología" | "Streaming" | "Comida Rápida";
    emoji?: string;
}

export const products: Product[] = [
    // Super
    { id: "1", name: "Coca Cola 2L", price: 8, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Super", emoji: "🥤" },
    { id: "2", name: "Pan de Molde", price: 10, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Super", emoji: "🍞" },
    { id: "3", name: "Leche Pil 1L", price: 9, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Super", emoji: "🥛" },
    { id: "4", name: "Arroz 1kg", price: 11, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Super", emoji: "🍚" },
    { id: "5", name: "Huevos (docena)", price: 14, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Super", emoji: "🥚" },
    { id: "6", name: "Azúcar 1kg", price: 7, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Super", emoji: "🍬" },
    { id: "7", name: "Aceite 1L", price: 14, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Super", emoji: "🫒" },
    { id: "8", name: "Detergente", price: 18, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Super", emoji: "🧴" },
    { id: "9", name: "Papel Higiénico (6)", price: 22, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Super", emoji: "🧻" },
    { id: "10", name: "Manzanas 1kg", price: 12, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Super", emoji: "🍎" },
    // Tecnología
    { id: "11", name: "iPhone 15", price: 6500, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Tecnología", emoji: "📱" },
    { id: "12", name: "PlayStation 5", price: 4200, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Tecnología", emoji: "🎮" },
    { id: "13", name: "AirPods", price: 900, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Tecnología", emoji: "🎧" },
    { id: "14", name: "Laptop Lenovo", price: 3500, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Tecnología", emoji: "💻" },
    { id: "15", name: "Smart TV 50\"", price: 2800, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Tecnología", emoji: "📺" },
    { id: "16", name: "Tablet", price: 1500, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Tecnología", emoji: "📱" },
    { id: "17", name: "Smartwatch", price: 800, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Tecnología", emoji: "⌚" },
    { id: "18", name: "Cámara Réflex", price: 3000, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Tecnología", emoji: "📷" },
    { id: "19", name: "Nintendo Switch", price: 2200, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Tecnología", emoji: "🎮" },
    { id: "20", name: "Teclado Mecánico", price: 350, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Tecnología", emoji: "⌨️" },
    // Streaming (mensual)
    { id: "21", name: "Netflix", price: 50, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Streaming", emoji: "🎬" },
    { id: "22", name: "Spotify", price: 32, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Streaming", emoji: "🎵" },
    { id: "23", name: "HBO Max", price: 45, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Streaming", emoji: "🎥" },
    { id: "24", name: "Disney+", price: 40, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Streaming", emoji: "🏰" },
    { id: "25", name: "YouTube Premium", price: 38, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Streaming", emoji: "▶️" },
    { id: "26", name: "Amazon Prime Video", price: 30, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Streaming", emoji: "📦" },
    { id: "27", name: "Paramount+", price: 35, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Streaming", emoji: "⭐" },
    { id: "28", name: "Star+", price: 42, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Streaming", emoji: "⚽" },
    { id: "29", name: "Apple TV+", price: 36, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Streaming", emoji: "🍎" },
    { id: "30", name: "Crunchyroll", price: 28, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Streaming", emoji: "🍥" },
    // Comida Rápida
    { id: "31", name: "Pollo Copacabana (1/4)", price: 35, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Comida Rápida", emoji: "🍗" },
    { id: "32", name: "Burger King Whopper", price: 42, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Comida Rápida", emoji: "🍔" },
    { id: "33", name: "McDonald's Big Mac", price: 38, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Comida Rápida", emoji: "🍟" },
    { id: "34", name: "Pizza Personal", price: 30, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Comida Rápida", emoji: "🍕" },
    { id: "35", name: "Salteña", price: 7, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Comida Rápida", emoji: "🥟" },
    { id: "36", name: "Subway Sub", price: 40, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Comida Rápida", emoji: "🥖" },
    { id: "37", name: "KFC Bucket", price: 95, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Comida Rápida", emoji: "🍗" },
    { id: "38", name: "Helado (1 bola)", price: 12, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Comida Rápida", emoji: "🍦" },
    { id: "39", name: "Gaseosa Lata", price: 6, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Comida Rápida", emoji: "🥫" },
    { id: "40", name: "Café Térmico", price: 15, currency: "BOB", image: "/images/coming-soon-blue.png", category: "Comida Rápida", emoji: "☕" },
];
