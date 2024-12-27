import FooterHome from "@/Components/nav/FooterHome";
import NavbarHome from "@/Components/nav/NavHome";
import { Toaster } from "@/Components/ui/sonner";
import React, { PropsWithChildren } from "react";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavbarHome />
      <main className="w-full px-5 xl:container sm:px-10 lg:px-20 xl:mx-auto">
        <div className="3xl:relative mt-24 flex justify-between">
          {children}
        </div>
      </main>
      <FooterHome />
    </>
  );
};

export default HomeLayout;
