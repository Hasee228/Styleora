import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import InfoPage from "./pages/InfoPage";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const NewArrivals = lazy(() => import("./pages/NewArrivals"));
const CategoryProducts = lazy(() => import("./pages/CategoryProducts"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/category/:category" element={<CategoryProducts />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

function About() {
  return (
    <InfoPage title="About Styleora">
      <p>
        Styleora is a women’s fashion maison for considered dressing. We design
        and curate silhouettes that feel personal — contemporary daywear, refined
        ethnic pieces, and finishing accessories with a quiet luxury point of view.
      </p>
      <p>
        This website is a frontend demonstration. There is no warehouse, payment
        processor, or account system behind it.
      </p>
    </InfoPage>
  );
}

function Contact() {
  return (
    <InfoPage title="Contact">
      <p>Client care:  hello@styleora.demo</p>
      <p>Atelier hours: Monday–Saturday, 10:00–18:00 IST</p>
      <p>Mumbai · Bengaluru · Delhi — showrooms in spirit only for this demo.</p>
    </InfoPage>
  );
}

function Faqs() {
  return (
    <InfoPage title="FAQs">
      <p>
        <strong>Do you ship pan-India?</strong> In this demo, shipping is calculated
        in the cart. Complimentary shipping applies above ₹1,499.
      </p>
      <p>
        <strong>Can I return a piece?</strong> Unworn items may be exchanged within
        7 days in a live store. Nothing is fulfilled from this demo.
      </p>
      <p>
        <strong>Are payments real?</strong> No. Checkout generates a mock order
        number only.
      </p>
    </InfoPage>
  );
}

function Shipping() {
  return (
    <InfoPage title="Shipping">
      <p>
        Standard delivery is estimated at 4–6 days. Orders over ₹1,499 qualify for
        complimentary shipping. A ₹99 handling charge applies below that threshold.
      </p>
      <p>Express delivery is shown at checkout as a demo option only.</p>
    </InfoPage>
  );
}

function Returns() {
  return (
    <InfoPage title="Returns">
      <p>
        We believe in easy returns. In a live environment, unworn pieces with tags
        may be returned within 7 days. Sale items and accessories may follow a
        different policy.
      </p>
    </InfoPage>
  );
}

function Privacy() {
  return (
    <InfoPage title="Privacy Policy">
      <p>
        Styleora’s demo storefront stores cart and wishlist data in your browser
        using localStorage. Checkout details stay in this session only. Nothing is
        sent to a server.
      </p>
    </InfoPage>
  );
}
