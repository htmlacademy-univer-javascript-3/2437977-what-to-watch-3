import { Route, Routes } from 'react-router-dom';

import MainPage from '@pages/main-page/main-page';
import SignInPage from '@pages/sign-in-page/sign-in-page';
import MyListPage from '@pages/my-list-page/my-list-page';
import FilmPage from '@pages/film-page/film-page';
import AddReviewPage from '@pages/add-review-page/add-review-page';
import PlayerPage from '@pages/player-page/player-page';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import { AppRoute } from '@consts/consts';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import { useAppSelector } from '../hooks/hooks';
import { getError, getLoading } from '@store/main-reducer/main-selectors';
import Error from '@components/error/error';

function App(): JSX.Element {
  const isLoading = useAppSelector(getLoading);
  const isError = useAppSelector(getError);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (isError) {
    return (
      <Error />
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<MainPage />}
      />
      <Route
        path={AppRoute.Signin}
        element={<SignInPage />}
      />
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute>
            <MyListPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Film}
        element={<FilmPage />}
      />
      <Route
        path={AppRoute.AddReview}
        element={<AddReviewPage />}
      />
      <Route
        path={AppRoute.Player}
        element={<PlayerPage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
