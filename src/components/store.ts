import React from "react";
import { createContext } from "react";

const initialState = {
  first: "Rick",
  last: "Sanchez",
};

export type UserState = typeof initialState;

const context = createContext<typeof initialState>(initialState);

export default context;
