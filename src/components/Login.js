import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  let navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    errorAnnouncement: "",
  });



  const handleSubmit = async () => {
    let item = { username, password };
    let result = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    let users = await result.json();
    console.log(users)
    localStorage.setItem("user-info", JSON.stringify(users));
  
    let userToken = users.token;
    localStorage.setItem("tokenId", JSON.stringify(userToken));
    
    if (userToken === undefined)
      setError({
        errorAnnouncement: "Incorrect Email Address or password",
      });
    else navigate('/home')

  };

  return (
    <div className="containerLogin">
      <div className="layout-component">
        <div className="Login-leftLayout"></div>
        <div className="Login-rightLayout">
          <div className="signInForm">
            <div>
              <h1 className="labelSignIn">Sign in</h1>
            </div>
            <div className="error">{error.errorAnnouncement}</div>
            <form className="mainSignIn">
              <div className="mainEmail">
                <label for="user_email">Username </label>
                <span className="inputEmail">
                  <span class="ant-input-prefix">
                    <span
                      role="img"
                      aria-label="mail"
                      class="anticon anticon-mail"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="mail"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
                      </svg>
                    </span>
                  </span>
                  <input
                    type="email"
                    id="user_email"
                    placeholder="Username"  
                    name="email"
                    className="input_user"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </span>
              </div>
              <div class="mainPassword">
                <label for="user_password">Password</label>
                <span class="ant-input-affix-wrapper inputPassword">
                  <span class="ant-input-prefix">
                    <span
                      role="img"
                      aria-label="lock"
                      class="anticon anticon-lock"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="lock"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"></path>
                      </svg>
                    </span>
                  </span>
                  <input
                    placeholder="Password"
                    id="user_password"
                    name="password"
                    action="click"
                    type="password"
                    class="input_password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </span>
              </div>

              <div className="forget_password">
                <a href="/forget-password">Forget Password</a>
              </div>
              <div>
                <button
                  className="btn_submit"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="scan_or">
                <div className="or"></div> OR <div className="or"></div>
              </div>
              <div className="tech">
                <a className="register" href="/register">
                  REGISTER A NEW ACCOUNT
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
