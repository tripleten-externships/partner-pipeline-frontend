import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global/default.css";
import { client } from "./store";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./components/login-route";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center min-h-svh">
                  <Button>Click me</Button>
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
