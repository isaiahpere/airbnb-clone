import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // attempt to find user on first load
  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        // sending a cookie if any exist
        const res = await axios.get("/profile");
        if (res.data.email && res.data.id) setUser(res.data);
      };
      fetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
