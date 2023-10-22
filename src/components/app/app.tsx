import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainPage, { MainPageProps } from '../../pages/main-page/main-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import FilmPage from '../../pages/film-page/film-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute, AuthorizationStatus } from '../consts';
import PrivateRoute from '../private-route/private-route';

type AppProps = MainPageProps;

function App(props: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage {...props} />}
          />
          <Route
            path={AppRoute.Signin}
            element={<SignInPage />}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <MyListPage {...props} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Film}
            element={<FilmPage {...props}/>}
          />
          <Route
            path={AppRoute.AddReview}
            element={<AddReviewPage {...props}/>}
          />
          <Route
            path={AppRoute.Player}
            element={<PlayerPage {...props}/>}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
