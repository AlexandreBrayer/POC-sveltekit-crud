import type { PrismaClient, Post } from '@prisma/client';

export function postExtentions(prisma: PrismaClient) {
	return {
		name: 'post-extentions',
		model: {
			post: {
				async getAllPosts() {
					return await prisma.post.findMany({
						include: {
							author: true
						},
						orderBy: {
							createdAt: 'desc'
						}
					});
				},
				async createPost(title: string, content: string, authorId: number): Promise<Post> {
					return await prisma.post.create({
						data: {
							title,
							content,
							authorId
						}
					});
				},
				async getPost(id: number): Promise<Post | null> {
					return await prisma.post.findUnique({
						where: {
							id
						}
					});
				},
				async updatePost(
					id: number,
					payload: {
						title?: string;
						content?: string;
					}
				): Promise<Post> {
					return await prisma.post.update({
						where: {
							id
						},
						data: payload
					});
				},
				async deletePost(id: number): Promise<Post> {
					return await prisma.post.delete({
						where: {
							id
						}
					});
				}
			}
		}
	};
}
