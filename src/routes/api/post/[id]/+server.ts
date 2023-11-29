import api from '$api/index';
import { send } from '$lib/server/helpers/response';

export const GET = async (evt) => api.handle(evt)
export const PUT = async (evt) => send(await api.handle(evt), 201);
export const DELETE = async (evt) => send(await api.handle(evt), 201);
