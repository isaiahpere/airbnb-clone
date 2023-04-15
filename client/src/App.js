import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { UserContextProvider } from "./utilities/context/userContext";
import axios from "axios";

import Layout from "./components/Layout";
import LayoutAccountLinks from "./components/LayoutAccount";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Places from "./pages/Places";
import PlaceFormPage from "./pages/PlacesForm";
import PlaceDetailsModule from "./modules/placeDetails";

// axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true; // req & send cookies

const App = () => {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<LayoutAccountLinks />}>
            <Route path="/account" element={<Account />} />
            <Route path="/account/bookings" element={<Bookings />} />
            <Route path="/account/places" element={<Places />} />
          </Route>
          <Route path="/account/places/new" element={<PlaceFormPage />} />
          <Route path="/account/places/:id" element={<PlaceFormPage />} />
          <Route path="/place/:id" element={<PlaceDetailsModule />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
