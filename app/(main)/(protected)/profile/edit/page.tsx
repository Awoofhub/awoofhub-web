"use client"

import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { Seo } from "@/components/seo/Seo";
import { useUser } from "@/features/user/useUser";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {

    const router = useRouter();

    const { data: currentUser } = useUser();

    const onSuccess = () => {
        if (!currentUser?.id) return;        

        const redirect = `/profile/${currentUser.id}`;
        router.push(redirect); 
    }

    return (
        <div className="flex bg-white px-5">
            <Seo title="Edit Profile" />
            <EditProfileForm onSuccess={onSuccess} />
        </div>
    )
}