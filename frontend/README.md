# Tadjir Platform Frontend Documentation

This frontend is built with React, TypeScript, Vite, and React Router. It follows a modular structure by feature, with shared UI components and route-level access control.

## 1) Project overview

The app is organized around these main concerns:

- Public pages: landing, login, register
- Authenticated pages: protected routes after login
- Organization-aware pages: routes that only work when a user has selected an organization
- Shared app shell: sidebar, toolbar, layout wrappers
- Feature modules: auth, organizations, products, inventory, warehouses, suppliers, etc.

## 2) Main entry points

### App bootstrap

The app starts in the root component and mounts the providers and router.

- src/App.tsx
- src/app/providers.tsx
- src/main.tsx

Flow:

1. src/main.tsx renders the app root.
2. App.tsx loads Providers.
3. Providers.tsx wraps the app in:
   - ThemeProvider
   - QueryClientProvider
   - RouterProvider

Typical app startup flow:

```tsx
<App />
  -> <Providers />
    -> <ThemeProvider />
    -> <QueryClientProvider />
    -> <RouterProvider router={router} />
```

## 3) Folder structure map

```text
src/
├─ App.tsx
├─ index.css
├─ main.tsx
├─ app/
│  ├─ providers.tsx
│  └─ router.tsx
├─ assets/
├─ components/
│  ├─ shared/
│  │  ├─ AppSidebar.tsx
│  │  ├─ OrganizationSwitcher.tsx
│  │  ├─ layouts/
│  │  │  ├─ AppLayout.tsx
│  │  │  └─ AuthLayout.tsx
│  │  └─ themes/
│  │     ├─ mod-toggle.tsx
│  │     └─ theme-provider.tsx
│  └─ ui/
│     ├─ avatar.tsx
│     ├─ button.tsx
│     ├─ command.tsx
│     ├─ dialog.tsx
│     ├─ dropdown-menu.tsx
│     ├─ input-group.tsx
│     ├─ input.tsx
│     ├─ popover.tsx
│     ├─ separator.tsx
│     ├─ sheet.tsx
│     ├─ sidebar.tsx
│     ├─ skeleton.tsx
│     ├─ textarea.tsx
│     └─ tooltip.tsx
├─ features/
│  ├─ auth/
│  │  ├─ components/guards/AuthGuard.tsx
│  │  ├─ hooks/
│  │  ├─ schemas/
│  │  ├─ api/
│  │  └─ types.ts
│  ├─ organizations/
│  │  ├─ components/OrganizationGuard.tsx
│  │  ├─ api/
│  │  ├─ hooks/
│  │  ├─ schemas/
│  │  └─ types.ts
│  ├─ products/
│  ├─ categories/
│  ├─ suppliers/
│  ├─ inventory/
│  ├─ warehouses/
│  ├─ purchase-orders/
│  ├─ dashboard/
│  └─ audit-logs/
├─ hooks/
│  └─ use-mobile.ts
├─ lib/
│  ├─ api-client.ts
│  ├─ query-client.ts
│  └─ utils.ts
├─ pages/
│  ├─ Landing.tsx
│  ├─ Login.tsx
│  ├─ Register.tsx
│  ├─ SelectOrganization.tsx
│  ├─ Dashboard.tsx
│  ├─ Profile.tsx
│  ├─ Products.tsx
│  ├─ Categories.tsx
│  ├─ Suppliers.tsx
│  ├─ WareHouses.tsx
│  ├─ WareHouseInventory.tsx
│  ├─ PurchaseOrders.tsx
│  ├─ OrganizationSettings.tsx
│  ├─ TeamManagement.tsx
│  ├─ AuditLogs.tsx
│  ├─ CreateProduct.tsx
│  ├─ EditProduct.tsx
│  ├─ ProductDetails.tsx
│  ├─ PurchaseOrderDetails.tsx
│  ├─ InventoryMovements.tsx
│  ├─ StockAdjustments.tsx
│  └─ StockTransfer.tsx
└─ types/
```

## 4) Route organization

All routing is centralized in src/app/router.tsx.

The router uses nested routes and route guards to define access levels.

### Route structure

```tsx
createBrowserRouter([
  { path: "/", element: <LandingPage /> },

  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    element: <AuthGuard />,
    children: [
      { path: "select-organization", element: <SelectOrganization /> },
      {
        element: <OrganizationGuard />,
        children: [
          {
            path: "dashboard",
            element: <AppLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "profile", element: <Profile /> },
              ...
            ],
          },
        ],
      },
    ],
  },
]);
```

### Public routes

These routes do not require authentication:

- /
- /login
- /register

These live under the AuthLayout wrapper.

### Auth-protected routes

These routes are nested under AuthGuard:

