import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import './add-review-page.css';
import { AppRoute, AuthorizationStatus } from '@consts/consts';
import AddReviewForm from '@components/add-review-form/add-review-form';
import User from '@components/user/user';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import { setDataIsLoading } from '@store/actions';
import { fetchFilmByID } from '@store/api-actions';
import Logo from '@components/logo/logo';
import { getFilm } from '@store/film-reducer/film-selectors';
import { getAuthStatus } from '@store/user-reducer/user-selectors';
import { errorHandle } from '@services/error-handle';

function AddReviewPage() {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const currentFilm = useAppSelector(getFilm);
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(setDataIsLoading(true));
    dispatch(fetchFilmByID(id))
      .catch((err: AxiosError) => errorHandle(`Something went wrong. ${err.message}`));
    dispatch(setDataIsLoading(false));
  }, [id, dispatch]);

  if (authStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  if (!currentFilm) {
    return null;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img
            src={currentFilm?.backgroundImage}
            alt={currentFilm?.name}
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${currentFilm?.id}`} className="breadcrumbs__link">
                  {currentFilm?.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <User />
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img
            className="film-card__poster--image-item"
            src={currentFilm?.posterImage}
            alt={currentFilm?.name && `${currentFilm.name} poster`}
          />
        </div>
      </div>
      <AddReviewForm />
    </section>
  );
}

export default AddReviewPage;
