"use client";
import Header from "@/components/header/Header";
import MobileBottomMenu from "@/components/header/mobile/MobileBottomMenu";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { useSplashScreen } from "@/features/splash/useSplashScreen";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const showSplash = useSplashScreen();

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <Header />
      {children}
      <MobileBottomMenu />
    </>
  );
}
