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

const ChangePassSetting = ({
  successPassMessage,
  errorMessage,
}: {
  successPassMessage?: string;
  errorMessage?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center"
        >
          <LockKeyhole
            size={22}
            className="text-muted-foreground transition-all group-hover:text-foreground"
          />
          <span className="ml-2 text-muted-foreground group-hover:font-semibold group-hover:text-foreground">
            Ganti Password
          </span>
        </SheetTrigger>
        <SheetContent className="z-[210]">
          <SheetHeader>
            <SheetTitle>Ganti Password</SheetTitle>
            <SheetDescription>
              Ganti password Anda di sini untuk memperbarui. Klik simpan setelah
              Anda selesai.
            </SheetDescription>
          </SheetHeader>
          <ChangePassForm
            successPassMessage={successPassMessage}
            errorMessage={errorMessage}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChangePassSetting;
