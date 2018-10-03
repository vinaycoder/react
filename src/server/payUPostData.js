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
	// const OrderId=req.body.txnid;
	const OrderId=101040643;
	if(OrderId=='')
	{
		var errorMessage='Something went wrong with your order id. Please try again for payment.'
		return res.redirect('/checkout');
		return false;
	}
	else {
		/*
     let ordersDetails = await getOrderDetails(OrderId);
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
		 */
		 res.cookie('currentOrderId',OrderId,{ path: '/' });
		 res.redirect('/checkout-success');

	}


  console.log(ordersDetails);
	console.log('testing 2');
  // console.log(getOrderDetails(req.body.txnid));
	// currentOrder(ordersDetails);
	// return res.redirect('/checkout-success');
	res.end();
}


export default payUPostData;
