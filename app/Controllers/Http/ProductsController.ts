import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import prisma from 'App/Prisma';

export default class ProductsController {
    public async index({ view }: HttpContextContract) {
        const products = await prisma.product.findMany();

        return view.render('products/index', {
            products,
        });
    }

    public async show({ params, view, response }: HttpContextContract) {
        const { id } = params;

        const product = await prisma.product.findFirst({
            where: {
                id,
            },
            include: {
                reviews: true,
            },
        });

        if (!product) {
            return response.notFound();
        }

        return view.render('products/show', {
            product,
            rating: (
                product.reviews.reduce((total, review) => total + review.rating, 0) /
                product.reviews.length
            ).toFixed(1),
        });
    }
}
