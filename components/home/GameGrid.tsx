"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ComicButton } from "@/components/ui/ComicButton";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const games = [
    {
        id: "pelimojis",
        title: "PELIMOJIS",
        description: "En Pelimojis, tu capacidad de descifrar misterios cinematográficos se pone a prueba de la manera más divertida imaginable. Cada ronda te muestra una secuencia de emojis que, juntos, esconden el título de una película o serie ¿Serás capaz de adivinar “El Padrino” con solo 👴🍷🔫? ¡Algunas combinaciones son tan ingeniosas que te harán reír… y otras te dejarán rascándote la cabeza!",
        image: "/images/pelimojis-cover.png",
        theme: "pink",
        href: "/games/pelimojis",
        badges: ["CINE", "EMOJIS"],
        comingSoon: false,
    },
    {
        id: "cual-fue-primero",
        title: "CUÁL FUE PRIMERO",
        description: "¿El encendedor existía antes que la cerilla? ¿El internet antes que el helicoptero? En ¿Cuál fue primero? cada ronda es un viaje en el tiempo donde TU CONOCIMIENTO HISTÓRICO SE PONE A PRUEBA. ¡Te sorprenderás con cuántos “inventos modernos” son más viejos que tus abuelos!",
        image: "/images/inventions-cover.png",
        theme: "blue-orange",
        href: "/games/cual-fue-primero",
        badges: ["HISTORIA", "INVENTOS"],
        comingSoon: false,
    },
    {
        id: "adivina-edad",
        title: "¿ADIVINA LA EDAD?",
        description: "¿Sabías que Tom Cruise tiene más años que Leonardo DiCaprio? ¿O que esa influencer de 20 parece de 35? En ¿Adivina la edad?, tu ojo crítico y conocimiento pop se ponen a prueba. ¡Nadie adivina mejor que tú!",
        image: "/images/celebrity-cover.png",
        theme: "pink-red",
        href: "/games/adivina-edad",
        badges: ["FAMOSOS", "EDADES"],
        comingSoon: false,
    },
    // Coming Soon Games
    {
        id: "pixel-chef",
        title: "PIXEL CHEF",
        description: "¿Tienes ojo de gourmet y la paciencia de un detective? ¡Pon a prueba tus sentidos en este desafío visual!. En la pantalla aparecerá una imagen de un delicioso plato de comida, pero con un giro: estará tan pixeleada que será casi irreconocible. Abajo, una lista de posibles nombres te pondrá a prueba. ¿Confías en tu primer instinto? ¡Puedes usar la opción de \"despixelear\" para revelar pistas, pero cuidado, tus rivales harán lo mismo! El primero en identificar el plato correcto se llevará la victoria y el título de Chef Pixel. ¡Una carrera contrarreloj donde la agudeza visual y la velocidad lo son todo!.",
        image: "/images/coming-soon-green.png",
        theme: "green",
        href: "/games/pixel-chef",
        badges: ["COMIDA", "VISUAL"],
        comingSoon: false,
    },
    {
        id: "a-cuanto-case",
        title: "A CUANTO CASE?",
        description: "Un “versus” directo entre productos. A la izquierda tienes un producto con **precio de referencia**; a la derecha aparece otro y debes adivinar: **¿cuesta más o cuesta menos?.** Es rápido, competitivo y perfecto para rondas cortas. Puedes incluir productos del súper, tecnología, comida rápida, streaming, etc. La tensión sube cuando la diferencia es mínima y cualquiera se equivoca por confiarse.",
        image: "/images/coming-soon-blue.png",
        theme: "blue",
        href: "/games/a-cuanto-case",
        badges: ["PRECIOS", "COMPRAS"],
        comingSoon: false,
    },
    {
        id: "real-o-ia",
        title: "¿REAL O IA?",
        description: "En la era de la inteligencia artificial, ¿puede tu ojo humano detectar la verdad?. Te presentaremos una serie de imágenes espectaculares, hiperralistas y asombrosamente detalladas. Pero aquí está el truco: algunas fueron capturadas por una cámara, mientras que otras fueron creadas desde cero por una inteligencia artificial. Tu misión es decidir: ¿Es Real o IA? Fíjate en los reflejos, las texturas, las imperfecciones... o la falta de ellas. Es un desafío actual, fascinante y que te hará cuestionar todo lo que tus ojos ven. ¿Estás a la altura de la tecnología?",
        image: "/images/coming-soon-pink.png",
        theme: "pink",
        href: "/games/real-o-ia",
        badges: ["IA", "TECNOLOGÍA"],
        comingSoon: false,
    },
    {
        id: "quien-lo-dijo",
        title: "¿QUIÉN LO DIJO?",
        description: "Frases para la historia... o para el olvido. ¿Sabes quién lo dijo?. Aparecerá en pantalla una frase icónica, una polémica declaración o simplemente un disparate memorable. ¿Fue dicha por un rockero legendario, un presidente, un influencer o un actor de Hollywood? Pone a prueba tu conocimiento sobre la cultura popular y la actualidad, con un especial énfasis en los personajes más sonados de Bolivia, desde celebridades y deportistas hasta nuestros inolvidables políticos. ¡Identifica al autor de la cita y conviértete en el maestro de las frases célebres!",
        image: "/images/coming-soon-green.png",
        theme: "green",
        href: "/games/quien-lo-dijo",
        badges: ["FRASES", "FAMOSOS"],
        comingSoon: false,
    },
    {
        id: "face-mashup",
        title: "FACE MASHUP",
        description: "Bienvenido al laboratorio de rostros más extraño de la internet. Usando la magia de la IA, hemos mezclado las caras de dos famosos para crear una sola persona híbrida y fascinante. Tu desafío es descifrar qué dos celebridades se esconden en esa única y extraña cara. ¿Y si en lugar de una fusión, intercambiamos los rostros de dos personajes en una foto? ¡El nivel de dificultad aumenta! Es una prueba de tu conocimiento pop y tu agudeza visual para reconocer rasgos en los lugares más inesperados.",
        image: "/images/coming-soon-blue.png",
        theme: "blue",
        href: "/games/face-mashup",
        badges: ["FUSIÓN", "CELEBRIDADES"],
        comingSoon: false,
    },
    {
        id: "color-correcto",
        title: "¿DE QUÉ COLOR ES?",
        description: "Crees que conoces tus marcas favoritas, pero... ¿podrías identificar su color exacto de memoria? Mostraremos el logo de una marca mundialmente famosa (Google, Spotify, Starbucks, Netflix, etc.), pero lo habremos despojado de su color, dejándolo en blanco y negro. Debajo, una paleta de colores con tonos muy similares te esperará. ¿Eres capaz de seleccionar el tono corporativo exacto? No es solo el rojo, es el rojo de Coca-Cola. No es solo el amarillo, es el amarillo de McDonald's. Un juego para los más detallistas y para quienes viven y respiran la cultura de las marcas.",
        image: "/images/coming-soon-pink.png",
        theme: "pink",
        href: "/games/color-correcto",
        badges: ["LOGOS", "MEMORIA"],
        comingSoon: false,
    },
    {
        id: "mundo-girado",
        title: "SILUETAS DE PAÍSES",
        description: "Pone a prueba tu conocimiento del mapa de una manera completamente nueva. Mostraremos la silueta de un país, pero con un giro: estará dada la vuelta, girada o sutilmente distorsionada. ¿Podrás identificar a Italia sin su forma de bota? ¿Reconocerías a Bolivia o a Australia desde una perspectiva imposible? Es un desafío que mezcla la geografía con el rompecabezas espacial. ¡Demuestra que el mundo no tiene secretos para ti, sin importar desde dónde lo mires!",
        image: "/images/coming-soon-green.png",
        theme: "green",
        href: "/games/mundo-girado",
        badges: ["GEOGRAFÍA", "MAPAS"],
        comingSoon: false,
    },
    {
        id: "guerra-criticas",
        title: "BATALLA DE CRÍTICAS",
        description: "En esta esquina, un clásico del cine aclamado por la crítica. En la otra, una peli moderna que ha recaudado millones. La pregunta no es cuál te gusta más, sino: ¿Cuál de las dos tiene una mejor puntuación en bases de datos de críticas como IMDb o Rotten Tomatoes? Es una batalla épica entre el legado y la novedad. ¿Se impone el gusto de los críticos o el del público actual? ¡Usa tu criterio cinéfilo para predecir al ganador!",
        image: "/images/coming-soon-blue.png",
        theme: "blue",
        href: "/games/guerra-criticas",
        badges: ["CINE", "RATING"],
        comingSoon: false,
    },
    {
        id: "noticia-o-fake",
        title: "¿REAL O FAKE NEWS?",
        description: "En un mundo de desinformación, ¿puedes distinguir un titular real o una fake news? Te presentaremos un titular tan absurdo, increíble o hilarante que dudarás de su veracidad. ¿Proviene de una noticia real que capturó lo más extraño de la realidad o es una creación de un medio de sátira? Incluiremos portadas icónicas del periódico boliviano \"La Voz\" y otras joyas del humor periodístico. Este juego pondrá a prueba tu espíritu crítico y, sobre todo, tu sentido del humor. ¡Separa la verdad de la ingeniosa invención!",
        image: "/images/coming-soon-pink.png",
        theme: "pink",
        href: "/games/noticia-o-fake",
        badges: ["NOTICIAS", "HUMOR"],
        comingSoon: false,
    },
    {
        id: "polemica-total",
        title: "OPINIONES IMPOPULARES",
        description: "¡Prepárate para debatir! Saldrá una frase polémica y tú tendrás que posicionarte. ¿Eres de los pocos o de los muchos? Aparecerá una frase diseñada para generar debate: \"La pizza con piña es deliciosa\", \"El fin justifica los medios\", \"Los libros son siempre mejores que las películas\". Tendrás solo dos botones: \"A favor\" o \"En contra\". Ganas puntos si tu opinión coincide con la de la mayoría. Pero la verdadera diversión comienza si quedas en el bando minoritario, ¡porque tendrás que defender tu postura contra todos! Es un juego de opiniones, estrategia y persuasión.",
        image: "/images/coming-soon-green.png",
        theme: "green",
        href: "/games/polemica-total",
        badges: ["DEBATE", "POLÉMICA"],
        comingSoon: false,
    },
    {
        id: "ahorcado-funable",
        title: "AHORCADO... ¿FUNABLE?",
        description: "Olvida todo lo que sabes sobre el ahorcado. Te mostraremos una imagen que te gritará una respuesta obvia... ¡pero es una trampa! Verás a una persona negando con la cabeza y tu cerebro pensará inmediatamente en \"Negro\", pero la palabra correcta es \"Negar\". Verás un ladrón en acción y tu mente dirá \"Delicioso\", cuando la respuesta es \"Delinquir\". Cada imagen es un acertijo diseñado para engañar a tu mente. ¿Puedes resistirte a la respuesta más fácil y pensar fuera de la caja para adivinar la palabra real? ¡Un juego que te hará reír de tus propias conclusiones!",
        image: "/images/coming-soon-blue.png",
        theme: "blue",
        href: "/games/ahorcado-funable",
        badges: ["HUMOR", "PALABRAS"],
        comingSoon: false,
    },
    {
        id: "ingredientes",
        title: "INGREDIENTES",
        description: "¿Crees ser chef? Demuestra tu conocimiento culinario identificando el plato final a partir de una foto de sus ingredientes crudos. La clave de este reto está en las opciones. Si ves carne de res, ¡todas las opciones serán platos que llevan carne de res (ej. Silpancho, Fricasé, Picana)! Si ves maíz (choclo), las opciones serán todas a base de maíz (ej. Huminta, Tamal, Api). Solo un verdadero conocedor sabrá distinguir qué plato exacto resulta de esa combinación única de especias, verduras y el ingrediente principal.",
        image: "/images/coming-soon-pink.png",
        theme: "pink",
        href: "/games/ingredientes",
        badges: ["COCINA", "INGREDIENTES"],
        comingSoon: false,
    },
] as const;

