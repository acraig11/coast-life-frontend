import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: "8px 10px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    background: isActive ? "#f0f0f0" : "transparent",
  });

  return (
    <aside
      style={{
        width: 220,
        padding: 16,
        borderRight: "1px solid #ddd",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 12 }}>Menu</div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <NavLink to="/" end style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/about" style={linkStyle}>
          About
        </NavLink>
        <NavLink to="/contact" style={linkStyle}>
          Contact
        </NavLink>
         <NavLink to="/booking" style={linkStyle}>
          Booking
        </NavLink>
        
        <NavLink
        to="/merchandise"
        style={linkStyle}>
        Merchandise
      </NavLink>
<NavLink
        to="/partner"
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
          textDecoration: isActive ? "underline" : "none",
        })}
      >
        Partner
      </NavLink>




      </nav>
    </aside>
  );
}
