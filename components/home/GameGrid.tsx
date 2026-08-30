"use client";

import { motion } from "framer-motion";
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
        href: "#",
        badges: ["FRASES", "FAMOSOS"],
        comingSoon: true,
    },
    {
        id: "face-mashup",
        title: "FACE MASHUP",
        description: "Bienvenido al laboratorio de rostros más extraño de la internet. Usando la magia de la IA, hemos mezclado las caras de dos famosos para crear una sola persona híbrida y fascinante. Tu desafío es descifrar qué dos celebridades se esconden en esa única y extraña cara. ¿Y si en lugar de una fusión, intercambiamos los rostros de dos personajes en una foto? ¡El nivel de dificultad aumenta! Es una prueba de tu conocimiento pop y tu agudeza visual para reconocer rasgos en los lugares más inesperados.",
        image: "/images/coming-soon-blue.png",
        theme: "blue",
        href: "#",
        badges: ["FUSIÓN", "CELEBRIDADES"],
        comingSoon: true,
    },
    {
        id: "color-correcto",
        title: "¿DE QUÉ COLOR ES?",
        description: "Crees que conoces tus marcas favoritas, pero... ¿podrías identificar su color exacto de memoria? Mostraremos el logo de una marca mundialmente famosa (Google, Spotify, Starbucks, Netflix, etc.), pero lo habremos despojado de su color, dejándolo en blanco y negro. Debajo, una paleta de colores con tonos muy similares te esperará. ¿Eres capaz de seleccionar el tono corporativo exacto? No es solo el rojo, es el rojo de Coca-Cola. No es solo el amarillo, es el amarillo de McDonald's. Un juego para los más detallistas y para quienes viven y respiran la cultura de las marcas.",
        image: "/images/coming-soon-pink.png",
        theme: "pink",
        href: "#",
        badges: ["LOGOS", "MEMORIA"],
        comingSoon: true,
    },
    {
        id: "mundo-girado",
        title: "SILUETAS DE PAÍSES",
        description: "Pone a prueba tu conocimiento del mapa de una manera completamente nueva. Mostraremos la silueta de un país, pero con un giro: estará dada la vuelta, girada o sutilmente distorsionada. ¿Podrás identificar a Italia sin su forma de bota? ¿Reconocerías a Bolivia o a Australia desde una perspectiva imposible? Es un desafío que mezcla la geografía con el rompecabezas espacial. ¡Demuestra que el mundo no tiene secretos para ti, sin importar desde dónde lo mires!",
        image: "/images/coming-soon-green.png",
        theme: "green",
        href: "#",
        badges: ["GEOGRAFÍA", "MAPAS"],
        comingSoon: true,
    },
    {
        id: "guerra-criticas",
        title: "BATALLA DE CRÍTICAS",
        description: "En esta esquina, un clásico del cine aclamado por la crítica. En la otra, una peli moderna que ha recaudado millones. La pregunta no es cuál te gusta más, sino: ¿Cuál de las dos tiene una mejor puntuación en bases de datos de críticas como IMDb o Rotten Tomatoes? Es una batalla épica entre el legado y la novedad. ¿Se impone el gusto de los críticos o el del público actual? ¡Usa tu criterio cinéfilo para predecir al ganador!",
        image: "/images/coming-soon-blue.png",
        theme: "blue",
        href: "#",
        badges: ["CINE", "RATING"],
        comingSoon: true,
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
        href: "#",
        badges: ["HUMOR", "PALABRAS"],
        comingSoon: true,
    },
    {
        id: "ingredientes",
        title: "INGREDIENTES",
        description: "¿Crees ser chef? Demuestra tu conocimiento culinario identificando el plato final a partir de una foto de sus ingredientes crudos. La clave de este reto está en las opciones. Si ves carne de res, ¡todas las opciones serán platos que llevan carne de res (ej. Silpancho, Fricasé, Picana)! Si ves maíz (choclo), las opciones serán todas a base de maíz (ej. Huminta, Tamal, Api). Solo un verdadero conocedor sabrá distinguir qué plato exacto resulta de esa combinación única de especias, verduras y el ingrediente principal.",
        image: "/images/coming-soon-pink.png",
        theme: "pink",
        href: "#",
        badges: ["COCINA", "INGREDIENTES"],
        comingSoon: true,
    },
] as const;

