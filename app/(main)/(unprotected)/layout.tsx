import BlockBusiness from "@/components/blockRoles/BlockBusiness";
import { ReactNode } from "react";

export default function UnprotectedLayout({ children }: { children: ReactNode }) {
    return <BlockBusiness>{children}</BlockBusiness>;
} 