"use client";

import { CircleHelp, Images, Layout, Newspaper } from "lucide-react";
import SidebarItem from "./sidebar-item";

const SidebarRoutes = () => {
  const routes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: Newspaper,
      label: "Blog Saya",
      href: "/admin/my-blog",
    },
    {
      icon: CircleHelp,
      label: "FAQ",
      href: "/admin/my-faq",
    },
    {
      icon: Images,
      label: "Galeri",
      href: "/admin/my-gallery",
    },
  ];

  return (
    <nav className="flex w-full flex-col gap-2.5 mt-4">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </nav>
  );
};

export default SidebarRoutes;
