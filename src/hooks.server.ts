import type { Handle } from '@sveltejs/kit';

export const corsHeaders = {
	'Access-Control-Allow-Credentials': 'true',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST',
	'Access-Control-Allow-Headers':
		'authorization, x-client-info, apikey, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
};

export const handle: Handle = async ({ event, resolve }) => {
	if (event.request.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	const response = await resolve(event);
	if (event.url.pathname.includes('/api')) {
		response.headers.set('Access-Control-Allow-Origin', 'https://youtube.com');
		response.headers.set('Access-Control-Allow-Credentials', 'false');
		response.headers.set('Access-Control-Allow-Methods', 'OPTIONS, POST');
		response.headers.set(
			'Access-Control-Allow-Headers',
			'Content-Type, Authorization, X-Requested-With, X-HTTP-Method-Override, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
		);
		response.headers.set('Access-Control-Max-Age', '86400');
	}
	return response;
};
