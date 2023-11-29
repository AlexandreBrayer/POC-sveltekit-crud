import { z, type RouteModifier } from 'sveltekit-api';
import { PostSchema } from '$lib/server/prisma/generated/zod/index';
import prisma from '$lib/server/prisma/client';

export const Param = z.object({
	id: z.string().regex(/^\d+$/)
});

export const Output = PostSchema;

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['Post'] } : r);

export default async function (param: z.infer<typeof Param>): Promise<z.infer<typeof Output>> {
	const post = await prisma.post.getPost(Number(param.id));
	if (!post) throw new Error('Post not found');

	return post;
}
