import { useAppDispatch } from '../hooks/hooks';
import { setFilmCardCount } from '../../store/actions';
import { MouseEvent } from 'react';

function ShowMoreButton() {
  const dispatch = useAppDispatch();
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={(evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        dispatch(setFilmCardCount());
      }}
      >Show more
      </button>
    </div>
  );
}

export default ShowMoreButton;
