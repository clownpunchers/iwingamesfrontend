import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import rootReducer from "./reducers/_index";

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="686110024658-8vp70u620t9imo5hsv4eq9h21fiet3ko.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
