import { z, type RouteModifier } from 'sveltekit-api';
import { UserSchema } from '$lib/server/prisma/generated/zod/index';
import prisma from '$lib/server/prisma/client';

export const Output = z.object({
	users: z.array(UserSchema)
})

export type UserListOutputType = z.infer<typeof Output>;

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['User'] } : r);

export default async function (): Promise<z.infer<typeof Output>> {
	const users = await prisma.user.getAllUsers();
	return {
		users
	};
}
