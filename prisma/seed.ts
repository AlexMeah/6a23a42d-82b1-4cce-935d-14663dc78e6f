import '@adonisjs/env';
import faker from 'faker';
import { PrismaClient, Product, ProductReview } from '@prisma/client';

const prisma = new PrismaClient();

faker.seed(123);

async function main() {
    const products = Array<Product | undefined>(7)
        .fill(undefined)
        .map(() => {
            const reviews = Array<ProductReview | undefined>(7)
                .fill(undefined)
                .map(() => ({
                    rating: faker.datatype.number({
                        min: 1,
                        max: 5,
                    }),
                    text: faker.lorem.sentence(),
                }));

            return {
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                reviews: reviews,
            };
        });

    for (const { id, name, reviews } of products) {
        const { id: productId } = await prisma.product.create({
            data: {
                id,
                name,
            },
        });

        await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                reviews: {
                    create: reviews,
                },
            },
        });
    }
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
