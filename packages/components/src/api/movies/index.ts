import {MoviesResponse} from "components/src/api/movies/models/responses";
import {instance} from "components/src/api/common";


export class MoviesApi {
    async getMovies(): Promise<MoviesResponse> {
        let data = await instance.get<MoviesResponse>('/movies.json');
        return data.data;
    }
}

export const moviesApi = new MoviesApi()