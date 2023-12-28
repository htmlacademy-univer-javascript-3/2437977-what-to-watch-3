import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import ReviewItem from './review-item';
import { takeTestReviews } from '@mocks/mocks';

describe('Component: ReviewItem', () => {
  const mockStore = configureMockStore();

  it('should render correctly', () => {
    const store = mockStore();
    const review = takeTestReviews()[0];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewItem review={review}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(`${review.comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${review.user}`)).toBeInTheDocument();
  });
});
