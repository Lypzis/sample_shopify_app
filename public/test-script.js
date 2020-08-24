console.log(
	'This is coming from the script tag API, code that rooms on the client'
);

// REMINDER: jquery is available at the client website(public) for reasons unknown... yet :D

// const header = $('header.site-header').parent(); //document.querySelector('.site-header').parentNode;

// const makeHeader = data => {
// 	header
// 		.prepend(`<div>${data}</div>`)
// 		.css({ 'background-color': 'orange', 'text-align': 'center' });
// };

const body = $('body');

body.css({
	position: 'relative',
});

const shop = Shopify.shop;

const makeApp = products => {
	const productsTemplate = products
		.map(item => {
			return `
		<a href="/products/${item.handle}" style="display: flex; align-items: center; padding: 20px 10px; border-top: 1px solid #000;">
			<img src=${item.images[0].originalSrc} style="width: 75px; margin-right: 20px;"/>	
			<div style="display: flex; justify-content: space-between; align-items: start; width: 100%;">
				<p>${item.title}</p>
				<p>${item.variants[0].price}</p>
			</div>
		</a>
	`;
		})
		.join(' ');

	const bestSellerContainer = $(
		`<div style="overflow-y: scroll;">
			<h3>Our Best Sellers</h3>
			${productsTemplate}
		</div>`
	).css({
		position: 'fixed',
		'background-color': '#fff',
		border: '1px solid black',
		bottom: '80px',
		right: '25px',
		height: '400px',
		width: '350',
		display: 'none',
	});

	const bestSellerButton = $(`<img />`)
		.attr(
			`src`,
			'https://cdn.shopify.com/s/files/1/0325/3174/2765/files/bestseller-button-trans.png?v=1584741923'
		)
		.css({
			position: 'fixed',
			width: '150px',
			bottom: '20px',
			right: '20px',
			cursor: 'pointer',
		});

	body.append(bestSellerButton);
	body.append(bestSellerContainer);

	bestSellerButton.click(() => {
		bestSellerContainer.slideToggle();
	});
};

// when the theme page loads, this will call the api
// needs cors enabled...
const fetchSomeData = async () => {
	try {
		const res = await fetch(
			'https://6721ec0453f2.ngrok.io/api/products?shop=mysuperreactshop.myshopify.com'
		);

		const resData = await res.json();

		makeApp(resData.data);

		//makeHeader(resData.data);
	} catch (err) {
		console.log(err);
	}
};

fetchSomeData();

//https://cdn.shopify.com/s/files/1/0325/3174/2765/files/bestseller-button-trans.png?v=1584741923
