"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { User as UserIcon } from "lucide-react";
import ProfileSetting from "./profile-setting";
import ChangePassSetting from "./change-pass-setting";
import LogoutItem from "./logout-item";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/Components/ui/command";
import { User } from "@/types";

const UserPopoverAdmin = ({
  user,
  successProfileMessage,
  successPassMessage,
  errorMessage,
}: {
  user: User;
  successProfileMessage?: string;
  successPassMessage?: string;
  errorMessage?: string;
}) => {
  return (
    <div className="ml-auto">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex cursor-pointer items-center justify-center">
            <p className="hidden sm:block">Hi, {user.name}</p>
            <button className="flex rounded-full bg-white p-3 transition-all hover:bg-accent sm:p-4">
              <UserIcon />
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="z-[200]">
          <Command>
            <h2>{user.name}</h2>
            <p className="mb-2 text-sm font-normal text-muted-foreground">
              {user.email}
            </p>
            <CommandSeparator />
            <CommandList>
              <CommandGroup heading="Seting">
                <CommandItem className="group cursor-pointer">
                  <ProfileSetting
                    user={user}
                    successProfileMessage={successProfileMessage}
                    errorMessage={errorMessage}
                  />
                </CommandItem>
                <CommandItem className="group cursor-pointer">
                  <ChangePassSetting
                    successPassMessage={successPassMessage}
                    errorMessage={errorMessage}
                  />
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <LogoutItem />
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserPopoverAdmin;
