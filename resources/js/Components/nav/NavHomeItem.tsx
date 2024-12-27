import { Link, usePage } from "@inertiajs/react";

type NavbarHomeItemProps = {
  label: string;
  href: string;
};

const NavbarHomeItem = ({ label, href }: NavbarHomeItemProps) => {
  const { url } = usePage();

  const isActive = url === href || url.startsWith(`${href}/`);
  console.log(isActive);

  return (
    <li
      className={`group flex h-12 items-start justify-start text-foreground transition-all duration-200 ease-out hover:cursor-pointer hover:font-semibold lg:h-20 lg:justify-center lg:text-white/80 lg:hover:text-white ${
        isActive && "!font-bold text-foreground lg:!text-white"
      }`}
    >
      <Link
        href={href}
        className={`flex h-full w-full flex-col items-start justify-center gap-2 pt-1`}
      >
        {label}
        <div
          className={`-mt-2 h-[2px] w-0 rounded-sm bg-foreground opacity-100 transition-all duration-200 ease-out group-hover:w-full group-hover:opacity-100 group-hover:transition-all group-hover:duration-200 group-hover:ease-out lg:bg-white ${
            isActive && "!w-full"
          }`}
        />
      </Link>
    </li>
  );
};

export default NavbarHomeItem;
