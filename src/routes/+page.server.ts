import { z } from 'zod';
import type { PageServerLoad } from './post/$types';
import type { PostListOutputType } from '$api/post/GET';
import type { UserListOutputType } from '$api/user/GET';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import prisma from '$lib/server/prisma/client';

const schema = z.object({
	title: z.string().min(2).max(20),
	content: z.string().min(2).max(255),
	authorId: z.string()
});

export const load = (async ({ fetch }) => {
	const form = await superValidate(schema);
	const posts = await fetch(`/api/post`);
	const postsData: PostListOutputType = await posts.json();
	const users = await fetch(`/api/user`);
	const usersData: UserListOutputType = await users.json();

	return {
		posts: postsData.posts,
		users: usersData.users,
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	createPost: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await prisma.post.create({
				data: {
					title: form.data.title,
					content: form.data.content,
					authorId: parseInt(form.data.authorId)
				}
			});
		} catch (e) {
			console.error(e);
			return fail(500, { form });
		}

		return { form };
	}
};
