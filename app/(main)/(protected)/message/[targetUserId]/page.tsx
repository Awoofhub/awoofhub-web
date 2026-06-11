'use client'

import Chat from "@/components/chat/Chat";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";


interface Props {
    params: Promise<{ targetUserId: string }>;
}

export default function ChatConversation({ params }: Props) {
    const { client, setActiveChannel } = useChatContext();
    const { targetUserId } = use(params);
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter();
    const handleClick = () => {
        setSidebarOpen(true)
        router.push(`/message/`);
    };

    useEffect(() => {
        const initChannel = async () => {
            if (!client?.userID || !targetUserId) return;

            const channel = client.channel("messaging", {
                members: [client.userID, targetUserId],
            });

            await channel.watch();
            setActiveChannel(channel);
        };

        initChannel();
    }, [client, targetUserId, setActiveChannel]);


    return (
        <Chat open={sidebarOpen} openSidebar={handleClick} />
    )
};



