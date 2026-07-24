import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbMessage } from "react-icons/tb";
import { Channel, ChannelHeader, ChannelHeaderProps, MessageInput, MessageList, useChatContext, Window } from "stream-chat-react";

interface ChatChannelProps {
    open: boolean;
    openSidebar: () => void;
}

export default function ChatChannel({ open, openSidebar }: ChatChannelProps) {

    const router = useRouter();

    const handleMessageClick = (event: React.BaseSyntheticEvent, user: any) => {
        const username = user.username;
        router.push(`/profile/${username}`);
    };

    const { channel } = useChatContext();
    if (!channel) {
        return (
            <div className="hidden md:flex flex-col items-center justify-center size-full bg-gray-50">
                <TbMessage size={48} className="text-primary"/>
                <h2 className="mt-2 text-black text-lg xs:text-xl lg:text-2xl font-bold">No conversations yet</h2>
                <p className="mb-6 text-muted text-xs xs:ext-sm lg:text-base max-w-[400px] mx-auto text-center">Have a question about an order or product? Start a chat with any awoofer’s post.</p>
                <Link
                    href="/offers"
                    className="bg-primary text-white px-6 py-2 rounded-sm text-xs xs:text-sm lg:text-base font-baloo font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center"
                >
                    Explore offers
                </Link>
            </div>
        );
    }

    return (
        <div className={cn("w-full md:block", !open && "hidden")}>
            <Channel>
                <Window>
                    <CustomChannelHeader openSidebar={openSidebar} />
                    <MessageList onUserClick={handleMessageClick} />
                    <MessageInput maxRows={5} />
                </Window>
            </Channel>
        </div>
    )
}


interface CustomChannelHeaderProps extends ChannelHeaderProps {
    openSidebar: () => void;
}

function CustomChannelHeader({
    openSidebar,
    ...props
}: CustomChannelHeaderProps) {
    return <div className="flex items-center gap-3">
        <div className="h-full p-2 md:hidden">
            <button className="cursor-pointer" onClick={openSidebar}>
                <ArrowLeft className="size-5" />
            </button>
        </div>
        <ChannelHeader {...props} />

    </div>
}