import React, { useState, useEffect } from "react";
import {
  AuthProvider,
  RequireAuth,
  useSignOut,
} from "react-auth-kit";
import { useNavigate } from "react-router-dom";

type Props = {};

const JWTSignOut = (props: Props) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div>
      <button className="rounded hover:rounded-lg" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default JWTSignOut;
