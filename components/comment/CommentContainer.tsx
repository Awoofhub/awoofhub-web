import { useState, useEffect } from "react";
import Link from 'next/link';
import { Comment } from "@/types/comment";
import { formatDate } from "@/utils/formatDate";
import { capitalizeFirstLetter } from "@/utils/truncate";
import Image from 'next/image';
import { getUserByIdService } from '@/services/user-service';

interface Props {
    comments: Comment[];
}

export default function CommentContainer({ comments }: Props) {
    const INITIAL_COUNT = 3;
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const visibleComments = comments.slice(0, visibleCount);
    const [userMap, setUserMap] = useState<Record<string,string>>({});

    const handleShowMore = () => {
        if (visibleCount >= comments.length) {
            setVisibleCount(INITIAL_COUNT);
            return;
        }
        setVisibleCount((prev) => Math.min(prev + INITIAL_COUNT, comments.length));
    };

    // Fetch usernames for commenters where username is not provided
    useEffect(() => {
        const missingIds = Array.from(new Set(comments
            .filter(c => !c.user.username && !userMap[c.user.id])
            .map(c => c.user.id)));

        if (!missingIds.length) return;

        missingIds.forEach(async (id) => {
            try {
                const res = await getUserByIdService(id);
                if (res?.data?.username) {
                    setUserMap(prev => ({ ...prev, [id]: res.data.username }));
                }
            } catch {
                // ignore failures
            }
        });
    }, [comments, userMap]);

    return (
        <>
            <div className="bg-gray-100 rounded-lg overflow-y-auto" style={{ maxHeight: 350 }}>
                <div className="space-y-0.5">
                    {visibleComments.map(comment => (

                        <div key={comment.id} className="rounded-lg flex flex-col gap-1 p-4 bg-white max-w-2xl">
                            {/* Header Section */}
                            <div className="flex items-center gap-4">
                                <Link href={`/profile/${comment.user.username ?? userMap[comment.user.id] ?? comment.user.id}`} target="_blank" className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        {comment.user.profileImageUrl ? (
                                            <Image
                                                width={40}
                                                height={40}
                                                src={comment.user.profileImageUrl}
                                                alt={comment.user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="bg-green-500 text-white flex items-center justify-center w-full h-full">
                                                <span className="font-semibold">{capitalizeFirstLetter(comment.user.name)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <span className="font-medium text-gray-900 text-lg hover:underline">
                                        {comment.user.name}
                                    </span>
                                </Link>
                            </div>

                            {/* Meta Section */}
                            <div className="text-gray-400 text-sm">
                                {formatDate(comment.createdAt)}
                            </div>

                            {/* Body Section */}
                            <div className="text-gray-800 leading-relaxed text-base">
                                {comment.comment}
                            </div>
                        </div>

                    ))}
                </div>
            </div>

            {comments.length > INITIAL_COUNT && (
                <div className="flex justify-center mt-3 flex-col gap-2">
                    <div className="border-b border-gray-300 w-full" />
                    <button
                        type="button"
                        onClick={handleShowMore}
                        className="text-sm font-semibold text-primary hover:underline cursor-pointer"
                    >
                        {visibleCount >= comments.length ? 'Show less' : `See more Comments`}
                    </button>
                </div>
            )}
        </>
    );
};