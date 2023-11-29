import { PrismaClient } from '@prisma/client';
import { userExtentions } from './extentions/user';
import { postExtentions } from './extentions/post';

const prismaBase = new PrismaClient();
const prisma = prismaBase.$extends(userExtentions(prismaBase)).$extends(postExtentions(prismaBase));
export default prisma;
