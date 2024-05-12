// ProfileContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [state, setState] = useContext(AuthContext);
  const userId = state?.user?.id;

  const getProfileInformation = async () => {
    setLoading(true);
    try {
      // Make API call to get profile information based on the current login
      const { data } = await axios.get('https://serverrrr-3kbl.onrender.com/getProfile1', {
        params: { userId },
      });
      setProfile(data.profile);
      console.log(userId);
      console.log("Profile Information:", data.profile);
    } catch (error) {
      console.log(error);
      console.log(userId);
      setLoading(false);
    }
  
  };

  useEffect(() => {
    // Check if userId exists before making the API call
    if (userId) {
      getProfileInformation();
    }
  }, [userId]); // Fetch profile information when userId changes

  const updateProfileInformation = async () => {
    // Call this function to update the profile information
    await getProfileInformation();
  };

  return (
    <ProfileContext.Provider value={[profile, setProfile, getProfileInformation, updateProfileInformation]}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
