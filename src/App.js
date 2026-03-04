import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Naslovnica from "./pages/Naslovnica";
import Blog from "./pages/Blog";
import BlogSingle from "./pages/BlogSingle";
import Onama from "./pages/Onama";
import Usluge from "./pages/Usluge";
import Kontakt from "./pages/Kontakt";
import Lokali from "./pages/Lokali";
import LokaliSingle from "./pages/LokaliSingle";

import Profil from "./components/zadaci/Profil";
import Korisnici from "./components/zadaci/Korisnici";
import Tecaj from "./components/zadaci/Tecaj";
import Kategorije from "./pages/Kategorije";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import AdminLayout from "./pages/admin/AdminLayout";
import MyDetails from "./pages/admin/MyDetails";
import MyPosts from "./pages/admin/MyPosts";
import Settings from "./pages/admin/Settings";

import AuthorsTable from "./pages/AuthorsTable";
import AuthorSingle from "./pages/AuthorSingle";

import Shop from "./pages/shop/Shop";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout"; 


function App() {
  return (
    <BrowserRouter basename="/front-jesen-2025">
      <Nav />
      <Routes>
        <Route path="/" element={<Naslovnica />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogSingle />} />
        <Route path="/o-nama" element={<Onama />} />
        <Route path="/usluge" element={<Usluge />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/kategorije" element={<Kategorije />} />

          <Route path="/lokali" element={<Lokali />} />
          <Route path="/lokal/:slug" element={<LokaliSingle />} />

          <Route path="/profil" element={<Profil />} />
          <Route path="/korisnici" element={<Korisnici />} />
          <Route path="/tecaj" element={<Tecaj />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/autori" element={<AuthorsTable />} />
          <Route path="/autor/:nickname" element={<AuthorSingle /> } />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="mydetails" element={<MyDetails />} />
            <Route path="myposts" element={<MyPosts />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> 

        

        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
