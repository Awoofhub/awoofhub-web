"use client";
import { Comment } from "@/types/comment";
import { Spinner } from "@chakra-ui/react";
import CommentCard from "./CommentCard";

interface Props {
    comments: Comment[];
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
}

export default function CommentContainer({ comments, hasNextPage, fetchNextPage, isFetchingNextPage, }: Props) {


    return (
        <>
            <div className="bg-gray-100 rounded-lg overflow-y-auto">
                <div className="space-y-0.5">
                    {comments.map(comment => (
                        <CommentCard comment={comment} key={comment.id} />
                    ))}
                </div>
            </div>

            {isFetchingNextPage ? (
                <div className="flex justify-center mt-5 w-full" >
                    <Spinner
                        className="w-10 h-10 text-primary"
                        data-testid="loading"
                    />
                </div>
            ) : hasNextPage ? (
                <div className="flex justify-center mt-3 flex-col gap-2">
                    <div className="border-b border-gray-300 w-full" />

                    <button
                        type="button"
                        onClick={fetchNextPage}
                        className="text-sm font-semibold text-primary hover:underline cursor-pointer"
                    >
                        See more Comments
                    </button>
                </div>
            ) : null}
        </>
    );
};