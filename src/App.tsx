import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Merchandise from "./pages/Merchandise";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Chat from "./pages/Chat";
import Partner from "./pages/Partner";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/chat" element={<Chat />} />
         <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/partner" element={<Partner />} />
      </Route>
    </Routes>
  );
}

