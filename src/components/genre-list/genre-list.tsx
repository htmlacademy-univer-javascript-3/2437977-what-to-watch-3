import { getCurrentGenre, getFilmList } from '@store/main-reducer/main-selectors.ts';
import { Genre } from '@consts/consts.ts';
import { getGenres } from '../extra-functions/get-genres.ts';
import GenreListItem from '../genre-list-item/genre-list-item.tsx';
import { useAppSelector } from '../hooks/hooks.ts';

function GenreList(): JSX.Element {
  const currentGenre = useAppSelector(getCurrentGenre);
  const films = useAppSelector(getFilmList);
  const genres: Genre[] = getGenres(films);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => <GenreListItem key={genre} genre={genre} currentGenre={currentGenre} />)}
    </ul>
  );
}

export default GenreList;
