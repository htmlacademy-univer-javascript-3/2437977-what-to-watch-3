import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedText = '© 2019 What to watch Ltd.';

    render(<Footer />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
