require('dotenv').config();

const webpack = require('webpack');

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const storeUrl = JSON.stringify(process.env.STORE_URL);

module.exports = {
	webpack: config => {
		const env = { API_KEY: apiKey, STORE_URL: storeUrl };
		config.plugins.push(new webpack.DefinePlugin(env));

		return config;
	},
};
