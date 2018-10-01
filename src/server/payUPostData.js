import sm from 'sitemap';
import winston from 'winston';
import api from './api';
import qs from 'querystring'


const payUPostData = (req, res, next) => {

	console.log(req.body.key)	;

  console.log(getOrderDetails(101040643));
  // console.log(getOrderDetails(req.body.txnid));
	res.end();
};

const getOrderDetails=(orderId) => {
  fetch(`https://indiarush.com/irapi/customer/getSalesOrderInfo/?order_id=${orderId}&version=3.95`)
    .then(result => {
      return result.json();
    })
    .then(jsonResult => {
     return jsonResult;
    });
};
export default payUPostData;
