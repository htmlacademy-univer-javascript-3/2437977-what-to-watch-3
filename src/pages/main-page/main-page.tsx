import { Fragment, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import FilmList from '@components/film-list/film-list';
import './main-page.css';
import GenreList from '@components/genre-list/genre-list';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import ShowMoreButton from '@components/show-more-button/show-more-button';
import User from '@components/user/user';
import Footer from '@components/footer/footer';
import Logo from '@components/logo/logo';
import { getFavCount, getFilmCardCount, getGenreFilmList, getPromo } from '@store/main-reducer/main-selectors';
import { AuthorizationStatus } from '@consts/consts';
import { changePromoFavoriteStatus, fetchFavoriteFilms } from '@store/api-actions';
import { setFavoriteCount } from '@store/actions';
import { getAuthStatus } from '@store/user-reducer/user-selectors';
import PlayerState from '@components/player-state/player-state';

function MainPage() {
  const promoFilm = useAppSelector(getPromo);
  const filmsGenre = useAppSelector(getGenreFilmList);
  const filmCardCount = useAppSelector(getFilmCardCount);
  const favCount = useAppSelector(getFavCount);
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilms());
    }
  }, [authStatus, dispatch]);

  if (!promoFilm) {
    return null;
  }

  const handleAddClick = () => {
    dispatch(changePromoFavoriteStatus({ filmId: promoFilm.id, status: +(!promoFilm?.isFavorite) }));
    if (promoFilm?.isFavorite) {
      dispatch(setFavoriteCount(favCount - 1));
    } else {
      dispatch(setFavoriteCount(favCount + 1));
    }
  };

  return (
    <Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src={promoFilm?.backgroundImage}
            alt={promoFilm?.name}
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo />
          <User />
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                className="film-card__poster--image-item"
                src={promoFilm?.posterImage}
                alt={promoFilm?.name}
              />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link
                  to={`/player/${promoFilm?.id}`}
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg className="btn--play__icon-item" viewBox="0 0 19 19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </Link>
                {authStatus === AuthorizationStatus.Auth && (
                  <button
                    className="btn btn--list film-card__button"
                    onClick={handleAddClick}
                  >
                    {promoFilm?.isFavorite
                      ?
                      <PlayerState viewBox={'0 0 18 14'} width={19} height={14} xlinkHref={'#in-list'} state={''} />
                      :
                      <PlayerState viewBox={'0 0 19 20'} width={19} height={20} xlinkHref={'#add'} state={''} />}
                    <span>My list</span>
                    <span className="film-card__count">{favCount}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList />
          <div className="catalog__films-list">
            <FilmList films={filmsGenre.slice(0, filmCardCount)} />
          </div>
          {filmCardCount !== filmsGenre.length && <ShowMoreButton />}
        </section>
        <Footer />
      </div>
    </Fragment>
  );
}

export default MainPage;
