import { z, type RouteModifier } from 'sveltekit-api';
import { UserSchema } from '$lib/server/prisma/generated/zod/index';
import prisma from '$lib/server/prisma/client';

export const Input = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
});

export const Output = UserSchema;

export const Modifier: RouteModifier = (r) => (r ? { ...r, tags: ['User'] } : r);

export default async function (input: z.infer<typeof Input>): Promise<z.infer<typeof Output>> {
	const user = await prisma.user.createUser(
        input.name,
        input.email
    );
	return user;
}
