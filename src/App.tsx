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
import Todo from "./components/Todo";
import Signup from "./components/Signup";
import JWTSignUp from "./components/JWTSignUp";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import JWTSignOut from "./components/JWTSignOut";
import Counter from "./components/Counter";
import StoreUserContext from "./components/StoreUserContext";
import Page from "./components/Page";

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

  // const loginEndpoint = "http://localhost:3000/api/Login";
  // const actionsEndpoint = "http://localhost:3000/api/actions";

  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [token, setToken] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [actions, setActions] = useState<
    {
      name: string;
      image: string;
    }[]
  >([]);

  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const cleanMessages = () => {
    setSuccess("");
    setError("");
  };

  const onLogin = async () => {
    cleanMessages();
    setActions([]);
    const res = await fetch(process.env.LOGIN_ENDPOINT as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const body = await res.json();
    if (body.error) {
      return setError(body.error);
    }
    const user = body.token.username;
    setSuccess(`Logged in ${user}`);
    setToken(body.token);
  };

  const onLoadActions = async () => {
    cleanMessages();
    const res = await fetch(process.env.ACTIONS_ENDPOINT as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const body = await res.json();
    if (body.error) {
      return setError(body.error);
    }
    setSuccess("Actions loaded");
    setActions(body.actions);
  };

  useEffect(() => {
    setSubs(INITIAL_STATE);
  }, []);

  const handleNewSub = (newSub: Sub): void => {
    setSubs((subs) => [...subs, newSub]);
  };

  return (
    <div className="App">
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <BrowserRouter>
          <nav className="flex justify-center space-x-4">
            <Link
              className="text-red-600 visited:text-purple-600 ..."
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-blue-600 visited:text-purple-600 ..."
              to="/grid"
            >
              Rick and Mortys Fantastic Grid
            </Link>
            <Link
              className="text-blue-600 visited:text-purple-600 ..."
              to="/search"
            >
              Awesome Search
            </Link>
            <Link
              className="text-blue-600 visited:text-purple-600 ..."
              to="/counter"
            >
              Counter
            </Link>
            <Link
              className="text-blue-600 visited:text-purple-600 ..."
              to="/storeUser"
            >
              Store User
            </Link>
            <Link
              className="text-blue-600 visited:text-purple-600 ..."
              to="/page"
            >
              Page useContext
            </Link>
            <Link
              className="text-blue-600 visited:text-purple-600 ..."
              to="/logout"
            >
              Logout
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<Header title="Playground" />} />
            <Route path="/login" element={<JWTSignUp />} />
            <Route path="/grid" element={<RickMortysGrid />} />
            <Route
              path="/grid/:id"
              element={<RickMortyGridDetail />}
            />
            <Route
              path="/search"
              element={
                <RequireAuth loginPath="/login">
                  <RickMortysSearch />
                </RequireAuth>
              }
            />
            <Route path="/todo" element={<Todo />} />
            <Route path="/logout" element={<JWTSignOut />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/storeUser" element={<StoreUserContext />} />
            <Route path="/page" element={<Page />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      {/* <Signup /> */}
      {/* <div className="flex flex-col justify-center max-h-screen items-center bg-gradient-to-b from-lime-200 to-lime-600">
        <JWTSignUp />
      </div> */}
    </div>
  );
}

export default App;
