import * as React from 'react';
import Stars from '../Stars';

type OverallRatingProps = {
    rating: number;
};

export default function OverallRating({ rating }: OverallRatingProps) {
    return (
        <div className="flex items-center">
            <div className="text-3xl font-bold leading-none md:text-5xl mr-7">{rating}</div>
            <div>
                <Stars count={+rating} />
            </div>
        </div>
    );
}
