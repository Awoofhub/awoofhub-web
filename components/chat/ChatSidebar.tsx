import { useUser } from "@/features/user/useUser";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TbMessage } from "react-icons/tb";
import { ChannelList, ChannelPreviewMessenger, ChannelPreviewUIComponentProps, InfiniteScroll, useChatContext } from "stream-chat-react";

interface ChatSidebarProps {
    open: boolean;
}

export default function ChatSidebar({ open }: ChatSidebarProps) {
    const router = useRouter();
    const { data: user } = useUser();
    if (!user?.id) return null;

    const { setActiveChannel } = useChatContext();

    useEffect(() => {
        setActiveChannel(undefined);
    }, [setActiveChannel]);


    const CustomPreview = (props: ChannelPreviewUIComponentProps) => {
        const { channel, onSelect } = props;
        const { client } = useChatContext();

        const members = Object.values(channel.state.members);
        const targetMember = members.find((m) => m.user?.id !== client.userID);

        const targetId = targetMember?.user?.id;

        const handleNavigation = (e: React.MouseEvent) => {
            onSelect?.(e);
            router.push(`/message/${targetId}`);
        };

        return (
            <div onClick={handleNavigation}>
                <ChannelPreviewMessenger {...props} />
            </div>
        );
    };

    return (
        <div className={cn("size-full flex-col border-0 md:flex md:w-72",
            open ? "flex" : "hidden"
        )}>
            <span className="hidden md:flex bg-white font-semibold text-lg p-3">Chats</span>
            <ChannelList
                filters={{
                    type: 'messaging',
                    members: { $in: [user.id] },
                    last_message_at: { $exists: true }
                }}
                Preview={CustomPreview}
                Paginator={InfiniteScroll}
                setActiveChannelOnMount={false}
                EmptyStateIndicator={EmptyChats}
            />
        </div>
    )
}



function EmptyChats() {
    return (
        <>
            {/* Mobile */}
            <div className="flex md:hidden flex-col items-center justify-center size-full bg-gray-50">
                <TbMessage size={48} className="text-primary" />
                <h2 className="mt-2 text-black text-lg xs:text-xl lg:text-2xl font-bold">No conversations yet</h2>
                <p className="mb-6 text-muted text-xs xs:ext-sm lg:text-base max-w-[400px] mx-auto text-center">Have a question about an order or product? Start a chat with any awoofer’s post.</p>
                <Link
                    href="/offers"
                    className="bg-primary text-white px-6 py-2 rounded-sm text-xs xs:text-sm lg:text-base font-baloo font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center"
                >
                    Explore offers
                </Link>
            </div>


            {/* Desktop */}
            <div className="hidden md:flex flex-col items-center justify-center p-6">
                <h2 className="text-xl font-semibold">
                    No Messages
                </h2>
            </div>
        </>
    );
}
