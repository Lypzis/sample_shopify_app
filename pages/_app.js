import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/dist/styles.css';

const MyApp = ({ Component, pageProps }) => {
	return (
		<Fragment>
			<Head>
				<title>Sample Shopify App</title>
				<meta charSet='utf-8' />
			</Head>
			<AppProvider il8n={translations}>
				<Component {...pageProps} />
			</AppProvider>
		</Fragment>
	);
};

export default MyApp;
