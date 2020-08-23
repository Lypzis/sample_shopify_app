import React, { useState } from 'react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
//import store from 'store-js'; Just in case you want to store cookies
import axios from 'axios';

import ProductsList from '../components/ProductsList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const Index = props => {
	const [modal, setModal] = useState(false);
	const [emptyState, setEmptyState] = useState([]); //store.get('ids')

	/**
	 * Store ids from products selected.
	 * @param {Object} resources
	 */
	const handleSelection = resources => {
		const products = resources.selection;
		const idsFromResources = resources.selection.map(product => product.id);

		setModal(false);
		setEmptyState(idsFromResources);
		//store.set('ids', idsFromResources);

		//console.log('these are the product ids', store.get('ids'));

		// reset selected ones from products array (necessary ????)
		deleteAllProductsFromApi();

		products.map(getProductFromApi);
	};

	const deleteAllProductsFromApi = async () => {
		try {
			await axios.delete('/api/products');
		} catch (err) {
			console.log(err);
		}
	};

	const getProductFromApi = async product => {
		// inside of /pages/ folder, it is only necessary the endpoint of the url
		try {
			const resData = await axios.post('/api/products', product);

			//console.log(resData);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Page>
			<TitleBar
				primaryAction={{
					content: 'Select new products',
					onAction: () => setModal(true),
				}}
			/>
			<ResourcePicker
				resourceType='Product'
				showVariants={false}
				open={modal}
				onCancel={() => setModal(false)}
				onSelection={handleSelection}
			/>
			{emptyState.length === 0 ? (
				<Layout>
					<EmptyState
						heading='Discount your prices temporarily'
						action={{
							content: 'Select products',
							onAction: () => setModal(true),
						}}
						image={img}>
						<p>
							Select products to change their price temporarily.
						</p>
					</EmptyState>
				</Layout>
			) : (
				<ProductsList products={emptyState} />
			)}
		</Page>
	);
};

export default Index;
