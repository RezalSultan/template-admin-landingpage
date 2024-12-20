import { Toaster } from "@/Components/ui/sonner";
import React, { PropsWithChildren } from "react";

const PreAuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Toaster />
            <main className="flex h-dvh items-center justify-center bg-[url('/bg-login.png')] bg-cover bg-bottom">
                <div className="absolute inset-0 bg-black/30"></div>
                {children}
            </main>
        </>
    );
};

export default PreAuthLayout;
