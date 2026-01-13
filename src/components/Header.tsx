export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        background: "transparent",
        borderBottom: "1px solid #e5e5e5",
        padding: 0,
        margin: 0,
      }}
    >
      <img
        src="/logo2.png" // ← put your logo here
        alt="Coast Life"
        style={{
          width: "25%",
          height: "auto",
          display: "block",
           margin: "0 auto",
        }}
      />
    </header>
  );
}
