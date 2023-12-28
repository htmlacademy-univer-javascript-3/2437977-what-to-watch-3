import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { takeTestFilm } from '@mocks/mocks';
import FilmCard from './film-card';

describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    const testFilm = takeTestFilm();

    render(
      <MemoryRouter>
        <FilmCard film={testFilm} />
      </MemoryRouter>
    );

    expect(screen.getByText(testFilm.name)).toBeInTheDocument();
  });
});
