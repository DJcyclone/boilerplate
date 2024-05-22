export interface MoviesResponse {
    title: string;
    description: string;
    movies: Movie[]
}

export interface Movie {
    id: string,
    title: string,
    releaseYear: string
}