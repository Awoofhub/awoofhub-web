import ProfilePageWrapper from "@/components/profile/ProfilePageWrapper";
import { ReactNode, use } from "react";

interface Props {
    params: Promise<{ userId: string }>;
    children: ReactNode
}

export default function AboutLayout({ children, params }: Props) {

    const { userId } = use(params);

    return (
        <ProfilePageWrapper userId={userId}>
            {children}
        </ProfilePageWrapper>
    )
} 