import type { PrismaClient, User } from '@prisma/client';

export function userExtentions(prisma: PrismaClient) {
	return {
		name: 'user-extentions',
		model: {
			user: {
				async getAllUsers(): Promise<User[]> {
					return await prisma.user.findMany();
				},
				async createUser(name: string, email: string): Promise<User> {
					return await prisma.user.create({
						data: {
							name,
							email
						}
					});
				},
				async getUser(id: number): Promise<User | null> {
					return await prisma.user.findUnique({
						where: {
							id
						}
					});
				},
				async updateUser(
					id: number,
					payload: {
						name?: string;
						email?: string;
					}
				): Promise<User> {
					return await prisma.user.update({
						where: {
							id
						},
						data: payload
					});
				},
				async deleteUser(id: number): Promise<User> {
					return await prisma.user.delete({
						where: {
							id
						}
					});
				}
			}
		}
	};
}
