import { Review } from '@components/types';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const convertDate = (inputDateStr: string) => {
    const inputDate = new Date(inputDateStr);
    return inputDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
  };
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{review.user}</cite>
          <time className="review__date" dateTime={review.date}>
            {convertDate(review.date)}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default ReviewItem;
