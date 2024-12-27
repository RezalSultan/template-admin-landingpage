import { Link } from "@inertiajs/react";
import SidebarRoutes from "./sidebar-routes";
import { Separator } from "../ui/separator";

const Sidebar = () => {
  return (
    <div className="relative z-[300] flex h-dvh flex-col overflow-y-auto bg-primary">
      <Link
        href={"/admin/my-blog"}
        className="flex h-[78px] items-center justify-center px-6 py-6 text-white"
      >
        Ini Logo
      </Link>
      <Separator className="bg-secondary p-px" />
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
      <div className="absolute bottom-0 left-3 mb-3 flex flex-col items-start justify-start text-center text-white/50">
        <p className="text start text-xs">© Copyright 2025 Lorem Ipsum </p>
        <p className="text start text-xs">
          Developer by{" "}
          <a
            href="https://www.instagram.com/rezalsultan_p/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white"
          >
            MRezalSultan
          </a>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
