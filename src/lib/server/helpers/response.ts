export const send = (response: Response, status = 200, headers = null) => {
    return new Response(response.body, { status, headers: headers || response.headers });
};
