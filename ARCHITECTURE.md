# Project Setup & Technical Decisions



### React Native (Expo - Managed Workflow)

- Fast environment setup

- Minimal native configuration

- Easy execution for reviewers

No native build configuration required.

---

### json-server (Local REST API)

- Simulate a real backend

- Enable full CRUD operations

- Demonstrate integration with React Query

- Reduce setup complexity for reviewers

---

### @tanstack/react-query

- Server state management

- Request caching

- Mutations (e.g. toggle favorite)

- Loading and error handling

All remote data logic is centralized here.

---

### @shopify/flash-list

- High performance rendering of large datasets

- Efficient memory usage

- Smooth scrolling experience

---

## Planned Screens

### 1. Home (List Screen)

- Large dataset rendered with FlashList

- Pull-to-refresh

- Loading state handling with moti/skeleton

### 2. Favorites Screen

- Displays user's favorite items

- Utilizes React Query to keep data up-to-date

### 3. Filters & Search

- Filter by brand

- Filter by type

- Text search

### 4. Details Screen

- Full item information

- Toggle "favorite" state

- Demonstrates mutation flow

---

## Responsiveness Strategy

- On smaller screens: Tab Navigation

- On larger screens (iPad / Web): Drawer Navigation

Layout behavior adapts dynamically based on screen dimensions, ensuring better usability across devices.