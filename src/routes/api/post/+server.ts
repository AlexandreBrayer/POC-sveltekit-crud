import api from '$api/index';
import { send } from '$lib/server/helpers/response';

export const GET = async (evt) => api.handle(evt)
export const POST = async (evt) => send(await api.handle(evt), 201);
