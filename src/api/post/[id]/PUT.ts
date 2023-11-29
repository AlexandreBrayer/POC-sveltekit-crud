import { z, type RouteModifier } from 'sveltekit-api';
import { PostSchema } from '$lib/server/prisma/generated/zod/index';
import prisma from '$lib/server/prisma/client';

export const Param = z.object({
	id: z.string().regex(/^\d+$/)
});

export const Output = PostSchema;

export const Input = z.object({
	title: z.string().min(1).max(255),
	content: z.string().min(1).max(65535)
});

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['Post'] } : r);

export default async function (
	param: z.infer<typeof Param & typeof Input>
): Promise<z.infer<typeof Output>> {
	const post = await prisma.post.updatePost(Number(param.id), {
		title: param.title,
		content: param.content
	});
	if (!post) throw new Error('Post not found');

	return post;
}
