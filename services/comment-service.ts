import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Comment, commentData } from "@/types/comment";


async function writeComment(id: string, payload: commentData): Promise<ApiResponse<Comment>> {
    const res: ApiResponse<Comment> = await apiClient.post(`/comments/offer/${id}`, payload)

    return res;
}

async function getCommentsForOffer(id: string, page: number, limit: number): Promise<ApiResponse<Comment[]>> {
    const res: ApiResponse<Comment[]> = await apiClient.get(`/comments/offer/${id}`, {
        params: { page, limit },
    })

    return res;
}

const CommentService = {
    writeComment,
    getCommentsForOffer,
};

export default CommentService;

