import { useState } from "react";
import contact1 from "../assets/photo1.jpeg";
import contact2 from "../assets/photo2.jpeg";
import contact3 from "../assets/photo3.jpeg";

const images = [contact1, contact2, contact3];



export default function Contact() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  const next = () =>
    setIndex((i) => (i + 1) % images.length);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", lineHeight: 1.6 }}>
      <h1>Contact</h1>

      {/* Image Carousel */}
      <div style={{ position: "relative", margin: "16px 0" }}>
        <img
          src={images[index]}
          alt="Contact carousel"
          style={{
            width: "100%",
            borderRadius: 12,
            display: "block",
          }}
        />

        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous image"
          style={navButtonStyle("left")}
        >
          ‹
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next image"
          style={navButtonStyle("right")}
        >
          ›
        </button>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "1px solid white",
                background: i === index ? "white" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Amet risus nullam
        eget felis eget nunc lobortis mattis.
      </p>

      <p>
        Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida
        hendrerit. Quis lectus nulla at volutpat diam ut venenatis tellus in.
        Vitae suscipit tellus mauris a diam maecenas sed.
      </p>

      <p>
        Egestas sed tempus urna et pharetra pharetra massa massa. At lectus urna
        duis convallis convallis tellus id interdum velit.
      </p>
    </div>
  );
}

function navButtonStyle(side: "left" | "right") {
  return {
    position: "absolute" as const,
    top: "50%",
    [side]: 12,
    transform: "translateY(-50%)",
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.7)",
    background: "rgba(0,0,0,0.35)",
    color: "white",
    fontSize: 24,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
