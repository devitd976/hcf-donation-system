
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  UserCircle, 
  Package, 
  ClipboardList, 
  Menu,
  X
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Clients", href: "/clients", icon: UserCircle },
  { name: "Volunteers", href: "/volunteers", icon: Users },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Requests", href: "/requests", icon: ClipboardList },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu toggle */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed z-50 top-4 left-4 p-2 rounded-md bg-hwf-purple text-white"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        {/* Logo area */}
        <div className="px-6 py-8 bg-hwf-purple text-white">
          <h1 className="text-2xl font-bold">HWF Donations</h1>
          <p className="text-sm opacity-80">Management System</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-md group",
                      isActive
                        ? "bg-hwf-purple-light text-hwf-purple-dark"
                        : "text-gray-700 hover:bg-hwf-light"
                    )}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <Icon
                      className={cn(
                        "mr-3 h-5 w-5",
                        isActive ? "text-hwf-purple" : "text-gray-500"
                      )}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-center text-gray-500">
            &copy; {new Date().getFullYear()} HWF Donation System
          </p>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
