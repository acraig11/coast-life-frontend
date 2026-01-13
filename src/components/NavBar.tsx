import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 24,
        padding: 16,
      }}
    >
      <NavLink
        to="/"
        end
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
          textDecoration: isActive ? "underline" : "none",
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
          textDecoration: isActive ? "underline" : "none",
        })}
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
          textDecoration: isActive ? "underline" : "none",
        })}
      >
        Contact
      </NavLink>

      <NavLink
        to="/booking"
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
          textDecoration: isActive ? "underline" : "none",
        })}
      >
        Booking
      </NavLink>

<NavLink
        to="/merchandise"
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
          textDecoration: isActive ? "underline" : "none",
        })}
      >
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
  );
}
