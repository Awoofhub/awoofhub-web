import CreatorProtected from "@/components/creator-studio/CreatorProtected";
import { ReactNode } from "react";

export default function CreatorProtectedLayout({ children }: { children: ReactNode }) {
    return <CreatorProtected>{children}</CreatorProtected>;
} 