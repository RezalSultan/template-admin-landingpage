"use client";

import { CircleHelp, Images, Layout, Newspaper, UserCheck } from "lucide-react";
import SidebarItem from "./sidebar-item";

const SidebarRoutes = () => {
  const routes = [
    {
      icon: Newspaper,
      label: "Artikel Saya",
      href: "/admin/my-blog",
    },
    {
      icon: CircleHelp,
      label: "FAQ",
      href: "/admin/my-faq",
    },
    {
      icon: UserCheck,
      label: "Testimoni",
      href: "/admin/testimony",
    },
    {
      icon: Images,
      label: "Galeri",
      href: "/admin/my-gallery",
    },
  ];

  return (
    <nav className="mt-4 flex w-full flex-col gap-2.5">
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