export function GameGrid() {
    return (
        <section id="games" className="py-24 bg-white relative overflow-hidden">
            {/* Animated Floating Comic Elements */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-10 w-32 h-32 bg-comic-yellow rounded-full border-4 border-black z-0 opacity-60 shadow-comic"
            />
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-10 w-48 h-48 bg-comic-blue border-4 border-black z-0 opacity-50 shadow-comic"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [45, 50, 45] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-0 w-24 h-24 bg-comic-red rotate-45 border-4 border-black z-0 opacity-40"
            />
            <motion.div
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 right-20 w-20 h-20 bg-comic-pink rounded-full border-4 border-black z-0 opacity-50"
            />
            <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-comic-green border-4 border-black z-0 opacity-30"
            />

            {/* Halftone Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                backgroundSize: '15px 15px'
            }} />

            <div className="container mx-auto px-4 relative z-10">
                {/* Animated Section Title */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    className="flex justify-center mb-20"
                >
                    <motion.h2
                        whileHover={{ rotate: 2, scale: 1.05 }}
                        className="text-5xl md:text-8xl font-display text-comic-black text-stroke-white shadow-comic bg-comic-yellow px-8 py-4 border-4 border-black cursor-default inline-block shadow-[8px_8px_0px_0px_#000]"
                    >
                        MINIJUEGOS
                    </motion.h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                            className={cn(
                                "flex flex-col",
                                // Full width for the first item to make it a "Featured" game
                                index === 0 && "lg:col-span-2"
                            )}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02, rotate: 0 }}
                                className={cn(
                                    "h-full border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col relative overflow-hidden group rounded-xl",
                                    index % 2 === 0 ? "rotate-1" : "-rotate-1",
                                    game.theme === "pink" && "bg-comic-pink",
                                    game.theme === "blue" && "bg-comic-blue",
                                    game.theme === "green" && "bg-comic-green",
                                    game.theme === "blue-orange" && "bg-comic-blue",
                                    game.theme === "pink-red" && "bg-comic-pink",
                                )}
                            >
                                {/* Overlay for Coming Soon */}
                                {game.comingSoon && (
                                    <div className="absolute inset-0 bg-black/20 z-20 pointer-events-none backdrop-grayscale-[0.5]" />
                                )}

                                {/* Image Container */}
                                <div className="relative w-full aspect-video mb-6 border-4 border-black bg-white overflow-hidden shrink-0 rounded-lg shadow-comic">
                                    <Image
                                        src={game.image}
                                        alt={game.title}
                                        fill
                                        className={cn(
                                            "object-cover transition-transform duration-700 ease-out",
                                            !game.comingSoon && "group-hover:scale-110",
                                            game.comingSoon && "grayscale-[0.8]"
                                        )}
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-4 right-4 flex gap-2 flex-wrap justify-end">
                                        {game.badges.map(badge => (
                                            <span key={badge} className="bg-comic-yellow text-xs md:text-sm font-bold px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10 transform hover:scale-110 transition-transform">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Coming Soon Lock/Overlay */}
                                    {game.comingSoon && (
                                        <div className="absolute inset-0 flex items-center justify-center z-30">
                                            <div className="bg-black/80 text-white font-display text-4xl md:text-5xl px-6 py-3 border-4 border-white transform -rotate-12 shadow-lg backdrop-blur-sm">
                                                PRÓXIMAMENTE
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow relative z-30">
                                    <h3 className="text-3xl md:text-5xl font-display text-white text-stroke-2 shadow-comic mb-4 leading-none tracking-wide group-hover:text-comic-yellow transition-colors">
                                        {game.title}
                                    </h3>

                                    <div className="bg-black/10 p-4 rounded-xl border-2 border-black/10 backdrop-blur-sm mb-6 flex-grow">
                                        <p className="text-white font-bold text-lg md:text-xl leading-normal drop-shadow-md text-justify line-clamp-6">
                                            {game.description}
                                        </p>
                                    </div>

                                    {game.comingSoon ? (
                                        <div className="w-full mt-auto opacity-50 grayscale">
                                            <ComicButton
                                                variant="outline"
                                                className="w-full text-2xl py-4 bg-gray-200 border-gray-500 cursor-not-allowed"
                                                disabled
                                            >
                                                BLOQUEADO 🔒
                                            </ComicButton>
                                        </div>
                                    ) : (
                                        <Link href={game.href} className="w-full mt-auto">
                                            <ComicButton
                                                variant="secondary"
                                                className="w-full text-2xl py-4 shadow-comic hover:shadow-comic-hover transform group-hover:-translate-y-1 transition-all bg-white text-black border-black"
                                            >
                                                ¡JUGAR AHORA! 🎮
                                            </ComicButton>
                                        </Link>
                                    )}
                                </div>

                                {/* Decorative Background Pattern */}
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
