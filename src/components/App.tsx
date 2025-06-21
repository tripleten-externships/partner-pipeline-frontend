import React from "react";
import { Routes, Route } from "react-router";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./login-route";
import UserManagement from "../routes/user-management/user-management";

/**
 * All routing and functionality goes here. Any functionality that runs
 * on app load will go here.
 */
function App() {
  // useStates and useEffects go here
  return (
    <main className="flex-1 bg-zinc-950 ">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
