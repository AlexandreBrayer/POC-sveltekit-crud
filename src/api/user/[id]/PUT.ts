import { z, type RouteModifier } from 'sveltekit-api';
import { UserSchema } from '$lib/server/prisma/generated/zod/index';
import prisma from '$lib/server/prisma/client';
export const Input = z.object({
	name: z.string().min(1).max(255).optional(),
	email: z.string().email().optional()
});

export const Output = UserSchema;

export const Param = z.object({
    id: z.string().regex(/^\d+$/)
});

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['User'] } : r);

export default async function (
	input: z.infer<typeof Input & typeof Param>,
): Promise<z.infer<typeof Output>> {
	const user = await prisma.user.updateUser(
	    Number(input.id),
	    {
	        name: input.name,
	        email: input.email
	    }

	);
	return user;
}
