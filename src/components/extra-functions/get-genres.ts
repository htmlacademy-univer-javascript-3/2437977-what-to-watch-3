import { Genre } from '@consts/consts';
import { Film } from '../types';

export const getGenres = (films: Film[]): Genre[] => [Genre.All, ...new Set(films.map((x) => x.genre))];
