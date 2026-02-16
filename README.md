# React Native Vehicle Catalog Workspace

Basic npm workspace with:

- `mobile`: Expo React Native app
- `backend`: `json-server` API

## Run

Install dependencies:

```bash
pnpm install
```

Start both services:

```bash
pnpm run dev
```

Or start each one:

```bash
pnpm run dev:backend
pnpm run dev:mobile
```

## API

Base URL: `http://localhost:3001`

Endpoint:

- `GET /vehicles`
