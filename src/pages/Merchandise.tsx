import { useState } from "react";

type Item = {
  id: string;
  price: number;
  imageUrl: string;
  title?: string;
};

type CartItem = Item & {
  qty: number;
};

const items: Item[] = [
  { id: "CL-1001", price: 19.99, imageUrl: "https://picsum.photos/seed/item1/600/400", title: "Coast Tee" },
  { id: "CL-1002", price: 24.5, imageUrl: "https://picsum.photos/seed/item2/600/400", title: "Beach Hat" },
  { id: "CL-1003", price: 12.0, imageUrl: "https://picsum.photos/seed/item3/600/400", title: "Sticker Pack" },
  { id: "CL-1004", price: 39.0, imageUrl: "https://picsum.photos/seed/item4/600/400", title: "Hoodie" },
  { id: "CL-1005", price: 9.99, imageUrl: "https://picsum.photos/seed/item5/600/400", title: "Keychain" },
  { id: "CL-1006", price: 14.75, imageUrl: "https://picsum.photos/seed/item6/600/400", title: "Mug" },
];

export default function Merchandise() {
  const [cart, setCart] = useState<CartItem[]>([]);
const checkout = async () => {
  const res = await fetch("http://localhost:4242/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems: cart }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data?.error ?? "Checkout failed");
    return;
  }

  window.location.href = data.url; // redirect to Stripe Checkout
};

  const addToCart = (item: Item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
      {/* PRODUCT GRID */}
      <div>
        <h1>Merchandise</h1>
        <p style={{ marginTop: 6, opacity: 0.8 }}>Featured items</p>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: "100%", height: 140, objectFit: "cover" }}
              />

              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 700 }}>{item.title}</div>

                <div style={{ marginTop: 10, fontSize: 16, fontWeight: 700 }}>
                  ${item.price.toFixed(2)}
                </div>

                <button
                  style={{
                    marginTop: 12,
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #222",
                    background: "#222",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CART */}
      <aside
        style={{
          position: "sticky",
          top: 20,
          height: "fit-content",
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 16,
          background: "#fafafa",
        }}
      >
        <h3>Cart</h3>

        {cart.length === 0 && (
          <div style={{ opacity: 0.6, marginTop: 12 }}>Your cart is empty</div>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{item.title}</div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>
                ${item.price.toFixed(2)} × {item.qty}
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              −
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <hr style={{ margin: "16px 0" }} />
            <div style={{ fontWeight: 700, fontSize: 16 }}>
              Total: ${total.toFixed(2)}
            </div>

            <button onClick={checkout}>
  Checkout
</button>

          </>
        )}
      </aside>
    </div>
  );
}
