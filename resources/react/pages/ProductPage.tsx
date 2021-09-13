import { Product, ProductReview } from '@prisma/client';
import { ReviewsControllerIndexResponse } from 'App/Controllers/Http/ReviewsController';
import * as React from 'react';
import { NewReview } from 'resources/types/Events';
import Button from '../components/Button';
import Modal from '../components/Modal';
import OverallRating from '../components/OverallRating';
import ReviewList from '../components/ReviewList';

import Stars from '../components/Stars';

export type ProductProps = {
    rating: string;
    product: Product & {
        reviews: ProductReview[];
    };
};

export default function ProductPage({ product, rating }: ProductProps) {
    const [addReviewModalOpen, setAddReviewModalOpen] = React.useState(false);
    const [reviewData, setReviewData] = React.useState(() => ({
        rating,
        reviews: product.reviews,
    }));

    const fetchReviews = async () => {
        const newReviewData: ReviewsControllerIndexResponse | null = await fetch(
            '/products/' + product.id + '/reviews',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((res) => (res.ok ? res.json() : null));

        if (newReviewData) {
            setReviewData(newReviewData);
        }
    };

    React.useEffect(() => {
        let handler = ({ productId }: NewReview) => {
            if (productId === product.id) {
                fetchReviews();
            }
        };
        let unsub = () => {};

        import('../../services/socket').then(({ default: socket }) => {
            socket.on('new:review', handler);

            unsub = () => socket.off('new:review', handler);
        });

        return unsub;
    }, []);

    return (
        <section
            data-productid={product.id}
            className="flex flex-col justify-center max-w-xl min-h-screen mx-auto"
        >
            <h1 className="text-3xl font-bold leading-snug md:text-5xl">{product.name}</h1>

            <div className="flex items-center justify-between w-full mt-6">
                <OverallRating rating={+reviewData.rating} />

                <Button
                    onClick={() => {
                        setAddReviewModalOpen(true);
                    }}
                >
                    Add review
                </Button>
            </div>

            <hr className="h-px mt-16 mb-10 bg-gray-600 border-0" />

            <ReviewList reviews={reviewData.reviews} />

            {/* Start: Add review modal */}
            <Modal labelledBy="add-review-modal-label" open={addReviewModalOpen}>
                <h2
                    id="add-review-modal-label"
                    className="text-3xl font-bold leading-snug md:text-5xl"
                >
                    What's your rating?
                </h2>

                <form
                    action={`/products/${product.id}/reviews`}
                    method="POST"
                    className="mt-10 space-y-10 js-add-review-form "
                >
                    <div className="space-y-10 ">
                        <label className="block">Rating</label>

                        <Stars count={0} interactive />
                    </div>

                    <div className="space-y-10 ">
                        <label className="block">Review</label>

                        <input required name="text" id="" placeholder="Start typing..."></input>
                    </div>

                    <Button>Submit review</Button>
                </form>
            </Modal>
            {/* End: Add review modal */}
        </section>
    );
}
