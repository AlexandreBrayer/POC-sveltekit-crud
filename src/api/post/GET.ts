import { z, type RouteModifier } from 'sveltekit-api';
import { PostSchema, UserSchema } from '$lib/server/prisma/generated/zod/index';
import prisma from '$lib/server/prisma/client';
const PopulatedPostSchema = PostSchema.extend({
	author: UserSchema.optional()
});
export const Output = z.object({
	posts: z.array(PopulatedPostSchema)
});

export type PostListOutputType = z.infer<typeof Output>;

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['Post'] } : r);

export default async function (): Promise<PostListOutputType> {
	const posts = await prisma.post.getAllPosts();
	return { posts };
}
