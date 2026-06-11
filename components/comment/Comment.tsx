import { useComment } from "@/features/comment/useComment";
import { useWriteComment } from "@/features/comment/useWriteComment";
import { useUser } from "@/features/user/useUser";
import { commentData } from "@/types/comment";
import { Offer } from "@/types/offer";
import { Button, FormControl, FormHelperText, Input, InputGroup, InputRightElement, Spinner } from '@chakra-ui/react';
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CommentContainer from "./CommentContainer";

interface Props {
    offer: Offer;
}

export default function Comment({ offer }: Props) {
    const { writeComment, isPending } = useWriteComment({ id: offer.id })
    const { data: comments, isLoading } = useComment({ id: offer.id })
    const { register, reset, handleSubmit, formState: { errors } } = useForm<commentData>();
    const { data: currentUser } = useUser();
    const router = useRouter();

    const onSubmit = (data: commentData) => {
        if (!currentUser) {
            return router.push('/login');
        }
        writeComment(data)
        reset()
    };

    return (
        <>
            <div>
                <h3 className="font-bold text-lg">
                    Leave a Comment
                </h3>
                <p className="text-gray-400 text-sm mb-5 font-medium">
                    Share your thoughts about this offer with others
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <InputGroup>
                            <Input
                                {...register("comment", {
                                    required: "Comment cannot be empty",
                                    maxLength: { value: 300, message: "Max 300 characters" }
                                })}
                                pr="4.5rem"
                                className="w-full p-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                type='text'
                                placeholder="Comments"

                            />

                            <InputRightElement className="mx-3 my-[5px] text-gray-500">
                                <Button type="submit" className="cursor-pointer bg-orange-600 text-white p-2 rounded-lg" isLoading={isPending}>
                                    <Send size={16} />
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        {errors.comment && (
                            <FormHelperText className="text-red-500 text-left text-xs ml-2 mt-1">
                                {errors.comment.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </form>

            </div>
            <div>
                {isLoading && !comments?.length ? (
                    <Spinner className="mt-5 w-17 h-17 text-primary" />
                ) : !comments?.length ? (
                    <p className="text-center text-gray-500">No Comment found.</p>
                ) : (
                    <CommentContainer comments={comments} />
                )}
            </div>
        </>
    )

}