import { Product, ProductReview } from '@prisma/client';
import * as React from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';

import Stars from '../components/Stars';

export type ProductProps = {
    rating: string;
    product: Product & {
        reviews: ProductReview[];
    };
};

export default function ProductPage({ product, rating }: ProductProps) {
    const [addReviewModalOpen, setAddReviewModalOpen] = React.useState(false);

    return (
        <section
            data-productid={product.id}
            className="flex flex-col justify-center max-w-xl min-h-screen mx-auto"
        >
            <h1 className="text-3xl font-bold leading-snug md:text-5xl">{product.name}</h1>

            <div className="flex items-center justify-between w-full mt-6">
                {/* {{--  Start: Overall Rating  --}} */}
                <div className="flex items-center">
                    <div className="text-3xl font-bold leading-none md:text-5xl mr-7">{rating}</div>
                    <div>
                        <Stars count={+rating} />
                    </div>
                </div>
                {/* {{--  End: Overall Rating  --}} */}

                <Button
                    onClick={() => {
                        console.log('qweasdcx');
                        setAddReviewModalOpen(true);
                    }}
                >
                    Add review
                </Button>
            </div>

            <hr className="h-px mt-16 mb-10 bg-gray-600 border-0" />

            {/* {{--  Start: Review List  --}} */}
            <div>
                <h2 className="text-2xl font-bold md:text-3xl">Reviews</h2>

                <ul className=" space-y-7 mt-7">
                    {product.reviews.map((review) => (
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
            {/* {{--  End: Review List  --}} */}

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
