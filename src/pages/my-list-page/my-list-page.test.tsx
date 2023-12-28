import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import MyListPage from './my-list-page';
import { createAPI } from '@services/api';
import { takeTestFilms } from '@mocks/mocks';
import { State } from '@components/types';
import { AuthorizationStatus } from '@consts/consts';

describe('Component: MyListPage', () => {
  const testFilms = takeTestFilms();
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should render correctly', () => {
    const store = mockStore({
      USER_REDUCER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      MAIN_REDUCER: {
        favoriteFilms: testFilms,
        favoriteCount: testFilms.length,
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyListPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
