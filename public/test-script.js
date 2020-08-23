console.log(
	'This is coming from the script tag API, code that rooms on the client'
);

const header = $('header.site-header').parent(); //document.querySelector('.site-header').parentNode;

const makeHeader = data => {
	header
		.prepend(`<div>${data}</div>`)
		.css({ 'background-color': 'orange', 'text-align': 'center' });
};

const fetchSomeData = async () => {
	try {
		const res = await fetch(
			'https://6cb9557c3035.ngrok.io/api/products?shop=mysuperreactshop.myshopify.com'
		);

		const resData = await res.json();

		//makeHeader(resData.data);

		console.log(resData);
	} catch (err) {
		console.log(err);
	}
};

fetchSomeData();
