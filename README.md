# React Native Vehicle Catalog Workspace

Basic npm workspace with:

- `frontend`: Expo React Native app
- `backend`: `json-server` API

## Configuration

1. Navigate to the `frontend` directory.
2. Create a `.env` file by copying `.env.example`:
   ```bash
   cp frontend/.env.example frontend/.env
   ```
3. Update `EXPO_PUBLIC_API_BASE_URL` in `.env` if you are testing on a physical device or Android emulator (use your machine's IP address instead of localhost).

## Run

Install dependencies:

```bash
pnpm install
```

to start run:

```bash
pnpm run dev:backend
pnpm run dev:frontend
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