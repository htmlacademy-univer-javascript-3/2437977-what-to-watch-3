import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { takeTestFilm } from '@mocks/mocks';
import GenreListItem from './genre-list-item';
import { createAPI } from '@services/api';
import { State } from '../types';

describe('Component: GenreListItem', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should render correctly', () => {
    const testFilm = takeTestFilm();
    const store = mockStore({
      MAIN_REDUCER: {
        genre: testFilm.genre
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <GenreListItem
            genre={testFilm.genre}
            currentGenre={testFilm.genre}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(testFilm.genre)).toBeInTheDocument();
  });
});
