import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AxiosError } from 'axios';

import App from '@components/app/app';
import { store } from './store';
import { checkAuth, fetchFilms, fetchPromoFilm } from './store/api-actions';
import Error from '@components/error/error';
import { errorHandle } from '@services/error-handle';

store.dispatch(fetchFilms())
  .catch((err: AxiosError) => errorHandle(`Something went wrong. ${err.message}`));
store.dispatch(checkAuth())
  .catch((err: AxiosError) => errorHandle(`Something went wrong. ${err.message}`));
store.dispatch(fetchPromoFilm())
  .catch((err: AxiosError) => errorHandle(`Something went wrong. ${err.message}`));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ToastContainer />
          <Error />
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
