import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  Bell,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Menu,
  Globe,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRole } from "../../contexts/role-context";
import { useTheme } from "../../contexts/theme-context";
import { cn } from "../ui/utils";
import { LanguageSwitcher } from "../language-switcher";
import { ThemeSwitcher } from "../theme-switcher";
import { RoleSwitcher } from "../role-switcher";

interface OneLinkHeaderProps {
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
  onLogout?: () => void;
  userName?: string;
  userEmail?: string;
  notificationCount?: number;
}

export function OneLinkHeader({
  onSearch,
  onMenuClick,
  onLogout,
  userName = "Tom Cook",
  userEmail = "admin@onelink.com",
  notificationCount = 3,
}: OneLinkHeaderProps) {
  const { t } = useTranslation();
  const { role } = useRole();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  // Role-based styling
  const getRoleStyles = () => {
    switch (role) {
      case "Sales Support":
        return {
          badgeBg: "bg-[#7BC9A6]",
          badgeText: "text-white",
          label: "Sales Support",
          fullLabel: "Sales Support",
        };
      case "Sales Manager":
        return {
          badgeBg: "bg-[#5B9FD8]",
          badgeText: "text-white",
          label: "Sales Manager",
          fullLabel: "Sales Manager",
        };
      case "Admin":
        return {
          badgeBg: "bg-[#E57373]",
          badgeText: "text-white",
          label: "Admin",
          fullLabel: "Admin",
        };
      default:
        return {
          badgeBg: "bg-[#7BC9A6]",
          badgeText: "text-white",
          label: "Sales Support",
          fullLabel: "Sales Support",
        };
    }
  };

  const roleStyles = getRoleStyles();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("common.search") || "Search"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Role Switcher - Always Visible */}
          <RoleSwitcher />

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-semibold">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <p className="font-medium text-sm">New deal created</p>
                  <p className="text-xs text-muted-foreground">
                    John Smith created a new deal worth $50K
                  </p>
                  <p className="text-xs text-muted-foreground">5 mins ago</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <p className="font-medium text-sm">Approval required</p>
                  <p className="text-xs text-muted-foreground">
                    Sarah Chen needs approval for discount
                  </p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <p className="font-medium text-sm">System update</p>
                  <p className="text-xs text-muted-foreground">
                    ONELINK CRM v2.5 is now available
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm text-primary font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu with Role Badge */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 px-3 h-10"
              >
                <div className="flex items-center gap-2">
                  {/* User Avatar */}
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium leading-none mb-1">
                      {userName}
                    </span>
                    <Badge
                      className={cn(
                        "text-[10px] px-1.5 py-0 h-4",
                        roleStyles.badgeBg,
                        roleStyles.badgeText
                      )}
                    >
                      {roleStyles.label}
                    </Badge>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                  <div className="pt-1">
                    <Badge
                      className={cn(
                        "text-xs",
                        roleStyles.badgeBg,
                        roleStyles.badgeText
                      )}
                    >
                      {roleStyles.fullLabel}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Role Switcher in Menu */}
              <div className="px-2 py-2">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
                  Switch Role
                </p>
                <RoleSwitcher />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}