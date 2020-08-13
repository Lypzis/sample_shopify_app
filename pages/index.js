import { TextStyle, Page, Layout, EmptyState } from '@shopify/polaris';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const Index = props => {
	return (
		<Page>
			<Layout>
				{/* <TextStyle variation='positive'>
					Sample app using React and Next.js
				</TextStyle> */}
				<EmptyState
					heading='Discount your prices temporarily'
					action={{
						content: 'Select products',
						onAction: () => console.log('clicked :D'),
					}}
					image={img}>
					<p>Select products to change their price temporarily.</p>
				</EmptyState>
			</Layout>
		</Page>
	);
};

export default Index;
