import React, { useState } from "react";
import ReactDOM from "react-dom";
import { base, Horizontal, Vertical, Content } from "gls";
import { cssRaw, style } from "typestyle";
import env from "react-dotenv";
import { useSignIn, RequireAuth, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

type Props = {};

const Logout = (props: Props) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/");
  };

  return (
    <div>
      <button id="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
