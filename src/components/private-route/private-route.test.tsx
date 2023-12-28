import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './private-route';
import { ApiRoute, AppRoute, AuthorizationStatus, LogInState } from '@consts/consts';

const mockStore = configureMockStore();
const initialEntries: (AppRoute | string)[] = [AppRoute.Root];

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    initialEntries.push('/private');
  });

  it('should render login if user not authorized', () => {
    const store = mockStore({
      USER_REDUCER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        avatar: null
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route
              path={ApiRoute.Login}
              element={<h1>Login</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route if authorized', () => {
    const store = mockStore({
      USER_REDUCER: {
        authorizationStatus: AuthorizationStatus.Auth,
        avatar: null,
        loginState: LogInState.NoError
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route
              path={ApiRoute.Login}
              element={<h1>Login</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
  });
});
