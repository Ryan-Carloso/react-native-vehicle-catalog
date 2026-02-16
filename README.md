# React Native Vehicle Catalog Workspace

Basic npm workspace with:

- `mobile`: Expo React Native app
- `backend`: `json-server` API

## Run

Install dependencies:

```bash
pnpm install
```

to start run:

```bash
pnpm run dev:backend
pnpm run dev:web
```

## Quality

```bash
pnpm run lint
pnpm run lint:fix
pnpm run format:check
pnpm run format
```

## API

Base URL: `http://localhost:3001`

Endpoint:

- `GET /vehicles`
