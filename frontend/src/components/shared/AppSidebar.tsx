import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import OrganizationSwitcher from "./OrganizationSwitcher";

// Sidebar links

import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Package,
  Tags,
  Truck,
  Warehouse,
  Boxes,
  ShoppingCart,
  Building2,
  Users,
  ClipboardList,
  User,
  LogOutIcon,
  PanelLeftCloseIcon,
} from "lucide-react";
import { Button } from "../ui/button";

export type OrganizationRole = "OWNER" | "ADMIN" | "MANAGER" | "STAFF";

export type SidebarLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: OrganizationRole[];
};

export type SidebarGroup = {
  label: string;
  links: SidebarLink[];
};

export const sidebarGroups: SidebarGroup[] = [
  // =========================
  // MAIN
  // =========================
  {
    label: "Main",
    links: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["OWNER", "ADMIN", "MANAGER", "STAFF"],
      },
    ],
  },

  // =========================
  // CATALOG
  // =========================
  {
    label: "Catalog",
    links: [
      {
        label: "Products",
        href: "/dashboard/products",
        icon: Package,
        roles: ["OWNER", "ADMIN", "MANAGER", "STAFF"],
      },
      {
        label: "Categories",
        href: "/dashboard/categories",
        icon: Tags,
        roles: ["OWNER", "ADMIN", "MANAGER"],
      },
      {
        label: "Suppliers",
        href: "/dashboard/suppliers",
        icon: Truck,
        roles: ["OWNER", "ADMIN", "MANAGER"],
      },
    ],
  },

  // =========================
  // INVENTORY
  // =========================
  {
    label: "Inventory",
    links: [
      {
        label: "Warehouses",
        href: "/dashboard/warehouses",
        icon: Warehouse,
        roles: ["OWNER", "ADMIN", "MANAGER"],
      },
      {
        label: "Inventory",
        href: "/dashboard/inventory",
        icon: Boxes,
        roles: ["OWNER", "ADMIN", "MANAGER", "STAFF"],
      },
    ],
  },

  // =========================
  // PURCHASING
  // =========================
  {
    label: "Purchasing",
    links: [
      {
        label: "Purchase Orders",
        href: "/dashboard/purchase-orders",
        icon: ShoppingCart,
        roles: ["OWNER", "ADMIN", "MANAGER"],
      },
    ],
  },

  // =========================
  // ADMINISTRATION
  // =========================
  {
    label: "Administration",
    links: [
      {
        label: "Organization",
        href: "/dashboard/organization-settings",
        icon: Building2,
        roles: ["OWNER", "ADMIN"],
      },
      {
        label: "Members",
        href: "/dashboard/members",
        icon: Users,
        roles: ["OWNER", "ADMIN"],
      },
      {
        label: "Audit Logs",
        href: "/dashboard/audit-logs",
        icon: ClipboardList,
        roles: ["OWNER", "ADMIN"],
      },
    ],
  },

  // =========================
  // ACCOUNT
  // =========================
  {
    label: "Account",
    links: [
      {
        label: "Profile",
        href: "/dashboard/profile",
        icon: User,
        roles: ["OWNER", "ADMIN", "MANAGER", "STAFF"],
      },
    ],
  },
];
// TODO Later Fetch Organization From Backend
const organization = {
  name: "Acme Corporation",
  role: "Admin",
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8uxpxTgI5ArvS47_xyoHrMXmIIB0rmd4BWcK9-U-Mw&s=10",
};

export default function AppSidebar() {
  const { isMobile, open, openMobile, setOpen, setOpenMobile } = useSidebar();
  return (
    <Sidebar  variant="sidebar" collapsible={isMobile ? "offcanvas" : "icon"}>
      {(open || openMobile) && (
        <SidebarHeader>
          <Link to={"/dashboard"}>
            <div className="flex items-center gap-2 h-16 w-full bg-sidebar">
              <Button
                className="w-10"
                variant={"destructive"}
                onClick={() => {
                  if (isMobile && openMobile) {
                    setOpenMobile(false);
                  } else if (!isMobile && open) {
                    setOpen(false);
                  }
                }}
              >
                <PanelLeftCloseIcon />
              </Button>

              <img src={organization.logo} alt="Logo" className="w-10 h-10 rounded-full" />
              <h1>{organization.name}</h1>
            </div>
          </Link>

          {/* Organizations Switcher */}

          <div className="mt-4 mb-2">
            <OrganizationSwitcher />
          </div>
        </SidebarHeader>
      )}
      <SidebarSeparator />
      <SidebarContent>
        {sidebarGroups.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.links.map((link) => {
                  const Icon = link.icon;

                  return (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton asChild>
                        <Link to={link.href}>
                          <Icon />
                          <span>{link.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarSeparator />
          </SidebarGroup>
        ))}
      </SidebarContent>
      {open && (
        <SidebarFooter>
          <Button
            variant={"destructive"}
            onClick={() => {
              console.log("logout");
            }}
          >
            <LogOutIcon />
            Logout
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
