"use client";

import { CommandItem } from "@/Components/ui/command";
import { LogOut } from "lucide-react";
import { useState } from "react";
import useStoreModal from "@/Hooks/use-store-modal";

const LogoutItem = () => {
  const logoutModal = useStoreModal();
  const [open, setOpen] = useState(false);
  return (
    <CommandItem
      onSelect={() => {
        setOpen(false);
        logoutModal.onOpen();
      }}
      className="group cursor-pointer text-muted-foreground hover:text-foreground transition-all hover:font-semibold"
    >
      <LogOut
        size={22}
        className="text-muted-foreground group-hover:text-foreground transition-all"
      />
      <span className="ml-1">Logout</span>
    </CommandItem>
  );
};

export default LogoutItem;