export function GameGrid() {
    const reducedMotion = useReducedMotion();
    const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metele-pink focus-visible:ring-offset-2 focus-visible:ring-offset-comic-black";

    return (
        <section id="games" className="relative overflow-hidden bg-comic-black px-4 py-24 text-white">
            <div className="landing-dot-grid pointer-events-none absolute inset-0" />
            <div className="container relative z-10 mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="landing-gradient-text mb-16 text-center font-display text-6xl md:text-8xl"
                >
                    MINIJUEGOS
                </motion.h2>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {games.map((game, index) => (
                        <motion.article
                            key={game.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ delay: index * 0.04 }}
                            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
                            className={cn("landing-glass landing-glass-hover group flex h-full flex-col overflow-hidden rounded-2xl p-5", index === 0 && "lg:col-span-2")}
                        >
                            <div className="relative mb-5 aspect-video overflow-hidden rounded-xl bg-white/10">
                                <Image src={game.image} alt={game.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-2">
                                    {game.badges.map((badge) => <span key={badge} className="landing-glass rounded px-2 py-1 text-xs font-bold">{badge}</span>)}
                                </div>
                                {game.comingSoon && <div className="absolute inset-0 flex items-center justify-center bg-black/60"><span className="font-display text-3xl">PRÓXIMAMENTE</span></div>}
                            </div>
                            <div className="flex flex-grow flex-col">
                                <h3 className="mb-3 font-display text-3xl leading-none md:text-5xl">{game.title}</h3>
                                <p className="mb-6 flex-grow text-base leading-relaxed text-white/75 md:text-lg">{game.description}</p>
                                {game.comingSoon ? (
                                    <ComicButton variant="outline" disabled className="w-full opacity-50" aria-label={`${game.title} próximamente`}>BLOQUEADO 🔒</ComicButton>
                                ) : (
                                    <Link href={game.href} aria-label={`Jugar ${game.title}`} className={`w-full ${focusRing}`}>
                                        <ComicButton variant="landing" className="w-full" aria-label={`Jugar ${game.title}`}><span className="landing-gradient-text">¡JUGAR AHORA! 🎮</span></ComicButton>
                                    </Link>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
