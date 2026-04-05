# Restaurant HQ Dashboard

Practical Next.js dashboard starter for restaurant staff operations. It includes authentication, a desktop-first dashboard shell, order management with status updates, menu CRUD scaffolding, and table management.

## Tech

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Axios
- Zustand

## Demo Credentials

- Email: `manager@bistro.local`
- Password: `demo123`

If `NEXT_PUBLIC_API_URL` is not set, the app runs in local mock mode so the dashboard is usable immediately.

## Folder Structure

```text
src/
  app/
    dashboard/
      page.tsx
    login/
      page.tsx
    menu/
      page.tsx
    orders/
      page.tsx
    tables/
      page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    layout/
      app-shell.tsx
      protected-page.tsx
      sidebar.tsx
      topbar.tsx
    menu/
      menu-manager.tsx
    order/
      orders-table.tsx
    ui/
      badge.tsx
      button.tsx
      card.tsx
      input.tsx
      page-header.tsx
  hooks/
    use-hydrated.ts
  services/
    api.ts
  store/
    auth.ts
    order.ts
  types/
    auth.ts
    dashboard.ts
    menu.ts
    order.ts
    table.ts
  utils/
    cn.ts
    format.ts
    mock-data.ts
```

## Pages Included

- `login`: staff sign-in with token persistence
- `dashboard`: overview cards and recent activity
- `orders`: order list with inline status updates
- `menu`: simple CRUD-ready management screen
- `tables`: visual table status board

## API Layer Example

`src/services/api.ts` keeps Axios isolated from page components.

```ts
export const ordersService = {
  async list(): Promise<Order[]> {
    const { data } = await api.get<Order[]>("/orders");
    return data;
  },

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const { data } = await api.patch<Order>(`/orders/${orderId}`, { status });
    return data;
  },
};
```

The current scaffold falls back to mock data when `NEXT_PUBLIC_API_URL` is missing, which makes it easy to develop the UI before the backend is ready.

## Auth State Example

`src/store/auth.ts` keeps auth logic small:

```ts
type AuthState = {
  token: string | null;
  user: User | null;
  hydrated: boolean;
  login: (payload: AuthResponse) => void;
  logout: () => void;
};
```

The store persists the token in `localStorage` using Zustand middleware and syncs Axios headers through `setApiToken`.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Extend Next

- Replace the mock service branches in `src/services/api.ts` with real endpoints.
- Add role-based route checks in `src/components/layout/protected-page.tsx`.
- Move menu and table state into dedicated stores if those flows become collaborative or server-driven.
