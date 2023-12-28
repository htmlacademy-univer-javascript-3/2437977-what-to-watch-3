import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '@services/api';
import { takeTestFilm, takeTestFilms, takeTestReviews } from '@mocks/mocks';
import { State } from '@components/types';
import { AuthorizationStatus } from '@consts/consts';
import FilmPage from './film-page';

describe('Component: FilmPage', () => {
  const testFilm = takeTestFilm();
  const testFilms = takeTestFilms();
  const testReviews = takeTestReviews();
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should render correctly if authorization status is NoAuth', () => {
    const store = mockStore({
      USER_REDUCER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        avatar: null,
      },
      FILM_REDUCER: {
        film: testFilm,
        reviews: testReviews,
        similarFilms: testFilms,
      },
      MAIN_REDUCER: {
        films: testFilms,
        sortedFilms: testFilms,
        promo: testFilm,
        favoriteFilms: testFilms,
        favoriteCount: testFilms.length,
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.queryByText(/My List/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Add Review/i)).not.toBeInTheDocument();
  });

  it('should render correctly if authorization status is Auth', () => {
    const store = mockStore({
      USER_REDUCER: {
        authorizationStatus: AuthorizationStatus.Auth,
        avatar: null,
      },
      FILM_REDUCER: {
        film: testFilm,
        reviews: testReviews,
        similarFilms: testFilms,
      },
      MAIN_REDUCER: {
        films: testFilms,
        sortedFilms: testFilms,
        promo: testFilm,
        favoriteFilms: testFilms,
        favoriteCount: testFilms.length,
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Review/i)).toBeInTheDocument();
  });
});
