This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Front end

- `yarn build`
- `yarn start`
- use this link for frontend http://localhost:3000/inputparameters
-------------------------------------------------------------------------------------------------------------------
### Setup google oauth

- Got to [Google Cloud Platform Console][https://console.cloud.google.com/]
- From the projects list, select a project or create a new one.
- If the APIs & services page isn't already open, open the console left side menu and select APIs & services.
- On the left, click Credentials.
- Click New Credentials, then select OAuth client ID.
  Note: If you're unsure whether OAuth 2.0 is appropriate for your project, select Help me choose and follow the instructions to pick the right credentials.

- Select the appropriate application type for your project and enter any additional information required. Application types are described in more detail in the following sections.
- If this is your first time creating a client ID, you can also configure your consent screen by clicking Consent Screen. (The following procedure explains how to set up the Consent screen.) You won't be prompted to configure the consent screen after you do it the first time.
- Click Create client ID
