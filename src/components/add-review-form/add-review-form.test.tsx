import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import AddReviewForm from './add-review-form';

describe('Component: AddReviewForm', () => {
  const mockStore = configureMockStore();

  it('should render correctly', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddReviewForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Post')).toBeInTheDocument();
  });
});
