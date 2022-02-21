export const validRating = (rating: string): boolean => {
  if (rating === '') return true;
  if (
    !isNaN(+rating) &&
    +rating <= 10 &&
    +rating >= 1 &&
    rating[rating.length - 1] !== '.'
  )
    return true;
  return false;
};
