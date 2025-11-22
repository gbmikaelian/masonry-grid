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

## Docker Setup

This project includes Docker and Nginx configuration for production deployment with Cloudflare.

### Prerequisites

- Docker and Docker Compose installed
- A `.env` file with the following variables:
  ```
  SERVICE_NAME=masonry-grid
  DOMAIN_NAME=example.com
  PORT=3000
  ```

### Building and Running with Docker

1. **Create the shared network** (if it doesn't exist):
   ```bash
   docker network create docker-setup_shared_services_network
   ```

2. **Build and start the containers**:
   ```bash
   docker-compose up -d --build
   ```

3. **View logs**:
   ```bash
   docker-compose logs -f
   ```

4. **Stop the containers**:
   ```bash
   docker-compose down
   ```

### Docker Configuration

- **Dockerfile**: Multi-stage build optimized for Next.js production
- **docker-compose.yml**: Orchestrates the Next.js app and Nginx proxy
- **nginx.conf**: Configured for Cloudflare with proper IP forwarding and security headers

### Nginx Configuration

The Nginx configuration is set up to:
- Proxy requests to the Next.js application
- Handle Cloudflare's proxy headers (CF-Connecting-IP, etc.)
- Redirect HTTP to HTTPS (when behind Cloudflare)
- Include security headers
- Serve static files efficiently

### Notes

- The application runs on port 3000 inside the container
- Nginx listens on port 80 and proxies to the Next.js app
- Cloudflare should handle SSL/TLS termination
- Make sure your domain DNS points to your server and Cloudflare is configured properly

## CI/CD with GitHub Actions

This project includes a GitHub Actions workflow for automated deployment.

### Workflow Overview

The CI/CD pipeline consists of two jobs:
1. **Build**: Copies files to the SSH server
2. **Deploy**: Builds Docker images and deploys the application

### Required GitHub Secrets

Set the following secrets in your GitHub repository settings:

- `SSH_HOST` - Your server's hostname or IP address
- `SSH_USERNAME` - SSH username for deployment
- `SSH_PRIVATE_KEY` - Private SSH key for authentication
- `SSH_PORT` - SSH port (usually 22)
- `NEXT_PUBLIC_PEXELS_API_KEY` - Pexels API key (embedded at build time)
- `NEXT_PUBLIC_PEXELS_API_URL` - Pexels API URL (embedded at build time)

### Required GitHub Variables

Set the following variables in your GitHub repository settings:

- `SERVICE_NAME` - Docker service name (e.g., `masonry-grid`)
- `DOMAIN_NAME` - Your domain name (e.g., `example.com`)
- `PORT` - Application port (default: `3000`)

### How It Works

1. On push to `master` branch, the workflow triggers
2. Files are copied to `apps/{SERVICE_NAME}` on the server
3. A `.env` file is created with configuration
4. Docker images are built with Next.js environment variables
5. Old containers are stopped and new ones are started

### Server Requirements

- Docker and Docker Compose installed
- SSH access configured
- The shared network `docker-setup_shared_services_network` must exist:
  ```bash
  docker network create docker-setup_shared_services_network
  ```
