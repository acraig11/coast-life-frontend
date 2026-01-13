export default function About() {
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        lineHeight: 1.6,
      }}
    >
      <h1>About</h1>

      {/* ---------- Two-column layout ---------- */}
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          flexWrap: "wrap", // stacks on mobile
        }}
      >
        {/* ---------- LEFT: Google Reviews ---------- */}
        <div
          style={{
            flex: "1 1 360px",
            minWidth: 320,
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <iframe
            title="Google Reviews"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.642221876223!2d-81.16055648941544!3d29.531107642607456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e6eba5a51fe86d%3A0xa9ff89db6d844f11!2sCoast%20Life!5e1!3m2!1sen!2sus!4v1768238542814!5m2!1sen!2sus"

            width="100%"
            height="520"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* ---------- RIGHT: Existing About content ---------- */}
        <div style={{ flex: "2 1 480px" }}>
          <img
            src="https://picsum.photos/seed/about/1200/500"
            alt="Random placeholder"
            style={{ width: "100%", borderRadius: 12, margin: "16px 0" }}
          />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet.
          </p>

          <p>
            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue
            semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra.
          </p>

          <p>
            Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque
            adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi.
          </p>
        </div>
      </div>
    </div>
  );
}
