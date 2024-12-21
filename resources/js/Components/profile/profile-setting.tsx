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
import axios from "axios";

const ProfileSetting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState();

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          onClick={isMounted ? () => setIsOpen(false) : () => setIsOpen(true)}
          className="group flex items-center justify-center"
        >
          <UserCog
            size={22}
            className="text-muted-foreground group-hover:text-foreground transition-all"
          />
          <span className="ml-2">Profil</span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Seting Profil</SheetTitle>
            <SheetDescription>
              Buat perubahan pada profil Anda di sini. Klik simpan setelah Anda
              selesai.
            </SheetDescription>
          </SheetHeader>
          <SettingProfileForm errorMessage={undefined} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSetting;
