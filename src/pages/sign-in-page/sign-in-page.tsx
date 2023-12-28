import { useNavigate } from 'react-router-dom';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { AxiosError } from 'axios';

import { AppRoute, AuthorizationStatus, LogInState, Reducer, RE_EMAIL, RE_PASSWORD } from '@consts/consts';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import { logIn } from '@store/api-actions';
import Footer from '@components/footer/footer';
import { setLoginState } from '@store/user-reducer/user-reducer';
import { getAuthStatus } from '@store/user-reducer/user-selectors';
import { errorHandle } from '@services/error-handle';

function SignInPage(): JSX.Element {
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStatus = useAppSelector(getAuthStatus);
  const loginState = useAppSelector((state) => state[Reducer.USER_REDUCER].loginState);
  const formRef = useRef(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const isEmailCorrect = () => emailField === null || !RE_EMAIL.test(emailField);
    const isPasswordCorrect = () => passwordField === null || !RE_PASSWORD.test(passwordField);

    if (formRef.current) {
      if (isEmailCorrect() && isPasswordCorrect()) {
        dispatch(setLoginState(LogInState.NotValidEmailAndPassword));
      } else if (isEmailCorrect()) {
        dispatch(setLoginState(LogInState.NotValidEmail));
      } else if (isPasswordCorrect()) {
        dispatch(setLoginState(LogInState.NotValidPassword));
      } else {
        dispatch(logIn({ email: emailField, password: passwordField }))
          .catch((err: AxiosError) => errorHandle(`Something went wrong. ${err.message}`));
      }
    }
  };

  const showErrMessage = (logInState: LogInState) => {
    switch (logInState) {
      case LogInState.NotValidEmail:
        return (<p>Email не корректный</p>);
      case LogInState.NotValidPassword:
        return (<p>Пароль не корректный: он должен содержать как минимум 1 цифру и 1 букву</p>);
      case LogInState.NotValidEmailAndPassword:
        return (<p>Email и пароль не корректные</p>);
      default:
        return null;
    }
  };

  const errorMessage = useMemo(() => showErrMessage(loginState), [loginState]);

  if (authStatus === AuthorizationStatus.Auth) {
    navigate(AppRoute.Root);
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
        </div>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" ref={formRef} onSubmit={handleSubmit}>
          <div className="sign-in__message">
            {errorMessage}
          </div>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                data-testid='user-email'
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={emailField}
                onChange={(event) => setEmailField(event.target.value)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                data-testid='user-password'
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={passwordField}
                onChange={(event) => setPasswordField(event.target.value)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignInPage;
