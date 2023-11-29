import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton.jsx";
import LogoutButton from "./components/LogoutButton.jsx";
import Profile from "./components/Profile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-n15hmt0xc6wdaiw1.eu.auth0.com"
      clientId="LfhQYAWSWSqoC9a4zKQoBHoL8WbQL1MQ"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <LoginButton />
      <LogoutButton />
      <Profile />
      <App />
    </Auth0Provider>
    ,
  </React.StrictMode>
);
