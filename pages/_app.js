import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from 'js-cookie';
import translations from '@shopify/polaris/locales/en.json';
import {
	ApolloProvider,
	createHttpLink,
	ApolloClient,
	InMemoryCache,
} from '@apollo/client';

import '@shopify/polaris/dist/styles.css';

const cache = new InMemoryCache();
const link = createHttpLink({
	uri: 'https://cc150bd15dba.ngrok.io', // change this to next.config.js later on
});

const client = new ApolloClient({
	cache: cache,
	link: link,
});

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		const config = {
			apiKey: API_KEY,
			shopOrigin: Cookies.get('shopOrigin'),
			forceRedirect: true,
		};

		return (
			<Fragment>
				<Head>
					<title>Sample Shopify App</title>
					<meta charSet='utf-8' />
				</Head>
				<Provider config={config}>
					<AppProvider il8n={translations}>
						<ApolloProvider client={client}>
							<Component {...pageProps} />
						</ApolloProvider>
					</AppProvider>
				</Provider>
			</Fragment>
		);
	}
}

export default MyApp;
