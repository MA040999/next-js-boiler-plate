import { z } from "zod";

export const postFormSchema = z.object({
    title: z.string().min(1, 'Title cannot be empty'),
    body: z.string().min(1, 'Body cannot be empty'),
    userId: z.number().min(1, { message: 'Invalid user ID' }),
});

export type postFormInputs = z.infer<typeof postFormSchema>;