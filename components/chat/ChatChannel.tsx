import { cn } from "@/lib/utils";
import { ArrowLeft, MessageSquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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
            <div className="hidden md:flex flex-col items-center justify-center size-full bg-gray-50 text-gray-400">
                <MessageSquareIcon size={48} />
                <h2 className="mt-4 text-xl font-semibold">Your Messages</h2>
                <p>Select a conversation from the list or search to start typing.</p>
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