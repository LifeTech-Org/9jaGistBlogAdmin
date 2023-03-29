import { Button } from "@mui/material";
import React, { useContext } from "react";
import { auth, provider, signInWithRedirect, signOut } from "../firebase";
import AppContext from "./../utils/app-context";

const Header = () => {
  const user = useContext(AppContext);
  const isSignedIn = user !== null;
  const signIn = () => {
    signInWithRedirect(auth, provider);
  };
  const signout = () => {
    signOut(auth);
  };
  return (
    <header className="bg-gray-900 h-14 flex items-center px-4 justify-between">
      <h3 className="text-white font-bold">9jaJistBlog Management System</h3>
      <div>
        {isSignedIn ? (
          <Button variant="contained" color="warning" onClick={signout}>
            sign out
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={signIn}>
            sign in
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
