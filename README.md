# [AIDe](https://aideuk.vercel.app/)- full stack AI document chatting app

A fullstack app to allow users to upload files (PDF/DOCX/TXT) and start chatting with the contents of the files with AI using the following stack:

- Next.js
- Prisma
- Tailwind CSS
- tRPC + Zod + TypeScript
- React Query
- LangChaing
- OpenAI

Online platform used:

- hosting: [Vercel](https://vercel.com/)
- database: [PlanetScale](https://app.planetscale.com/)
- vector storage: [Pinecone](https://app.pinecone.io/)
- file storage: [Uploadthing](https://uploadthing.com/)
- authentication: [Kinde Auth](https://kinde.com/)
- AI Chat: [OpenAI](https://openai.com/)
- Payment and Subscription: [Stripe](https://stripe.com/)

This app is based on the [tutorial by Josh](https://github.com/joschan21/quill) with lots of customizations and enhancements:

- **Visual design**
  - customized branding
  - animated icon / preview / background
  - loading screens
- **Backend**
  - Handle and process DOCX and TXT files
  - Vercel edge function
  - Refactored codes
- **Bug Fix**
  - Filter Pinecone db with metadata (Pinecone free plan no longer supports namespace)
  - React Query did not revalidate
  - Delete button didn't delete the associated stored file and Pinecone storage

## Features of the AIDe App

- Homepage
  ![homepage](https://github-production-user-asset-6210df.s3.amazonaws.com/25171685/278662711-52463d1c-b0b9-4470-a8f2-2acaf6f9ad25.gif)
- Document Upload
  ![Document Upload](https://github-production-user-asset-6210df.s3.amazonaws.com/25171685/278662780-bd1623f4-26a6-4697-b52c-d047f359d63d.gif)
- Video Upload
  ![Chatting](https://github-production-user-asset-6210df.s3.amazonaws.com/25171685/278662755-422640ef-984e-4cc7-b025-5ede290ad26c.gif)

## Installation

1. Clone the project repository and pull to local environment

2. Create a `.env` file in the root directory and add the following

```
/* Kinde */
KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=
KINDE_SITE_URL=
KINDE_POST_LOGOUT_REDIRECT_URL=
KINDE_POST_LOGIN_REDIRECT_URL=

/* PlanetScale */
DATABASE_URL=

/* Uploadthing */
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

/* Pinecone */
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=gcp-starter

/* Openai */
OPENAI_SECRET_KEY=

/* Stripe */
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

3. Set up the database

```
pnpm generate
pnpx prisma db:push
pnpx prisma postinstall

```

4. Install dependencies and run the dev server

```
pnpm install
pnpm dev

```

5. For the database client Prisma Studio, run the following command:

```
pnpx prisma studio
```
