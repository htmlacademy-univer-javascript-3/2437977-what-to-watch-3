import { Link } from 'react-router-dom';

import './not-found-page.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className='error-page'>
      <h1>
        404. Page not found
      </h1>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}

export default NotFoundPage;
