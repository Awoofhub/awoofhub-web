'use client'
import Chat from "@/components/chat/Chat";
import { useState } from "react";


export default function ChatList() {
   const [sidebarOpen, setSidebarOpen] = useState(true)
   return (
      <Chat open={sidebarOpen} openSidebar={() => setSidebarOpen(true)} />
   )
};



