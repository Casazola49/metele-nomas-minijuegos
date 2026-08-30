export interface Headline {
    id: string;
    text: string;
    isReal: boolean;
    source: string;
    image?: string;
    emoji?: string;
}

export const headlines: Headline[] = [
    { id: "headline-01", text: "La Paz estrena semáforos que insultan al conductor cuando se pasa la luz roja", isReal: false, source: "La Voz de Bolivia", image: "/images/coming-soon-pink.png", emoji: "🚦" },
    { id: "headline-02", text: "Un boliviano completa la ruta del Dakar en bicicleta y con una salteña en la mochila", isReal: false, source: "El Deber", image: "/images/coming-soon-blue.png", emoji: "🚲" },
    { id: "headline-03", text: "NASA confirma que la quinua boliviana puede crecer en condiciones parecidas a Marte", isReal: true, source: "NASA / Universidad Mayor de San Andrés", image: "/images/coming-soon-green.png", emoji: "🚀" },
    { id: "headline-04", text: "Alcaldía instala Wi-Fi gratis en teleféricos, pero solo para mandar audios de más de cinco minutos", isReal: false, source: "La Voz de Bolivia", image: "/images/coming-soon-pink.png", emoji: "📶" },
    { id: "headline-05", text: "Un pulpo fue visto usando cáscaras de coco como armadura para protegerse", isReal: true, source: "Universidad de Melbourne", image: "/images/coming-soon-blue.png", emoji: "🐙" },
    { id: "headline-06", text: "Gobierno anuncia feriado nacional para que Bolivia pueda dormir la siesta completa", isReal: false, source: "La Voz de Bolivia", image: "/images/coming-soon-green.png", emoji: "😴" },
    { id: "headline-07", text: "El Salar de Uyuni vuelve a ser escenario de pruebas para vehículos eléctricos", isReal: true, source: "Agencia Boliviana de Energía Nuclear", image: "/images/coming-soon-pink.png", emoji: "🔋" },
    { id: "headline-08", text: "Científicos descubren que el api caliente mejora el Wi-Fi de los celulares", isReal: false, source: "La Voz de Bolivia", image: "/images/coming-soon-blue.png", emoji: "☕" },
    { id: "headline-09", text: "Un perro en Argentina fue nombrado jefe honorario de una estación de tren", isReal: true, source: "Trenes Argentinos", image: "/images/coming-soon-green.png", emoji: "🐕" },
    { id: "headline-10", text: "Londres prueba una multa para quienes caminan demasiado lento por las veredas", isReal: false, source: "La Voz de Bolivia", image: "/images/coming-soon-pink.png", emoji: "🚶" },
    { id: "headline-11", text: "Bolivia registra una de las mayores reservas de litio del mundo", isReal: true, source: "Servicio Geológico de Estados Unidos", image: "/images/coming-soon-blue.png", emoji: "🪨" },
    { id: "headline-12", text: "Choferes paceños piden carril exclusivo para adelantar a las nubes", isReal: false, source: "La Voz de Bolivia", image: "/images/coming-soon-green.png", emoji: "☁️" },
    { id: "headline-13", text: "Un estudio revela que los cuervos pueden recordar rostros humanos durante años", isReal: true, source: "Nature Communications", image: "/images/coming-soon-pink.png", emoji: "🐦‍⬛" },
    { id: "headline-14", text: "Cochabamba inaugura la primera cancha de fútbol con pasto que aplaude los goles", isReal: false, source: "La Voz de Bolivia", image: "/images/coming-soon-blue.png", emoji: "⚽" },
    { id: "headline-15", text: "El lago Titicaca es uno de los lagos navegables más altos del planeta", isReal: true, source: "Encyclopaedia Britannica", image: "/images/coming-soon-green.png", emoji: "🏔️" },
    { id: "headline-16", text: "ONU declara al lunes como día internacional de llegar cinco minutos tarde", isReal: false, source: "La Voz de Bolivia", image: "/images/coming-soon-pink.png", emoji: "⏰" },
];
