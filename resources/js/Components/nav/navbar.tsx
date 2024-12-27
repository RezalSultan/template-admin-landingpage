"use client";

import MobileSidebar from "./mobile-sidebar";
import { ChevronLeft } from "lucide-react";
import UserPopoverAdmin from "@/Components/profile/user-popover";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { User } from "@/types";

const Navbar = ({
  label,
  previousPathname,
  user,
  successProfileMessage,
  successPassMessage,
  errorMessage,
}: {
  label?: string;
  previousPathname?: string;
  user: User;
  successProfileMessage?: string;
  successPassMessage?: string;
  errorMessage?: string;
}) => {
  return (
    <div className="flex h-full w-full items-center border-b bg-white p-4 shadow-sm">
      <MobileSidebar />
      {previousPathname && (
        <Link
          href={previousPathname ?? "/admin/my-blog"}
          className="-ml-3 mr-1 flex rounded-full bg-white p-3 transition-all hover:bg-accent"
        >
          <ChevronLeft />
        </Link>
      )}
      <span title={label} className="line-clamp-1 text-2xl font-semibold">
        {label}
      </span>
      <UserPopoverAdmin
        user={user}
        successProfileMessage={successProfileMessage}
        successPassMessage={successPassMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Navbar;
