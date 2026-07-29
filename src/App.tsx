import { SiteContentProvider } from "./lib/SiteContentContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Toolchain from "./components/Toolchain";
import Deployments from "./components/Deployments";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Admin from "./admin/Admin";

function Site() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Toolchain />
        <Deployments />
        <Booking />
      </main>
      <Contact />
    </div>
  );
}

export default function App() {
  const isAdmin = window.location.pathname.startsWith("/admin");

  return (
    <SiteContentProvider>
      {isAdmin ? <Admin /> : <Site />}
    </SiteContentProvider>
  );
}
