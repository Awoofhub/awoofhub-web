import Protected from "@/components/protected/Protected";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    return <Protected>{children}</Protected>;
} 