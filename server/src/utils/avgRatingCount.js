export default function countAvgRating(reviewsForCurrBook) {
  const sumOfRatings = reviewsForCurrBook
    .map((review) => {
      return Number(review.rating);
    })
    .reduce((prev, curr) => {
      return prev + curr;
    });

  return sumOfRatings / reviewsForCurrBook.length;
}
