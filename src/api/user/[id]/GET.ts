import { z, type RouteModifier } from 'sveltekit-api';
import { UserSchema } from '$lib/server/prisma/generated/zod/index';
import prisma from '$lib/server/prisma/client';
export const Output = UserSchema;
export const Param = z.object({
	id: z.string().regex(/^\d+$/)
});

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['User'] } : r);

export default async function (input: z.infer<typeof Param>): Promise<z.infer<typeof Output>> {
	const user = await prisma.user.getUser(Number(input.id));
	if (!user) throw new Error('User not found');

	return user;
}
