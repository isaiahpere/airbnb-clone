import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./utilities/context/userContext";
import axios from "axios";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
// import Bookings from "./pages/Account/Bookings";
// import Places from "./pages/Account/Places";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true; // req & send cookies

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/:subpage" element={<Account />} />
          <Route path="/account/:subpage/:action" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
