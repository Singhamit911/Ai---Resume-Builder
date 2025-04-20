import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Navigate, Outlet } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import Header from "./components/ui/custom/Header";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <div>
      <Header></Header>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
