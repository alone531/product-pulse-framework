
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  ShoppingBasket
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    href: "/",
  },
  {
    title: "Products",
    icon: <Package size={20} />,
    href: "/products",
  },
  {
    title: "Categories",
    icon: <FolderTree size={20} />,
    href: "/categories",
  },
  {
    title: "Orders",
    icon: <ShoppingBasket size={20} />,
    href: "/orders",
  },
];

const bottomNavItems: NavItem[] = [
  {
    title: "Settings",
    icon: <Settings size={20} />,
    href: "/settings",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="px-4 h-16 flex items-center">
        {!collapsed && (
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <span className="font-semibold text-lg">ProductPulse</span>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center w-full animate-fade-in">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
          </div>
        )}
      </div>
      
      {/* Main Navigation */}
      <div className="flex-1 py-6 flex flex-col justify-between">
        <nav className="px-2 space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm relative",
                "transition-all duration-200 ease-in-out group",
                isActive(item.href) 
                  ? "nav-item-active" 
                  : "hover:bg-sidebar-accent/80 text-sidebar-foreground/80 hover:text-sidebar-foreground"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {!collapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </Link>
          ))}

          {/* Add New Product Button */}
          <Link
            to="/products/new"
            className={cn(
              "flex items-center px-3 py-2.5 mt-6 rounded-lg text-sm",
              "bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200"
            )}
          >
            <span className="mr-3">
              <Plus size={20} />
            </span>
            {!collapsed && (
              <span className="font-medium">New Product</span>
            )}
          </Link>
        </nav>

        <nav className="px-2 space-y-1 pb-4">
          {bottomNavItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm",
                "transition-all duration-200 ease-in-out group",
                isActive(item.href) 
                  ? "nav-item-active" 
                  : "hover:bg-sidebar-accent/80 text-sidebar-foreground/80 hover:text-sidebar-foreground"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {!collapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </Link>
          ))}

          {/* Collapse Button */}
          <button
            onClick={toggleSidebar}
            className="flex items-center w-full px-3 py-2.5 mt-6 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent/80 hover:text-sidebar-foreground transition-all duration-200"
          >
            <span className="mr-3">
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </span>
            {!collapsed && (
              <span className="font-medium">Collapse</span>
            )}
          </button>
        </nav>
      </div>
    </div>
  );
}
