import ChatProvider from "@/providers/chat-provider";
import { ReactNode } from "react";

export default function MessageLayout({ children }: { children: ReactNode }) {
    return <ChatProvider>{children}</ChatProvider>;
}  