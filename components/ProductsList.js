import React, { memo, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
	Card,
	ResourceList,
	Stack,
	TextStyle,
	Thumbnail,
} from '@shopify/polaris';
import store from 'store';

const GET_PRODUCTS_BY_ID = gql`
	query getProducts($ids: [ID!]!) {
		nodes(ids: $ids) {
			... on Product {
				title
				handle
				id
				images(first: 1) {
					edges {
						node {
							originalSrc
							altText
						}
					}
				}
				variants(first: 1) {
					edges {
						node {
							price
							id
						}
					}
				}
			}
		}
	}
`;

function ProductsList() {
	const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
		variables: { ids: store.get('ids') },
	});

	if (loading) return <p>Loading...</p>;

	if (error) return <p>{error.message}</p>;

	return (
		<div>
			<h1>Hello From Products List</h1>
		</div>
	);
}

export default ProductsList;
