import Header from "@/components/header/Header";
import MobileBottomMenu from "@/components/header/mobile/MobileBottomMenu";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <MobileBottomMenu />
        </>
    )
} 