"use client";
import { Comment } from "@/types/comment";
import { formatDate } from "@/utils/formatDate";
import { capitalizeFirstLetter } from "@/utils/truncate";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReportModal from "../modals/report/ReportModal";

interface Props {
    comment: Comment;
}

export default function CommentCard({ comment }: Props) {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isReportOpen, setIsReportOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("click", handleClickOutSide);
        return () => {
            window.removeEventListener("click", handleClickOutSide);
        };
    }, []);

    const handleClickOutSide = (e: Event) => {
        const target = e.target;
        if (target instanceof Node && dropdownRef.current?.contains(target)) {
            return;
        }
        setOpen(false);
    };

    const toggleDropdown = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
        <div className="rounded-lg flex flex-col gap-1 p-4 bg-white w-full">
            <div className="flex items-center gap-4">
                <Link href={`/profile/${comment.user.username}`} className="flex items-center gap-4">
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

                <div
                    className="flex justify-center cursor-pointer p-2 ml-auto relative"
                    ref={dropdownRef}
                    onClick={() => toggleDropdown()}
                >
                    <BsThreeDotsVertical size={20} />

                    {open && (
                        <div onClick={() => setIsReportOpen(true)} className="absolute right-0 top-full z-50 mt-1 whitespace-nowrap rounded-xl border border-white bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-300 cursor-pointer">
                            Report
                        </div>
                    )}
                </div>

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
        
         <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetType="comment"
          targetId={comment.id}
        />
</>
    );
};