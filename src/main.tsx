import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./global/default.css";
import { client } from "./store";
import { ThemeProvider } from "./components/theme-provider";
import App from "./components/App";

(async function boot() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ApolloProvider client={client}>
          <BrowserRouter future={{ v7_relativeSplatPath: true }}>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
})();
