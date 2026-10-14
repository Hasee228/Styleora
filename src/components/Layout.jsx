import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main">
        <Suspense fallback={<div className="route-loading" role="status">Loading page…</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
