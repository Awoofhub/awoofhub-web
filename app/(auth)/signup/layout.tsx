import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Join AwoofHub to discover amazing deals, discounts, and freebies.",
};

export default function SignupLayout({ children }: { children: ReactNode }) {
    return <>{children}</>
}