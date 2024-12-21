"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { LockKeyhole } from "lucide-react";
import ChangePassForm from "./change-pass-form";
import { useState } from "react";

const ChangePassSetting = ({ token }: { token?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          onClick={() => setIsOpen(true)}
          className="group flex items-center justify-center"
        >
          <LockKeyhole
            size={22}
            className="text-muted-foreground group-hover:text-foreground transition-all"
          />
          <span className="ml-2">Ganti Password</span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Ganti Password</SheetTitle>
            <SheetDescription>
              Ganti password Anda di sini untuk memperbarui. Klik simpan setelah
              Anda selesai.
            </SheetDescription>
          </SheetHeader>
          <ChangePassForm errorMessage={undefined} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChangePassSetting;
