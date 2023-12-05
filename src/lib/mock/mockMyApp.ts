import prisma from '$lib/server/prisma/client';
import { UserSchema, PostSchema } from '$lib/server/prisma/generated/zod/index';

import { generateMock } from '@anatine/zod-mock';
const USER_SIZE = 10;
const POST_SIZE = 25;

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

async function mockUsers() {
	const users = [...Array(USER_SIZE)].map(() => generateMock(UserSchema));
	await Promise.all(
		users.map(async (user, index) => {
			await prisma.user.createUser(user.name, user.email);
			console.log(`Created user number ${index + 1}`);
		})
	);
}

async function mockPosts() {
	const posts = [...Array(POST_SIZE)].map(() => generateMock(PostSchema));
	await Promise.all(
		posts.map(async (post, index) => {
			await prisma.post.createPost(post.title, post.content, random(1, USER_SIZE));
			console.log(`Created post number ${index + 1}`);
		})
	);
}

await mockUsers();
await mockPosts();
