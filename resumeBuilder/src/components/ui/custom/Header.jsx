import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-2 px-4 flex justify-between shadow-md">
      <Link to={"/"}>
        <img src="/logo.svg" width={30} height={30} />
      </Link>
      {isSignedIn ? (
        <div className="flex gap-2 items-center shadow-md">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton></UserButton>
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
