## Running and Building the Project

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To build the project for production:

```bash
npm run build
npm start
```

Or with your preferred package manager.

## Setup Environment Variables

Before starting the project, copy the example environment file and set up your API keys:

```bash
cp .env.example .env
```

Edit the newly created `.env` file and add your actual API keys and URLs:

```
NEXT_PUBLIC_PEXELS_API_KEY=your_actual_pexels_api_key
NEXT_PUBLIC_PEXELS_API_URL=your_actual_pexels_api_url
```
