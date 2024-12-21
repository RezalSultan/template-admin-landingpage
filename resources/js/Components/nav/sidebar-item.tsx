"use client";

import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const { url } = usePage();

  const isActive = url === href || url.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "relative group flex items-center text-muted gap-6 ml-4 rounded-tl-md rounded-bl-md px-4 text-sm font-normal transition-all hover:bg-background hover:font-semibold hover:text-foreground",
        isActive && "bg-white text-foreground font-bold",
      )}
    >
      <div className="flex items-center justify-center gap-x-2 py-2">
        <Icon
          size={22}
          className={cn(
            "text-muted transition-all group-hover:text-foreground",
            isActive && "text-foreground",
          )}
        />
        {label}
      </div>
      <div
        className={` group-hover:z-[999] group-hover:bg-background w-2.5 h-2.5 absolute -top-2.5 right-0 transition-all ${isActive && "z-[99] bg-background"}`}
      >
        <div className="w-2.5 h-2.5 bg-primary rounded-br-full transition-all"></div>
      </div>
      <div
        className={` group-hover:z-[999] group-hover:bg-background w-2.5 h-2.5 absolute -bottom-2.5 right-0 transition-all ${isActive && "z-[99] bg-background"}`}
      >
        <div className="w-2.5 h-2.5 bg-primary rounded-tr-full"></div>
      </div>
    </Link>
  );
};

export default SidebarItem;
