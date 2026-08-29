import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const organizations = [
  {
    id: "1",
    name: "Acme Corporation",
    role: "Admin",
    logo: "https://example.com/acme-logo.png",
  },
  {
    id: "2",
    name: "Tech Solutions",
    role: "Owner",
    logo: "https://example.com/tech-logo.png",
  },
  {
    id: "3",
    name: "My Warehouse",
    role: "Staff",
    logo: "https://example.com/warehouse-logo.png",
  },
];
export default function OrganizationSwitcher() {
  // TODO FETCH ORGANIZATIONS FROM API AND SET ACTIVE ORGANIZATION BASED ON USER'S CURRENT ORGANIZATION
  const [activeOrganization, setActiveOrganization] = useState(
    organizations[0],
  );
  const navigate = useNavigate();

  const navigateToCreateOrganization = () => {
    navigate("/create-organization");
    return;
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="h-16">
        <Button variant="ghost" className="w-full justify-between px-2">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="size-7 rounded-md">
              <AvatarImage src={activeOrganization.logo} />
              <AvatarFallback className="rounded-md">
                {activeOrganization.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium">
                {activeOrganization.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {activeOrganization.role}
              </p>
            </div>
          </div>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search organization..." />
          <CommandList>
            <CommandEmpty> No organization found. </CommandEmpty>
            <CommandGroup heading="Organizations">
              {organizations.map((organization) => (
                <CommandItem
                  key={organization.id}
                  value={organization.name}
                  onSelect={() => {
                    setActiveOrganization(organization);
                  }}
                  className="gap-2"
                >
                  <Avatar className="size-7 rounded-md">
                    <AvatarImage src={organization.logo} />
                    <AvatarFallback className="rounded-md">
                      {organization.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{organization.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {organization.role}
                    </p>
                  </div>
                  {organization.id === activeOrganization.id && (
                    <Check className="size-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup>
              <CommandItem onSelect={() => navigateToCreateOrganization()}>
                <Plus className="size-4" /> Create organization
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
