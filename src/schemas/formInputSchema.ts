import { z } from "zod";

export const postFormSchema = z.object({
    title: z.string().min(1, 'Title cannot be empty'),
    body: z.string().min(1, 'Body cannot be empty'),
    userId: z.number({ invalid_type_error: "User ID must be a number" }).int().positive(),
});

export type PostFormInputs = z.infer<typeof postFormSchema>;