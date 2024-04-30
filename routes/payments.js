const { Router } = require('express');
const router = Router();
const Ticket = require('../model/ticket');
const Monument = require('../model/monument');
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
const Booking_Mail = require('../mailing/main');

router.post('/create-order', isLoggedIn, async (req, res) => {
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
  try {
    const {
      order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      monumentName,
      monumentPlace,
      childrenCount,
      indianCount,
      foreignerCount,
      date,
      issuer,
      ticket_id
    } = req.body;
    const { currentUser } = req;
    const email = currentUser.email;
    const resp = validatePaymentVerification(
      {
        order_id,
        payment_id: razorpay_payment_id
      },
      razorpay_signature,
      process.env.RAZORPAY_API_KEY_SECRET
    );
    console.log(resp);
    if (resp) {
      const ticket = new Ticket({
        id: ticket_id,
        totalPrice: amount,
        monumentName,
        monumentPlace,
        childrenCount,
        indianCount,
        foreignerCount,
        date,
        issuer,
        issuer_account: currentUser
      });
      currentUser.trips.push(ticket);
      const monument = await Monument.findOne({ name: monumentName });

      monument.tickets.push(ticket);
      // try {
      //   Booking_Mail(email, monument.about, ticket_id);
      // } catch (err) {
      //   console.log(err.message);
      // }
      await currentUser.save();
      await ticket.save();
      await monument.save();
    }
    res.send(resp);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message
    });
  }
});

module.exports = router;
