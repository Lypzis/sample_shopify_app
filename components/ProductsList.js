import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
	Card,
	Button,
	ResourceList,
	Stack,
	TextStyle,
	Thumbnail,
} from '@shopify/polaris';
import store from 'store-js';

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

const ProductsList = props => {
	const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
		variables: { ids: props.products },
	});

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	if (data) console.log(data);

	return (
		<Card>
			<ResourceList
				showHeader
				resourceName={{
					singular: 'Product',
					plural: 'Products',
				}}
				items={data.nodes}
				renderItem={(item, id, index) => {
					let src = '';
					let alt = '';
					if (item.images.edges[0]) {
						src = item.images.edges[0].node.originalSrc;
						alt = item.images.edges[0].node.altText;
					}

					const media = <Thumbnail source={src} alt={alt} />;

					const price = item.variants.edges[0].node.price;

					return (
						<ResourceList.Item
							id={item.id}
							media={media}
							accessibilityLabel={`View Details for ${item.title}`}>
							<Stack>
								<Stack.Item fill>
									<h3>
										<TextStyle variation='strong'>
											{item.title}
										</TextStyle>
									</h3>
								</Stack.Item>
								<Stack.Item>
									<p>${price}</p>
								</Stack.Item>
							</Stack>
						</ResourceList.Item>
					);
				}}
			/>
		</Card>
	);
};

export default ProductsList;
