import { Router } from "express";
import {
  addConcert,
  registerForConcert,
  allUpcomingConcerts,
  myAttendedConcerts,
  concertDetails,
  myUpcomingConcerts,
  filterConcerts,
  getRegisteredPeople
} from "../controllers/concert.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51QJ5RTAI8xVNoO7T66S6lNNc7Ts96kL6ehGHkn31IUHGVu9jlwk7DsdrRBwMzL77oEtRtpy0YAYGxEn2J5Rgg1Rz00vp8Sm9nI');



const router = Router();

router.post(
  "/add-concert",
  verifyJwt,
  verifyAdmin,
  upload.single("media"),
  addConcert
);


router.route("/upcoming-concert").post(allUpcomingConcerts);
router.post("/register-for-concert/:Id", verifyJwt, registerForConcert);
router.post("/my-attended-concerts", verifyJwt, myAttendedConcerts);
router.route("/concert/:Id").post(concertDetails);
router.route("/my-upcoming-concerts").post(verifyJwt, myUpcomingConcerts);
router.route("/filterConcerts").post(verifyJwt, filterConcerts)
router.get("/my-attended-concerts", verifyJwt, myAttendedConcerts);
router.route("/concert/:Id").post(concertDetails);
router.route("/get-friends/:id").post(verifyJwt,getRegisteredPeople)
router.post("/create-checkout-session", async (req, res) => {
  const product = req.body;
  console.log(product);

  const line_items = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: product.concert.artist,
        },
        unit_amount: product.concert.ticketPrice * 100,
      },
      quantity: 1,
    },
  ];

  console.log(line_items) ;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types :["card"] ,
      line_items: line_items,
      mode: 'payment',
      success_url: 'https://7ad3-2409-40e3-2000-2254-799c-d3f9-ab9a-336b.ngrok-free.app/profile',
      cancel_url: 'https://7ad3-2409-40e3-2000-2254-799c-d3f9-ab9a-336b.ngrok-free.app/profile',
    });
    
    // console.log(session)

    return res.status(200).json({
      success: true,
      id : session.id ,
      message: "Payment Succesfull",
      session_url:session.url ,
    });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});


export default router;
