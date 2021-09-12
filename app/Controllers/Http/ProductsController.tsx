import * as React from 'react';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import prisma from 'App/Prisma';
import { renderToStaticMarkup } from 'react-dom/server';
import ProductPage from '../../../resources/react/pages/ProductPage';

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
                reviews: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        if (!product) {
            return response.notFound();
        }

        const viewModel = {
            product,
            rating: (
                product.reviews.reduce((total, review) => total + review.rating, 0) /
                product.reviews.length
            ).toFixed(1),
        };

        return view.render('products/show', {
            viewModel: JSON.stringify(viewModel),
            body: renderToStaticMarkup(<ProductPage {...viewModel} />),
        });
    }
}
