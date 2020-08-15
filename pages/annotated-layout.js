import React, { Component } from 'react';
import {
	Card,
	Layout,
	Page,
	Button,
	Form,
	Stack,
	FormLayout,
	TextField,
} from '@shopify/polaris';

class AnnotatedLayout extends Component {
	state = {
		discount: '10%',
	};

	handleSubmit = () => {
		this.setState({
			discount: this.state.discount,
		});

		console.log(`Submiting:`);
		console.log(this.state);
	};

	/**
	 * @param field state key parameter to change
	 */
	handleChange = field => {
		return value => this.setState({ [field]: value });
	};

	render() {
		const { discount } = this.state;

		return (
			<Page>
				<Layout>
					<Layout.AnnotatedSection
						title='Default Discount'
						description='Add a product to Sample App, it will automatically be discounted.'>
						<Card sectioned>
							<Form onSubmit={this.handleSubmit}>
								<FormLayout>
									<TextField
										value={discount}
										onChange={this.handleChange('discount')}
										label='Discount percentage'
										type='discount'
									/>
									<Stack distribution='trailing'>
										<Button primary submit>
											Save
										</Button>
									</Stack>
								</FormLayout>
							</Form>
						</Card>
					</Layout.AnnotatedSection>
				</Layout>
			</Page>
		);
	}
}

export default AnnotatedLayout;
