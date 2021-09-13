import { ProductReview } from '.prisma/client';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import prisma from 'App/Prisma';
import Ws from 'App/Services/Ws';
import calculateRating from 'App/utils/calculateRating';

const newReviewSchema = schema.create({
    rating: schema.string({}, [rules.regex(new RegExp(/^d(?:\.\d)?$/))]),
    text: schema.string({ escape: true, trim: true }),
});

export type ReviewsControllerIndexResponse = {
    rating: string;
    reviews: ProductReview[];
};

export default class ReviewsController {
    public async index({ params }: HttpContextContract) {
        const { product_id } = params;

        const reviews = await prisma.productReview.findMany({
            where: {
                productId: product_id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            rating: calculateRating(reviews),
            reviews,
        };
    }

    //   public async create ({}: HttpContextContract) {
    //   }

    public async store({ params, request, response }: HttpContextContract) {
        const { product_id } = params;

        const payload = await request.validate({ schema: newReviewSchema });

        await prisma.product.update({
            where: {
                id: product_id,
            },
            data: {
                reviews: {
                    create: [{ ...payload, rating: parseFloat(payload.rating) }],
                },
            },
        });

        Ws.io.emit('new:review', { productId: product_id });

        return response.redirect().back();
    }

    //   public async show ({}: HttpContextContract) {
    //   }

    //   public async edit ({}: HttpContextContract) {
    //   }

    //   public async update ({}: HttpContextContract) {
    //   }

    //   public async destroy ({}: HttpContextContract) {
    //   }
}
