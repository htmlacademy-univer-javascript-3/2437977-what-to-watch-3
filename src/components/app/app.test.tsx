import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './app';
import { createAPI } from '@services/api';
import { AuthorizationStatus, LogInState, AppRoute } from '@consts/consts';
import { takeTestFilm, takeTestFilms } from '@mocks/mocks';

const middlewares = [thunk.withExtraArgument(createAPI())];
const mockStore = configureMockStore(middlewares);

const testFilm = takeTestFilm();
const testFilms = takeTestFilms();

describe('Application Routing', () => {
  const store = mockStore({
    USER_REDUCER: {
      authorizationStatus: AuthorizationStatus.Auth,
      avatar: null,
      loginState: LogInState.NoError
    },
    FILM_REDUCER: {
      film: testFilm,
      reviews: [],
      similarFilms: [],
      isFilmLoading: false,
    },
    MAIN_REDUCER: {
      films: testFilms,
      sortedFilms: [],
      currentGenre: 'All genres',
      shownCount: 0,
      dataIsLoading: false,
      error: null,
      promo: testFilm,
      favoriteFilms: [],
      favoriteCount: 0,
    },
  });
  const routes : (AppRoute | string)[] = [AppRoute.Root];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page if navigate to "/login"', () => {
    routes.push(AppRoute.Signin);
    render(fakeApp);

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render film page if navigate to "/films/{id}"', () => {
    routes.push('/films/1');
    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render player if navigate to "/player/{id}"', () => {
    routes.push('/player/1');
    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
  });

  it('should render reviews editor if navigate to "/films/{id}/review"', () => {
    routes.push('/films/1/review');
    render(fakeApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render favorites list if navigate to "/mylist"', () => {
    routes.push(AppRoute.MyList);
    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render 404 Not Found if navigate to not found route', () => {
    routes.push('/aaaaaaaaaa');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
});
