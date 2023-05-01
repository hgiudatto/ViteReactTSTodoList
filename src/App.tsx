import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Sub } from "./types.d";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import Header from "./components/Header";
import RickMortysGrid from "./components/RickMortysGrid";
import TestRestApiNodeClient from "./components/TestRestApiNodeClient";
import { RickMortysSearch } from "./components/RickMortysSearch";
import RickMortyGridDetail from "./components/RickMortyGridDetail";

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
    <BrowserRouter>
      <nav class="flex justify-center space-x-4">
        <Link
          class="text-blue-600 visited:text-purple-600 ..."
          to="/grid"
        >
          Rick and Mortys Fantastic Grid
        </Link>
        <Link
          class="text-blue-600 visited:text-purple-600 ..."
          to="/search"
        >
          Awesome Search
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Header title="Playground" />} />
        <Route path="/grid" element={<RickMortysGrid />} />
        <Route path="/grid/:id" element={<RickMortyGridDetail />} />
        <Route path="/search" element={<RickMortysSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
