import { State } from '@components/types';
import { Reducer } from '@consts/consts';

export const getFilm = (state: State) => state[Reducer.FILM_REDUCER].film;
export const getReviews = (state: State) => state[Reducer.FILM_REDUCER].reviews;
export const getSimilarFilms = (state: State) => state[Reducer.FILM_REDUCER].similarFilms;
export const getFilmLoadingStatus = (state: State) => state[Reducer.FILM_REDUCER].isFilmLoading;

