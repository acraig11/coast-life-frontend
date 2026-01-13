import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();

// ✅ Allow your frontend dev server to call this backend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
  })
);

app.use(express.json());

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ Missing STRIPE_SECRET_KEY in stripe-backend/.env");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --------------------
// Basic endpoints
// --------------------
app.get("/api/health", (_, res) => {
  res.json({ ok: true });
});

// --------------------
// Success / Cancel pages (hosted by backend)
// Stripe will redirect here after checkout.
// --------------------
app.get("/success", (req, res) => {
  const sessionId = req.query.session_id;

  res.setHeader("Content-Type", "text/html");
  res.end(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Success</title>
      </head>
      <body style="font-family: system-ui, -apple-system, Segoe UI, Roboto; padding: 24px;">
        <h1>Payment success ✅</h1>
        <p>Thanks for your order.</p>
        ${
          sessionId
            ? `<p>Session: <code style="background:#f3f3f3;padding:2px 6px;border-radius:6px;">${sessionId}</code></p>`
            : ""
        }
        <p><a href="${process.env.APP_URL || "http://localhost:5173"}">Back to shop</a></p>
      </body>
    </html>
  `);
});

app.get("/cancel", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Canceled</title>
      </head>
      <body style="font-family: system-ui, -apple-system, Segoe UI, Roboto; padding: 24px;">
        <h1>Checkout canceled</h1>
        <p>No charge was made.</p>
        <p><a href="${process.env.APP_URL || "http://localhost:5173"}">Return to shop</a></p>
      </body>
    </html>
  `);
});

// (Optional) retrieve a session from the success page later if you want
app.get("/api/checkout-session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    res.json({
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    res.status(400).json({ error: err?.message ?? "Unable to retrieve session" });
  }
});

// --------------------
// Create Checkout Session
// Frontend POSTs { cartItems: [...] } to this endpoint
// --------------------
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty." });
    }

    // Basic validation (matches your cart structure)
    for (const item of cartItems) {
      if (!item?.id || typeof item.price !== "number" || !Number.isFinite(item.price) || !item?.qty) {
        return res.status(400).json({ error: "Invalid cart item. Expect {id, price, qty, title?, imageUrl?}." });
      }
    }

    const line_items = cartItems.map((item) => ({
      quantity: item.qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price * 100), // cents
        product_data: {
          name: item.title ?? item.id,
          images: item.imageUrl ? [item.imageUrl] : undefined,
          metadata: { itemId: item.id },
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,

      // ✅ Redirect to backend success/cancel pages
      success_url: `http://localhost:4242/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:4242/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);

    const message =
      err?.raw?.message ||
      err?.message ||
      "Unknown Stripe error creating checkout session";

    res.status(500).json({ error: message });
  }
});

app.listen(4242, () => {
  console.log("✅ Stripe backend running at http://localhost:4242");
});
