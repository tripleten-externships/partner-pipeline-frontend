import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global/default.css";
import { client } from "./store";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./components/login-route";
import Dashboard from "./components/Dashboard/Dashboard";
import UserManagement from "./routes/user-management/user-management";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex h-screen">
                  <main className="flex-1 bg-zinc-950 ">
                    <Dashboard />
                    <Login />
                  </main>
                </div>
              }
            />
            <Route path="/user-management" element={<UserManagement />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
