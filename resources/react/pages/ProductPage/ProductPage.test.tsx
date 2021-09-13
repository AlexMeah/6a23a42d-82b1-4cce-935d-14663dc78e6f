import * as React from 'react';
import ProductPage from '.';
import faker from 'faker';
import { ProductReview } from '.prisma/client';
import { render, screen, within, waitFor } from '@testing-library/react';
import { EventEmitter } from 'events';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import { ReviewsControllerIndexResponse } from 'App/Controllers/Http/ReviewsController';
import { NewReview } from 'resources/types/Events';
import { nextTick } from 'process';

const mockSocket = new EventEmitter();

jest.mock('../../../services/socket', () => mockSocket);

describe('Product Page', () => {
    beforeEach(() => {
        const reviews = Array<ProductReview | undefined>(7)
            .fill(undefined)
            .map(() => ({
                rating: faker.datatype.number({
                    min: 1,
                    max: 5,
                }),
                text: faker.lorem.sentence(),
            }));

        window.PAGE_DATA = {
            rating: '3.7',
            product: {
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                reviews: reviews,
            },
        };
    });

    afterEach(() => {
        window.PAGE_DATA = {};
        mockSocket.removeAllListeners();
    });

    it('should display an overall rating', () => {
        render(<ProductPage {...window.PAGE_DATA} />);

        expect(screen.getByTestId('overall-rating').innerHTML).toEqual('3.7');
    });

    it('should display a list of reviews', () => {
        render(<ProductPage {...window.PAGE_DATA} />);

        expect(screen.getAllByRole('listitem')).toHaveLength(
            window.PAGE_DATA.product.reviews.length
        );

        const first = screen.getAllByRole('listitem')[0];
        const last = screen.getAllByRole('listitem')[6];

        expect(
            within(first).getByText(window.PAGE_DATA.product.reviews[0].rating, { exact: false })
        ).not.toBeNull();
        expect(
            within(first).getByText(window.PAGE_DATA.product.reviews[0].text, { exact: false })
        ).not.toBeNull();

        expect(
            within(last).getByText(window.PAGE_DATA.product.reviews[6].rating, { exact: false })
        ).not.toBeNull();
        expect(
            within(last).getByText(window.PAGE_DATA.product.reviews[6].text, { exact: false })
        ).not.toBeNull();
    });

    describe('Add review', () => {
        it('should open modal when add review button is clicked', () => {
            render(<ProductPage {...window.PAGE_DATA} />);

            expect(screen.getByRole('dialog').parentElement).toHaveClass('hidden');

            userEvent.click(
                screen.getByRole('button', {
                    name: 'Add review',
                })
            );

            expect(screen.getByRole('dialog').parentElement).not.toHaveClass('hidden');
        });
    });

    describe('Real time updates', () => {
        it('should subscribe to new:review events', async () => {
            const onSpy = jest.spyOn(mockSocket, 'on');

            render(<ProductPage {...window.PAGE_DATA} />);

            await waitFor(() => {
                expect(onSpy).toHaveBeenCalledWith('new:review', expect.any(Function));
            });
        });
        it('should unsubscribe from new:review on umount', async () => {
            const offSpy = jest.spyOn(mockSocket, 'off');

            const { unmount } = render(<ProductPage {...window.PAGE_DATA} />);

            nextTick(unmount);

            await waitFor(() => {
                expect(offSpy).toHaveBeenCalledWith('new:review', expect.any(Function));
            });
        });
        it('should update reviews on reciept of matching new:review event', async () => {
            const newReview = {
                rating: faker.datatype.number({
                    min: 1,
                    max: 5,
                }),
                text: faker.lorem.sentence(),
            };

            fetchMock.mockResponse(
                JSON.stringify({
                    rating: '1.5',
                    reviews: [newReview],
                } as ReviewsControllerIndexResponse)
            );

            render(<ProductPage {...window.PAGE_DATA} />);

            nextTick(() => {
                mockSocket.emit('new:review', {
                    productId: 'no match',
                } as NewReview);

                mockSocket.emit('new:review', {
                    productId: window.PAGE_DATA.product.id,
                } as NewReview);
            });

            await waitFor(() => {
                // expect(fetchMock).toHaveBeenCalledTimes(1);

                expect(screen.getAllByRole('listitem')).toHaveLength(1);

                const first = screen.getAllByRole('listitem')[0];
                expect(
                    within(first).getByText(newReview.rating, {
                        exact: false,
                    })
                ).not.toBeNull();
                expect(
                    within(first).getByText(newReview.text, {
                        exact: false,
                    })
                ).not.toBeNull();
            });
        });
    });
});
