import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './my-list-page.css';
import User from '@components/user/user';
import Footer from '@components/footer/footer';
import Logo from '@components/logo/logo';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import { AuthorizationStatus } from '@consts/consts';
import { fetchFavoriteFilms } from '@store/api-actions';
import FilmCard from '@components/film-card/film-card';
import { getFavFilms } from '@store/main-reducer/main-selectors';
import { getAuthStatus } from '@store/user-reducer/user-selectors';

function MyListPage(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const favoriteFilms = useAppSelector(getFavFilms);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    if (isMounted && authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilms());
      navigate('/mylist');
    }

    return () => {
      isMounted = false;
    };
  }, [authStatus, dispatch, navigate]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{favoriteFilms.length}</span>
        </h1>
        <User />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          {favoriteFilms.map((film) => <FilmCard key={film.id} film={film} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyListPage;
