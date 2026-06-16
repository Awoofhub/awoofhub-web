import ProfilePageWrapper from "@/components/profile/ProfilePageWrapper";
import { ReactNode, use } from "react";

interface Props {
    params: Promise<{ username: string }>;
    children: ReactNode
}

export default function AboutLayout({ children, params }: Props) {

    const { username } = use(params);

    return (
        <ProfilePageWrapper username={username}>
            {children}
        </ProfilePageWrapper>
    )
} 