require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const koaBody = require('koa-body');
const {
	default: graphQLProxy,
	ApiVersion,
} = require('@shopify/koa-shopify-graphql-proxy');
const serve = require('koa-static');

dotenv.config();

const { PORT, NODE_ENV, SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

const port = parseInt(PORT, 10) || 3000;
const dev = NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = new Koa();

const router = new KoaRouter();

// replaceable by a true database
let products = []; // { name: 'test01' }, { name: 'test02' }

router.get('/api/products', async context => {
	try {
		context.body = {
			status: 'success',
			data: products,
		};
	} catch (err) {
		console.log(err);
	}
});

router.post('/api/products', koaBody(), async context => {
	try {
		const body = context.request.body;

		products.push(body);

		context.body = 'Item Added';
		context.res.statusCode = 200;
	} catch (err) {
		console.log(err);
	}
});

router.delete('/api/products', koaBody(), async context => {
	try {
		products = [];

		context.body = 'All Items Deleted';
		context.res.statusCode = 204;
	} catch (err) {
		console.log(err);
	}
});

// ROUTER
server.use(router.allowedMethods());
server.use(router.routes());

app.prepare().then(() => {
	server.use(session(server));
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
			afterAuth(ctx) {
				const { shop, accessToken } = ctx.session;
				ctx.cookies.set('shopOrigin', shop, {
					httpOnly: false,
					secure: true,
					sameSite: 'none',
				});
				ctx.redirect('/');
			},
		})
	);

	server.use(graphQLProxy({ version: ApiVersion.October19 }));
	server.use(verifyRequest());

	server.use(async ctx => {
		await handle(ctx.req, ctx.res);
		ctx.respond = false;
		ctx.res.statusCode = 200;
		return;
	});

	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`);
	});
});
