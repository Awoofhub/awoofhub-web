import { useAlert } from "@/features/alert/useAlert";
import { useUser } from "@/features/user/useUser";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    contributorId: string;
}

export default function AlertButton({ contributorId }: Props) {

    const router = useRouter();

    const { toggleAlert, isSubscribed } = useAlert(contributorId);
    const { data: currentUser } = useUser();

    const handleWishlistChange = async () => {
        if (!currentUser) {
            return router.push('/login');
        }

        toggleAlert()
    }

    return (
        <button
            onClick={handleWishlistChange}
            className={`cursor-pointer   text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm
            ${isSubscribed
                    ? "bg-[#FDBA6B] border-[orange-600]"
                    : "bg-orange-600"
                }`}
        >

            {isSubscribed ? (
                <>
                    <Bell size={15} /> Alert Set
                </>
            ) : (
                <>
                    <Bell size={15} /> Set Alert 
                </>
            )}
        </button>
    );
}



