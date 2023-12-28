import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import SignInPage from './sign-in-page';
import { createAPI } from '@services/api';
import { State } from '@components/types';
import { AuthorizationStatus, LogInState } from '@consts/consts';

describe('Component: SignInPage', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const testStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should render correctly', async () => {
    const store = testStore({
      USER_REDUCER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        avatar: null,
        loginState: LogInState.NoError
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignInPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('user-email'), 'aaa@mail.ru');
    await userEvent.type(screen.getByTestId('user-password'), 'aaaAAA123');
    expect(screen.getByDisplayValue(/aaa@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/aaaAAA123/i)).toBeInTheDocument();
  });
});
