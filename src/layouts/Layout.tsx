import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import ChatWidget from "../components/ChatWidget";

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <NavBar />

      <div style={{ flex: 1, display: "flex" }}>
      

        <main style={{ padding: 24, flex: 1, position: "relative" }}>
          <Outlet />

          {/* ✅ Floating chat icon + popup */}
          <ChatWidget />
        </main>
      </div>

      <footer
        style={{
          textAlign: "center",
          padding: 16,
          borderTop: "1px solid #ddd",
          fontSize: 14,
        }}
      >
        © {new Date().getFullYear()} Coast Life
      </footer>
    </div>
  );
}
