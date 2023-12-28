import { render, screen } from '@testing-library/react';

import Details from './details';
import { takeTestFilm } from '@mocks/mocks';
import { convertTime } from '@components/extra-functions/convert-time';

describe('Component: Details', () => {
  it('should render correctly', () => {
    const testFilm = takeTestFilm();

    render(<Details currentFilm={testFilm} />);

    expect(screen.getByText('Run Time')).toBeInTheDocument();
    expect(screen.getByText(convertTime(Number(testFilm.runTime)))).toBeInTheDocument();
    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText(testFilm.genre)).toBeInTheDocument();
    expect(screen.getByText('Released')).toBeInTheDocument();
    expect(screen.getByText(testFilm.released)).toBeInTheDocument();
  });
});
