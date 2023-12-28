import { render, screen } from '@testing-library/react';

import Overview from './overview';
import { takeTestFilm } from '@mocks/mocks';

describe('Component: Overview', () => {
  it('should render correctly', () => {
    const testFilm = takeTestFilm();

    render(<Overview currentFilm={testFilm} />);

    expect(screen.getByText(testFilm.rating)).toBeInTheDocument();
    expect(screen.getByText(`${testFilm.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${testFilm.director}`)).toBeInTheDocument();
  });
});
