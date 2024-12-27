import Navbar from "@/Components/nav/navbar";
import Sidebar from "@/Components/nav/sidebar";
import ModalLogoutProvider from "@/Components/Providers/modal-provider";
import { Toaster } from "@/Components/ui/sonner";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

export default function Authenticated({
  label,
  previousPathname,
  successProfileMessage,
  successPassMessage,
  errorMessage,
  children,
}: PropsWithChildren<{
  label?: string;
  previousPathname?: string;
  successProfileMessage?: string;
  successPassMessage?: string;
  errorMessage?: string;
}>) {
  const user = usePage().props.auth.user;

  return (
    <>
      <Toaster />
      <ModalLogoutProvider />
      <header className="fixed inset-y-0 z-[180] h-[80px] w-full md:pl-56">
        <Navbar
          label={label}
          previousPathname={previousPathname}
          user={user}
          successProfileMessage={successProfileMessage}
          successPassMessage={successPassMessage}
          errorMessage={errorMessage}
        />
      </header>
      <aside className="fixed inset-y-0 z-[200] hidden h-dvh w-56 flex-col md:flex">
        <Sidebar />
      </aside>
      <main className="max-h-full min-h-[calc(100dvh)] bg-neutral-50/20 pt-[80px] md:pl-56">
        {children}
      </main>
    </>
  );
}
