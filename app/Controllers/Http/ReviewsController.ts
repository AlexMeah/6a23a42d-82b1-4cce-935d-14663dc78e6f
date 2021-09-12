import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import prisma from 'App/Prisma';

const newReviewSchema = schema.create({
    rating: schema.number([rules.range(1, 5)]),
    text: schema.string({ escape: true, trim: true }),
});

export default class ReviewsController {
    //   public async index ({}: HttpContextContract) {
    //   }

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
                    create: [payload],
                },
            },
        });

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
