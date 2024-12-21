import { Link } from "@inertiajs/react";
import SidebarRoutes from "./sidebar-routes";
import { Separator } from "../ui/separator";

const Sidebar = () => {
  return (
    <div className="flex h-dvh flex-col overflow-y-auto bg-primary ">
      <Link href={"/admin/dashboard"} className="px-6 py-6 text-white">
        Ini Logo
      </Link>
      <Separator className="p-px bg-secondary" />
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
