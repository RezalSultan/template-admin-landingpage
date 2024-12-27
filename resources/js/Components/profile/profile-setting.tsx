"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { UserCog } from "lucide-react";
import SettingProfileForm from "./profile-form";
import { useEffect, useState } from "react";
import { User } from "@/types";

const ProfileSetting = ({
  user,
  successProfileMessage,
  errorMessage,
}: {
  user: User;
  successProfileMessage?: string;
  errorMessage?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          onClick={isMounted ? () => setIsOpen(false) : () => setIsOpen(true)}
          className="group flex items-center justify-center"
        >
          <UserCog
            size={22}
            className="text-muted-foreground transition-all group-hover:text-foreground"
          />
          <span className="ml-2 text-muted-foreground group-hover:font-semibold group-hover:text-foreground">
            Profil
          </span>
        </SheetTrigger>
        <SheetContent className="z-[210]">
          <SheetHeader>
            <SheetTitle>Seting Profil</SheetTitle>
            <SheetDescription>
              Buat perubahan pada profil Anda di sini. Klik simpan setelah Anda
              selesai.
            </SheetDescription>
          </SheetHeader>
          <SettingProfileForm
            user={user}
            successProfileMessage={successProfileMessage}
            errorMessage={errorMessage}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSetting;
