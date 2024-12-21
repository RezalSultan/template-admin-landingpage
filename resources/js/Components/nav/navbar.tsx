"use client";

import MobileSidebar from "./mobile-sidebar";
import { useStoreLabel } from "@/Hooks/use-store-label";
import { ChevronLeft } from "lucide-react";
import UserPopoverAdmin from "@/Components/profile/user-popover";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { User } from "@/types";

const Navbar = ({ label, user }: { label?: string; user: User }) => {
  const { url } = usePage();
  const { labels } = useStoreLabel();
  const previousPathname = labels[url]?.previousPathname;

  const handleBackClick = () => {
    if (previousPathname !== "back") {
      Inertia.visit(previousPathname ?? "/admin/dashboard");
    }
    if (previousPathname === "back") {
      window.history.back();
    }
  };

  return (
    <div className="flex h-full w-full items-center border-b bg-white p-4 shadow-sm">
      <MobileSidebar />
      {(previousPathname || previousPathname === "back") && (
        <button
          onClick={handleBackClick}
          className="-ml-3 mr-1 flex rounded-full bg-white p-3 transition-all hover:bg-neutral-300/20"
        >
          <ChevronLeft />
        </button>
      )}
      <span title={label} className="line-clamp-1 text-2xl font-semibold">
        {label}
      </span>
      <UserPopoverAdmin user={user} />
    </div>
  );
};

export default Navbar;