- /select-organization
- /dashboard/*

This means any user entering a protected route must pass the auth guard before reaching the app.

### Organization-protected routes

These routes are nested under OrganizationGuard:

- /dashboard
- /dashboard/profile
- /dashboard/products
- /dashboard/categories
- /dashboard/suppliers
- /dashboard/warehouses
- /dashboard/inventory
- /dashboard/purchase-orders
- /dashboard/organization-settings
- /dashboard/members
- /dashboard/audit-logs

This layer is meant to ensure a user can only access organization-based pages after choosing/validating an active organization.

## 5) Auth guard documentation

File: src/features/auth/components/guards/AuthGuard.tsx

Current implementation:

```tsx
export function AuthGuard() {
  return <Outlet />;
}
```

This is a placeholder. The intended logic is:

- check if the current user is authenticated
- if not authenticated, redirect to /login
- if authenticated, render nested pages with <Outlet />

Recommended real logic:

```tsx
const location = useLocation();
const user = useAuthStore();

if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

return <Outlet />;
```

### Important notes

- It is a route-level gate, not a component-only check.
- It is designed to protect all app content under the authenticated section.
- The actual user session should come from a real auth provider, backend token validation, or Redux/Zustand store.

## 6) Organization guard documentation

File: src/features/organizations/components/OrganizationGuard.tsx

Current implementation:

```tsx
const OrganizationGuard = () => {
  return <Outlet />;
};
```

This is also a placeholder. Intended behavior:

- load the current selected organization from local state, store, or backend
- if no organization is selected, redirect to /select-organization
- if an organization exists, keep rendering the nested dashboard routes

Recommended logic:

```tsx
const selectedOrg = useOrganizationStore();

if (!selectedOrg) {
  return <Navigate to="/select-organization" replace />;
}

return <Outlet />;
```

### Why this guard exists

The app is organization-aware, so it is important to separate:

- user authentication
- active organization selection
- organization role / permissions

This prevents access to company dashboards before a user joins or selects an organization.

## 7) Layouts

### AuthLayout

File: src/components/shared/layouts/AuthLayout.tsx

Purpose:

- wraps public auth pages such as login and register
- centers content on a full-screen view
- keeps auth UI separate from the application shell

Current implementation:

```tsx
export default function AuthLayout() {
  return (
    <div className="w-full h-screen bg-primary-foreground flex items-center justify-center">
      <Outlet />
    </div>
  );
}
```

### AppLayout

File: src/components/shared/layouts/AppLayout.tsx

Purpose:

- wraps all authenticated dashboard pages
- includes app navigation and top bar
- renders the sidebar and main content area
- injects nested route pages with <Outlet />

Structure:

- SidebarProvider
- AppSidebar
- top nav with search and user menu
- main content area for page content

This layout is used for every route under /dashboard.

## 8) Sidebar and navigation

File: src/components/shared/AppSidebar.tsx

The sidebar is organized into groups:

- Main
- Catalog
- Inventory
- Purchasing
- Administration
- Account

Each group contains sidebar links with role restrictions via the roles field:

```ts
export type OrganizationRole = "OWNER" | "ADMIN" | "MANAGER" | "STAFF";
```

Examples:

- Dashboard: all roles
- Products: all roles
- Categories: OWNER / ADMIN / MANAGER
- Organization: OWNER / ADMIN
- Audit Logs: OWNER / ADMIN

This is the main navigation structure for the dashboard pages.

## 9) Organization switcher

File: src/components/shared/OrganizationSwitcher.tsx

This component is meant to:

- display the active organization
- list available organizations
- let the user switch active organization
- provide a Create organization option

At the moment, the organization data is mocked in the component with TODO comments, so the real backend integration is still pending.

## 10) Page map

These are the current page-level screens:

### Public pages

- Landing.tsx -> /
- Login.tsx -> /login
- Register.tsx -> /register

### Organization selection

- SelectOrganization.tsx -> /select-organization

### Dashboard pages

- Dashboard.tsx -> /dashboard
- Profile.tsx -> /dashboard/profile
- Products.tsx -> /dashboard/products
- Categories.tsx -> /dashboard/categories
- Suppliers.tsx -> /dashboard/suppliers
- WareHouses.tsx -> /dashboard/warehouses
- WareHouseInventory.tsx -> /dashboard/inventory
- PurchaseOrders.tsx -> /dashboard/purchase-orders
- OrganizationSettings.tsx -> /dashboard/organization-settings
- TeamManagement.tsx -> /dashboard/members
- AuditLogs.tsx -> /dashboard/audit-logs

### Planned / future pages

These are already referenced in the router comments or file names:

- CreateProduct.tsx
- EditProduct.tsx
- ProductDetails.tsx
- PurchaseOrderDetails.tsx
- InventoryMovements.tsx
- StockAdjustments.tsx
- StockTransfer.tsx

These appear to be detail or management screens that are not yet wired into the main router.

## 11) Feature module pattern

Each feature follows a similar folder pattern:

```text
features/
  some-feature/
    api/
    components/
    hooks/
    schemas/
    types.ts
```

This helps keep logic organized by domain instead of mixing everything into one giant app layer.

Examples:

- auth/
- organizations/
- products/
- categories/
- inventory/
- warehouses/
- suppliers/
- purchase-orders/
- dashboard/
- audit-logs/

## 12) How to add a new route

To register a new screen:

1. Create the page component under src/pages/
2. Import it into src/app/router.tsx
3. Add it to the correct route group:
   - public auth routes under AuthLayout
   - authenticated routes under AuthGuard
   - organization routes under OrganizationGuard + AppLayout
4. If needed, add the menu item to src/components/shared/AppSidebar.tsx

Example:

```tsx
import NewPage from "@/pages/NewPage";

{ path: "new-page", element: <NewPage /> }
```

If it should be protected:

```tsx
{
  element: <AuthGuard />,
  children: [{ path: "new-page", element: <NewPage /> }],
}
```

## 13) Current implementation status

This frontend is partially scaffolded. The structure is already organized well, but some key logic is still intentionally left as placeholders:

- AuthGuard currently does not check auth state
- OrganizationGuard currently does not check selected organization
- Sidebar organization data is hardcoded
- Many pages exist as stubs and will need real API wiring
- Routing is defined but some feature detail pages are not connected yet

## 14) Recommended next steps

1. Implement real auth state and token/session checks
2. Add organization selection and persistence
3. Connect sidebar/menu data to backend permissions
4. Wire API hooks under each feature folder
5. Add route-level permission checks by role
6. Replace mock data with backend-driven data

