export interface RatingScores {
    imdb: number;
    rottenTomatoes: number;
}

export interface Rating {
    id: string;
    titleA: string;
    scoreA: RatingScores;
    titleB: string;
    scoreB: RatingScores;
    year?: number;
    emoji?: string;
}

export const ratings: Rating[] = [
    { id: "r1", titleA: "El Padrino", scoreA: { imdb: 9.2, rottenTomatoes: 97 }, titleB: "Pulp Fiction", scoreB: { imdb: 8.9, rottenTomatoes: 92 }, year: 1972, emoji: "🎬" },
    { id: "r2", titleA: "Toy Story", scoreA: { imdb: 8.3, rottenTomatoes: 100 }, titleB: "Shrek", scoreB: { imdb: 7.9, rottenTomatoes: 88 }, year: 1995, emoji: "🍿" },
    { id: "r3", titleA: "Parasite", scoreA: { imdb: 8.5, rottenTomatoes: 99 }, titleB: "Roma", scoreB: { imdb: 7.6, rottenTomatoes: 96 }, year: 2019, emoji: "🏆" },
    { id: "r4", titleA: "The Dark Knight", scoreA: { imdb: 9.0, rottenTomatoes: 94 }, titleB: "Avengers: Endgame", scoreB: { imdb: 8.4, rottenTomatoes: 94 }, year: 2008, emoji: "🦇" },
    { id: "r5", titleA: "Coco", scoreA: { imdb: 8.4, rottenTomatoes: 97 }, titleB: "The Lion King", scoreB: { imdb: 8.5, rottenTomatoes: 93 }, year: 2017, emoji: "🎶" },
    { id: "r6", titleA: "Whiplash", scoreA: { imdb: 8.5, rottenTomatoes: 94 }, titleB: "La La Land", scoreB: { imdb: 8.0, rottenTomatoes: 91 }, year: 2014, emoji: "🥁" },
    { id: "r7", titleA: "Forrest Gump", scoreA: { imdb: 8.8, rottenTomatoes: 82 }, titleB: "Titanic", scoreB: { imdb: 7.9, rottenTomatoes: 88 }, year: 1994, emoji: "🚢" },
    { id: "r8", titleA: "Everything Everywhere All at Once", scoreA: { imdb: 7.8, rottenTomatoes: 93 }, titleB: "Barbie", scoreB: { imdb: 6.8, rottenTomatoes: 88 }, year: 2022, emoji: "🌈" },
    { id: "r9", titleA: "Mad Max: Fury Road", scoreA: { imdb: 8.1, rottenTomatoes: 97 }, titleB: "Dune", scoreB: { imdb: 8.0, rottenTomatoes: 83 }, year: 2015, emoji: "🏜️" },
    { id: "r10", titleA: "The Matrix", scoreA: { imdb: 8.7, rottenTomatoes: 83 }, titleB: "Inception", scoreB: { imdb: 8.8, rottenTomatoes: 87 }, year: 1999, emoji: "🕶️" },
];
