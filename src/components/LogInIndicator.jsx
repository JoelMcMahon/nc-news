import React from "react";
import { Link } from "react-router-dom";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";

const LogInIndicator = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {
  const handleOnClick = (e) => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUser({});
      localStorage.removeItem("user");
    }
  };

  return (
    <div>
      <Link to="/account">
        <span className="header_container__user">
          {isLoggedIn && `${user}`}
        </span>
        <button
          className="header_container__login_button"
          onClick={handleOnClick}
        >
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>

        <button
          className="header_container__login_icon"
          onClick={handleOnClick}
        >
          {isLoggedIn ? <RiLogoutBoxLine /> : <RiLoginBoxLine />}
        </button>
      </Link>
    </div>
  );
};

export default LogInIndicator;

//Build logIn indicator that allows people to log in as default user.
