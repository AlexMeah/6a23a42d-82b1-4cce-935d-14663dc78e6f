import { ProductReview } from '.prisma/client';
import * as React from 'react';
import Stars from '../Stars';

type ReviewListProps = {
    reviews: ProductReview[];
};

export default function ReviewList({ reviews }: ReviewListProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold md:text-3xl">Reviews</h2>

            <ul className=" space-y-7 mt-7">
                {reviews.map((review) => (
                    <li className="flex items-center">
                        <Stars count={+review.rating} />

                        <div className=" ml-7">
                            <strong>{review.rating}</strong>,{' '}
                            <span className="text-gray-500 ">{review.text}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
