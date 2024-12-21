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

const UserPopoverAdmin = ({ user }: { user: User }) => {
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
        <PopoverContent align="end">
          <Command>
            <h2>{user.name}</h2>
            <p className="mb-2 text-sm font-normal text-muted-foreground">
              {user.email}
            </p>
            <CommandSeparator />
            <CommandList>
              <CommandGroup heading="Seting">
                <CommandItem className="cursor-pointer text-muted-foreground hover:text-foreground hover:font-semibold">
                  <ProfileSetting />
                </CommandItem>
                <CommandItem className="cursor-pointer text-muted-foreground hover:text-foreground hover:font-semibold">
                  <ChangePassSetting />
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
