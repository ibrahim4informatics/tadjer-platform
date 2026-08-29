import AppLayout from "@/components/shared/layouts/AppLayout";
import AuthLayout from "@/components/shared/layouts/AuthLayout";
import { AuthGuard } from "@/features/auth/components/guards/AuthGuard";
import OrganizationGuard from "@/features/organizations/components/OrganizationGuard";
import AuditLogs from "@/pages/AuditLogs";
import Categories from "@/pages/Categories";
import Dashboard from "@/pages/Dashboard";
import LandingPage from "@/pages/Landing";
import Login from "@/pages/Login";
import OrganizationSettings from "@/pages/OrganizationSettings";
import Products from "@/pages/Products";
import Profile from "@/pages/Profile";
import PurchaseOrders from "@/pages/PurchaseOrders";
import Register from "@/pages/Register";
import SelectOrganization from "@/pages/SelectOrganization";
import Suppliers from "@/pages/Suppliers";
import TeamManagement from "@/pages/TeamManagement";
import WareHouseInventory from "@/pages/WareHouseInventory";
import WareHouses from "@/pages/WareHouses";
import { createBrowserRouter } from "react-router-dom";

/**
 * TODO Later add the pages that are not included directly in the sidebar like the following:
 * - Create Organization
 * - Create Product
 * - Create Category
 * - Create Supplier
 * - Create Warehouse
 * - Create Purchase Order
 * - Create Team Member
 * -Details pages for each of the above entities
 * - Edit pages for each of the above entities
 * - Settings pages for each of the above entities
 * - Other pages that are not included in the sidebar but are part of the application
 *
 */

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },

  {
    element: <AuthLayout />,
    children: [
      // Register the routes that do not need authentication here
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      // later add verify email password reset and other auth related pages
    ],
  },

  {
    element: <AuthGuard />,
    children: [
      // Register the routes that need authentication here
      { path: "select-organization", element: <SelectOrganization /> },
      {
        element: <OrganizationGuard />,
        children: [
          {
            path: "dashboard",
            element: <AppLayout />,
            children: [
              // Register the dashboard routes that need  auth + organization guard here
              { index: true, element: <Dashboard /> },
              { path: "profile", element: <Profile /> },
              { path: "products", element: <Products /> },
              { path: "categories", element: <Categories /> },
              { path: "suppliers", element: <Suppliers /> },
              { path: "warehouses", element: <WareHouses /> },
              { path: "inventory", element: <WareHouseInventory /> },
              { path: "purchase-orders", element: <PurchaseOrders /> },
              {
                path: "organization-settings",
                element: <OrganizationSettings />,
                children: [],
              },
              { path: "members", element: <TeamManagement /> },
              { path: "audit-logs", element: <AuditLogs /> },
            ],
          },
        ],
      },
    ],
  },
]);
