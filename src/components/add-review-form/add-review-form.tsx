import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useAppDispatch } from '../hooks/hooks';
import { postReview } from '@store/api-actions';
import RatingItem from '../rating-item/rating-item';
import { MAX_LENGTH_REVIEW, MIN_LENGTH_REVIEW } from '@consts/consts';
import { errorHandle } from '@services/error-handle';

function AddReviewForm() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [filmRating, setFilmRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const dispatch = useAppDispatch();

  const handleInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) =>
    setFilmRating(Number(evt.target.value)), []);

  const doOnSubmit = (rating: number, comment: string) => {
    dispatch(postReview({ filmId: id, rating, comment }))
      .catch((err: AxiosError) => errorHandle(`Something went wrong. ${err.message}`));
    navigate(`/films/${id}`);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (filmRating && reviewContent) {
      doOnSubmit(filmRating, reviewContent);
    }
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: 10 }, (_, i) => i + 1)
              .reverse()
              .map((number) => <RatingItem key={number} number={number} onInputChange={handleInputChange} />)}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            value={reviewContent}
            onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
              setReviewContent(evt.target.value);
            }}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            minLength={MIN_LENGTH_REVIEW}
            maxLength={MAX_LENGTH_REVIEW}
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={!filmRating || !reviewContent || reviewContent.length < MIN_LENGTH_REVIEW || reviewContent.length > MAX_LENGTH_REVIEW}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
