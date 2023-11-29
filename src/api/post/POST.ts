import { z, type RouteModifier } from 'sveltekit-api';
import { PostSchema } from '$lib/server/prisma/generated/zod/index';
import prisma from '$lib/server/prisma/client';

export const Input = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(255),
    authorId: z.number()
});
export const Output = PostSchema;
export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['Post'] } : r);

export default async function (input: z.infer<typeof Input>): Promise<z.infer<typeof Output>> {
    const post = await prisma.post.createPost(
        input.title,
        input.content,
        input.authorId
    );
    return post;
}
