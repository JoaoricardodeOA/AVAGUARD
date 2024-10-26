This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Conceptual Schema DB

```mermaid
erDiagram
    VICTIM {
        int id_victim pk
        string first_name
        string last_name
        int age
        string phone
        string rg
        string cpf
        string gender
        string address
        string email
        string company
        string position
        date Hire_date
        string event
    }

    WITNESS {
        int id_victim fk
        string first_name
        string last_name
        string rg
        string cpf
        string phone
        string position
        string address
        string colaborate
        string description
    }

    ATTACHMENT {
        int id_victim fk
        string description
        string document_type
        file file
    }

    PROOF {
        int id_victim fk
        date date
        file file
        string description
    }

    USER {
        string email
        string first_name
        string last_name
        string password
        string role
        file photo
        datetime last_access
    }

    VICTIM ||--o{ WITNESS : "may have"
    VICTIM ||--o{ ATTACHMENT : "may have"
    VICTIM ||--o{ PROOF : "may have"
    USER ||--o{ VICTIM : "records"
