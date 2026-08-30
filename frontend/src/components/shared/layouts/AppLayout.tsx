import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link, Outlet } from "react-router-dom";
import AppSidebar from "../AppSidebar";
import { Button } from "@/components/ui/button";
import { LogOutIcon, Search, SearchIcon, UserIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../themes/mod-toggle";

const AppLayout = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <SidebarProvider className="h-full min-h-0">
        {/* Sidebar */}
        <AppSidebar />
        {/* Main area */}
        <div className="flex min-w-0 flex-1 flex-col min-h-0">
          {/* Navbar */}
          <nav className="h-16 shrink-0 w-full bg-sidebar flex items-center px-4 gap-2 sticky top-0 z-10">
            <SidebarTrigger />
            {/* Mobile menu */}
            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <Button variant="ghost">
                {" "}
                <SearchIcon />{" "}
              </Button>
              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-40"
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel> My Account </DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link to={"/profile"}>
                        {" "}
                        <UserIcon /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => {
                        console.log("Logout");
                      }}
                    >
                      <LogOutIcon /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Desktop menu */}
            <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
              <InputGroup className="max-w-xs">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  {" "}
                  <Search />{" "}
                </InputGroupAddon>
              </InputGroup>

              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-40"
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel> My Account </DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link to={"/dashboard/profile"}>
                        {" "}
                        <UserIcon /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => {
                        console.log("Logout");
                      }}
                    >
                      <LogOutIcon /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
          {/* ONLY THIS AREA SCROLLS */}
          <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
