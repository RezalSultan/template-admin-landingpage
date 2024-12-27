import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { routes } from "./NavHome";
import NavbarHomeItem from "./NavHomeItem";

const MobileNavbarHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center"
        >
          <Menu size={32} />
        </SheetTrigger>
        <SheetContent className="z-[210]">
          <SheetHeader>
            <SheetTitle>Logo</SheetTitle>
            <SheetDescription>
              <div className="relative flex items-center justify-start gap-3">
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative h-8 w-8 fill-black"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 3C17.3261 3 18.5979 3.52678 19.5355 4.46447C20.4732 5.40215 21 6.67392 21 8V16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21H8C6.67392 21 5.40215 20.4732 4.46447 19.5355C3.52678 18.5979 3 17.3261 3 16V8C3 6.67392 3.52678 5.40215 4.46447 4.46447C5.40215 3.52678 6.67392 3 8 3H16ZM16 5H8C7.20435 5 6.44129 5.31607 5.87868 5.87868C5.31607 6.44129 5 7.20435 5 8V16C5 16.7956 5.31607 17.5587 5.87868 18.1213C6.44129 18.6839 7.20435 19 8 19H16C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16V8C19 7.20435 18.6839 6.44129 18.1213 5.87868C17.5587 5.31607 16.7956 5 16 5ZM12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8ZM12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10ZM16.5 6.5C16.7652 6.5 17.0196 6.60536 17.2071 6.79289C17.3946 6.98043 17.5 7.23478 17.5 7.5C17.5 7.76522 17.3946 8.01957 17.2071 8.20711C17.0196 8.39464 16.7652 8.5 16.5 8.5C16.2348 8.5 15.9804 8.39464 15.7929 8.20711C15.6054 8.01957 15.5 7.76522 15.5 7.5C15.5 7.23478 15.6054 6.98043 15.7929 6.79289C15.9804 6.60536 16.2348 6.5 16.5 6.5Z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative h-8 w-8 fill-black"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path d="M22.1335 7.76C21.2223 6.71937 20.7201 5.3832 20.7202 4H16.6002V20.5333C16.5691 21.4283 16.1916 22.2761 15.5473 22.898C14.903 23.5199 14.0423 23.8672 13.1469 23.8667C11.2535 23.8667 9.68021 22.32 9.68021 20.4C9.68021 18.1067 11.8935 16.3867 14.1735 17.0933V12.88C9.57354 12.2667 5.54688 15.84 5.54688 20.4C5.54688 24.84 9.22688 28 13.1335 28C17.3202 28 20.7202 24.6 20.7202 20.4V12.0133C22.3909 13.2131 24.3967 13.8569 26.4535 13.8533V9.73333C26.4535 9.73333 23.9469 9.85333 22.1335 7.76Z"></path>
                  </svg>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <ul className="items-start justify-start text-center text-base font-normal md:gap-8 lg:flex lg:gap-10 lg:text-lg">
              {routes.map((route) => (
                <NavbarHomeItem
                  key={route.href}
                  label={route.label}
                  href={route.href}
                />
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNavbarHome;
