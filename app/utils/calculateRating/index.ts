import { ProductReview } from '.prisma/client';

export default function calculateRating(reviews: ProductReview[]) {
    return (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(
        1
    );
}
