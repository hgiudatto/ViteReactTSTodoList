import React, { useState, useEffect } from "react";

import { Sub } from "./types.d";

import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import Header from "./components/Header";
import RickMortysGrid from "./components/RickMortysGrid";
import TestRestApiNodeClient from "./components/TestRestApiNodeClient";
import { RickMortysSearch } from "./components/RickMortysSearch";

interface AppState {
  subs: Array<Sub>;
}

const INITIAL_STATE = [
  {
    nick: "dapelu",
    subMonths: 3,
    avatar: "https://i.pravatar.cc/150?u=dapelu",
    description: "Dapelu hace de moderador a veces.",
  },
  {
    nick: "sergio_serrano",
    subMonths: 7,
    avatar: "https://i.pravatar.cc/150?u=sergio_serrano",
  },
];

function App() {
  // TODO: 20230416 -> Build a Login System in NodeJS with Passport.js Authentication -> https://youtu.be/W5Tb1MIeg-I
  const [subs, setSubs] = useState<AppState["subs"]>([]);

  useEffect(() => {
    setSubs(INITIAL_STATE);
  }, []);

  const handleNewSub = (newSub: Sub): void => {
    setSubs((subs) => [...subs, newSub]);
  };

  return (
    <div className="text-3xl font-bold text-blue-500 underline text-center">
      {/* <h1>midu subs</h1>
      <List subs={subs} />
      <Form onNewSub={setSubs} /> */}
      <header>
        <Header title="Rick and Mortys" />
      </header>
      <main>
        <RickMortysGrid />
        {/* <TestRestApiNodeClient /> */}
        <RickMortysSearch />
      </main>
    </div>
  );
}

export default App;
