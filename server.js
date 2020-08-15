require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const {
	default: graphQLProxy,
	ApiVersion,
} = require('@shopify/koa-shopify-graphql-proxy');

dotenv.config();
const { PORT, NODE_ENV, SHOPIFY_API_KEY, SHOPIFY_API_SECRET_KEY } = process.env;

const port = parseInt(PORT, 10) || 3000;
const dev = NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = new Koa();
	server.use(session({ secure: true, sameSite: 'none' }, server));
	server.keys = [SHOPIFY_API_SECRET_KEY];

	server.use(
		createShopifyAuth({
			apiKey: SHOPIFY_API_KEY,
			secret: SHOPIFY_API_SECRET_KEY,
			scopes: [
				'read_products',
				'write_products',
				'read_script_tags',
				'write_script_tags',
			],
			afterAuth(context) {
				const { shop, accessToken } = context.session;
				context.cookies.set('shopOrigin', shop, {
					httpOnly: false,
					secure: true,
					sameSite: 'none',
				});

				context.redirect('/');
			},
		})
	);

	server.use(graphQLProxy({ version: ApiVersion.July20 }));
	server.use(verifyRequest());
	server.use(async context => {
		await handle(context.req, context.res);

		context.respond = false;
		context.res.statusCode = 200;

		return;
	});

	server.listen(port, () =>
		console.log(`Server running on http://localhost:${port}`)
	);
});
