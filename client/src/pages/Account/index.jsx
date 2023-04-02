import React, { useState, useContext, Fragment, useEffect } from "react";
import styled from "styled-components/macro";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../../utilities/context/userContext";
import AccountNav from "../../modules/account";
import Loader from "../../components/globals/Loader";
import Profile from "../../modules/account/Profile";
import Bookings from "../../modules/account/Bookings";
import Places from "../../modules/account/places";

const Section = styled.div``;

const Account = () => {
  // user context
  const { user, loading, setUser } = useContext(UserContext);

  // state
  const [redirect, setRedirect] = useState("");
  const [pageName, setPageName] = useState("");

  // grab param to activate correct navitem in account page
  const { subpage } = useParams();
  useEffect(() => {
    if (subpage === "places") {
      setPageName("places");
    } else if (subpage === "bookings") {
      setPageName("bookings");
    } else setPageName("profile");
  }, [subpage]);

  /**
   * Hanlde logout and redirect user
   */
  const handleLogout = async () => {
    const res = await axios.post("/logout");
    console.log(res.data.redirect);
    if (res?.data?.redirect) {
      setUser(null);
      setRedirect("/");
    }
  };

  // redirect set to true upon logout
  if (redirect) return <Navigate to={redirect} />;

  // if user not found return null
  if (!user) return;
  return (
    <Fragment>
      {loading && <Loader center />}
      {!loading && (
        <Section>
          <AccountNav activePage={pageName} />
          {pageName === "profile" && (
            <Profile userInfo={user} logoutUser={handleLogout} />
          )}
          {pageName === "bookings" && <Bookings />}
          {pageName === "places" && <Places />}
        </Section>
      )}
    </Fragment>
  );
};

export default Account;
