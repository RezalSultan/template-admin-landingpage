import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import Sidebar from "./sidebar";

const MobileSidebar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="z-[210] bg-white p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
