import { z, type RouteModifier } from 'sveltekit-api';
import { PostSchema } from '$lib/server/prisma/generated/zod/index';
import prisma from '$lib/server/prisma/client';
export const Output = z.object({
	posts: z.array(PostSchema)
});

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['Post'] } : r);

export default async function (): Promise<z.infer<typeof Output>> {
    const posts = await prisma.post.getAllPosts();
    return { posts };
}
