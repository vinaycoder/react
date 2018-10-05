import sm from 'sitemap';
import Request from 'request';

async function getOrderDetails(orderId){
	var orders={};
await fetch(`https://indiarush.com/irapi/customer/getSalesOrderInfo/?order_id=${orderId}&version=3.95`)
    .then(result => {
      return result.json();
    })
    .then(jsonResult => {
		 orders=jsonResult;
    });
		return orders;
}

async function payUPostData(req, res) {
	const OrderId=req.body.txnid;
	// const OrderId=101040678;
	if(OrderId=='')
	{
		var errorMessage='Something went wrong with your order id. Please try again for payment.'
		return res.redirect('/checkout');
		return false;
	}
	else {

     const ordersDetails = await getOrderDetails(OrderId);

		 if(req.body.status === 'failure')
		 {
			 var errorMessage='Something went wrong with your order id. Please try again for payment.'
				return res.redirect('/checkout');
				return false;
		 }

		 if(req.body.txnid != ordersDetails.increment_id)
		 {
			 var errorMessage='Something went wrong with your order id. Please try again for payment.'
			 	return res.redirect('/checkout');
				return false;
		 }
		 if(parseInt(req.body.amount) != parseInt(ordersDetails.grand_total))
		 {
			 var errorMessage='Something went wrong with your order id. Please try again for payment.'
				return res.redirect('/checkout');
				return false;
		 }

    /* for successfull transaction*/
		 if(req.body.status === 'success')
		 {
			 var errorMessage='Something went wrong with your order id. Please try again for payment.'

			 if(parseInt(req.body.amount) == parseInt(ordersDetails.grand_total))
			 {
				 var errorMessage='Your Order is successfully placed'
				 res.cookie('currentOrderId',OrderId,{ path: '/' });
				 res.redirect('/checkout-success');
			 }
			 else {
				 var errorMessage='Something went wrong with your order id. Please try again for payment.'
					return res.redirect('/checkout');
					return false;
			 }

		 }

	}

	res.end();
}


export default payUPostData;
