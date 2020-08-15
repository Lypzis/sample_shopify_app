import React, { useState, useEffect } from 'react';
import { TextStyle, Page, Layout, EmptyState } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import store from 'store';

import ProductsList from '../components/ProductsList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const Index = props => {
	const [modal, setModal] = useState(false);
	const [emptyState, setEmptyState] = useState(store.get('ids'));

	useEffect(() => {
		console.log(emptyState);
	}, []);

	/**
	 * Store ids from products selected.
	 * @param {Object} resources
	 */
	const handleSelection = resources => {
		const idsFromResources = resources.selection.map(product => product.id);

		setModal(false);
		store.set('ids', idsFromResources);

		console.log('these are the product ids', store.get('ids'));
	};

	return (
		<Page>
			<ResourcePicker
				resourceType='Product'
				showVariants={false}
				open={modal}
				onCancel={() => setModal(false)}
				onSelection={handleSelection}
			/>
			<Layout>
				{!emptyState ? (
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
				) : (
					<ProductsList />
				)}
			</Layout>
		</Page>
	);
};

export default Index;
