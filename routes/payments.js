const { Router } = require('express');
const router = Router();
const Razorpay = require('razorpay');
const shortid = require('shortid');
const {
  validatePaymentVerification
} = require('razorpay/dist/utils/razorpay-utils');
const { isLoggedIn } = require('../middleware.utils');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID,
  key_secret: process.env.RAZORPAY_API_KEY_SECRET
});

router.post('/create-order', isLoggedIn, async (req, res) => {
  console.log(req.currentUser);
  const { amount, monumentName, indianCount, foreignerCount, childrenCount } =
    req.body;
  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: shortid.generate(),
    notes: {
      monumentName,
      indianCount,
      foreignerCount,
      childrenCount
    }
  };
  const response = await razorpay.orders.create(options);
  res.status(200).send(response);
});

router.post('/verify-payment', isLoggedIn, async (req, res) => {
  const { order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const resp = validatePaymentVerification(
    {
      order_id,
      payment_id: razorpay_payment_id
    },
    razorpay_signature,
    process.env.RAZORPAY_API_KEY_SECRET
  );
  res.send(resp);
});

module.exports = router;
