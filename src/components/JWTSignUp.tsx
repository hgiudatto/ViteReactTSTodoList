import React, { useState } from "react";
import ReactDOM from "react-dom";
import { base, Horizontal, Vertical, Content } from "gls";
import { cssRaw, style } from "typestyle";
import env from "react-dotenv";
import { useSignIn, RequireAuth, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

base("#root");
cssRaw("body {fontFamily: Arial}");

const loginEndpoint = "http://localhost:3000/api/login";
const actionsEndpoint = "http://localhost:3000/api/actions";

type Props = {};

const JWTSignUp = (props: Props) => {
  const [token, setToken] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [actions, setActions] = useState<
    { name: string; image: string }[]
  >([]);

  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const cleanMessages = () => {
    setSuccess("");
    setError("");
  };
  const signIn = useSignIn();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const onLogin = async () => {
    cleanMessages();
    setActions([]);

    const res = await fetch(loginEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const body = await res.json();
    if (body.error) {
      return setError(body.error);
    }
    const user = body.token.username;

    signIn({
      token: body.token,
      expiresIn: 3600, // 1 hour
      tokenType: "Bearer",
      authState: { email: email },
    });

    setSuccess(`Logged in ${user}`);
    setToken(body.token);
  };

  const logout = () => {
    signOut();
    navigate("/");
  };

  const onLoadActions = async () => {
    cleanMessages();
    const res = await fetch(actionsEndpoint, {
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

  return (
    <Vertical padding={20} spacing={12} maxWidth={400}>
      {/* Login form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <Vertical>
          <Vertical spacing={5}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => {
                cleanMessages();
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="username">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => {
                cleanMessages();
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              type="password"
              onChange={(e) => {
                cleanMessages();
                setPassword(e.target.value);
              }}
            />
          </Vertical>
          <button id="login">Login</button>
          <br />
          {/* <button id="logout" onClick={logout}>
            Logout
          </button> */}
        </Vertical>
      </form>

      {/* Load actions */}
      <button onClick={onLoadActions}>Load Actions</button>

      {/* Display success */}
      {success != "" && (
        <div
          style={{
            color: "#23b100",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          {success}
        </div>
      )}

      {/* Display error */}
      {error != "" && (
        <div
          style={{
            color: "#ff006a",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      {/* Display actions */}
      {actions.length != 0 && (
        <Vertical spacing={10}>
          {actions.map((action) => {
            return (
              <Horizontal
                key={action.name}
                id={action.name}
                verticalAlign="center"
              >
                <Content width={50} horizontalAlign="right">
                  <img
                    src={action.image}
                    className={style({ height: "40px" })}
                  />
                </Content>
                <Content>
                  <div className="action.name">{action.name}</div>
                </Content>
              </Horizontal>
            );
          })}
        </Vertical>
      )}
    </Vertical>
  );
};

export default JWTSignUp;
