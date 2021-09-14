# Gumroad Challenge

I chose to use AdonisJS as it is the closest thing Node has to Rails. I first completed the MVP using traditional server side templating and added interactivity using jQuery. After this I added an example of how you might migrate component by component and then page by page.

There is quite a bit packed into the challenge. I'd have liked to spend more time on tests and the API but didn't want time to get away from me. Overall it probably took 4-5 hours of work and I think hit the brief well. It's a long time since I used jQuery and traditional views, which meant the non React portion took most of the time.

## How to run the project

```bash
yarn install
npx prisma migrate reset # Yes reset DB
yarn dev
```

## Running tests

```bash
yarn test:client
```

## Structure

```
├── app
|  ├── Controllers
|  ├── Exceptions
|  ├── Prisma
|  ├── Services
|  └── utils
├── prisma
|  ├── migrations
|  ├── schema.prisma <- DB Schema
|  └── seed.ts
├── providers
|  └── AppProvider.ts
├── resources
|  ├── css
|  ├── js
|  ├── react <- Components
|  ├── services
|  ├── types
|  └── views
├── server.ts
├── start
|  ├── kernel.ts
|  ├── routes.ts
|  ├── socket.ts
|  └── view.tsx
```
