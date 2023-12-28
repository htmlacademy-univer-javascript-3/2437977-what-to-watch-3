import './error.css';
import { useAppSelector } from '@components/hooks/hooks';
import { getError } from '@store/main-reducer/main-selectors';

function Error(): JSX.Element | null {
  const error = useAppSelector(getError);

  return (error) ? <div className='error'>{error}</div> : null;
}

export default Error;
