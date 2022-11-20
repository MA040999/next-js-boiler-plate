import { z } from "zod";

export const createPostFormSchema = z.object({
    title: z.string().min(1, 'Title cannot be empty'),
    body: z.string().min(1, 'Body cannot be empty'),
    userId: z.number({ invalid_type_error: "User ID must be a number" }).int().positive(),
});

export const editPostFormSchema = createPostFormSchema.merge(
    z.object({
        id: z.number().int().positive(),
    })
);

export type EditPostForm = z.infer<typeof editPostFormSchema>;
export type CreatePostForm = z.infer<typeof createPostFormSchema>;

export type PostForm = EditPostForm & CreatePostForm;