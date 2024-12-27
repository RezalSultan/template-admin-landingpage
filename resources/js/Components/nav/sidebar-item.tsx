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
        "group relative ml-4 flex items-center gap-6 rounded-bl-md rounded-tl-md px-4 text-sm font-normal text-muted transition-all hover:bg-background hover:font-semibold hover:text-foreground",
        isActive && "bg-white font-bold text-foreground",
      )}
    >
      <div className="flex items-center justify-center gap-x-2 py-3">
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
        className={`absolute -top-2.5 right-0 h-2.5 w-2.5 transition-all group-hover:z-[999] group-hover:bg-background ${isActive && "z-[99] bg-background"}`}
      >
        <div className="h-2.5 w-2.5 rounded-br-full bg-primary transition-all"></div>
      </div>
      <div
        className={`absolute -bottom-2.5 right-0 h-2.5 w-2.5 transition-all group-hover:z-[999] group-hover:bg-background ${isActive && "z-[99] bg-background"}`}
      >
        <div className="h-2.5 w-2.5 rounded-tr-full bg-primary"></div>
      </div>
    </Link>
  );
};

export default SidebarItem;
