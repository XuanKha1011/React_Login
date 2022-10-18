// import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import { useEffect } from "react";
import { useState } from "react";

import "./users.css";
function Users() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});

  const handleUser = () => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        // var newData = users.map(handleData);
        // function handleData(data) {
        //     setData({
        //       firstName: data.firstName,
        //       id: data.id,
        //       lastName: data.lastName,
        //       email: data.email,
        //       phone: data.phone,
        //       image: data.image,
        //     });
        // }
      });
  };
  useEffect(() => {
    handleUser();
  }, []);

  return (
    <div>
      <div className="main-container d-flex">
        <div className="sidebar" id="side_nav">
          <div className="header-box">
            <div className="fs-4 logoAuzuno"></div>
            <span className="btn d-mb-none d-block close-btn px-1 py-0 text-white">
        
              ADMIN PANEL <span className="text-end">Icon gi dos</span>
            </span>
          </div>
          <ul className="list-unstyled px-2">
            <li>
              <a href="Users" className="text-decoration-none">
                <i className="fal fa=home"></i> users
              </a>
            </li>
            <li>
              <a href="products" className="text-decoration-none">
                <i className="fal fa=home"></i> products
              </a>
            </li>
            <li>
              <a href="posts" className="text-decoration-none">
                <i className="fal fa=home"></i> posts
              </a>
            </li>
          </ul>
        </div>
        <div className="content bg-light">
          <nav className="bg-white">
            <ul>Admin / Users</ul>
            <ul className="text-end">Logout</ul>
          </nav>
          <div className="row container bg-white">
            <div className="columnName col-1 ">
              <ul>
                <ul className="text-center ">id</ul>
                {users.map((user) => {
                  return (
                    <li className="list-unstyled px-2" key={user.id}>
                      {" "}
                      {user.id}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col text-start">
              <ul>
                <ul className="text-center">firstName</ul>
                {users.map((user) => {
                  return (
                    <li className="list-unstyled px-2" key={user.firstName}>
                      {" "}
                      {user.firstName}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col text-start">
              <ul>
                <ul className="text-center">lastName</ul>
                {users.map((user) => {
                  return (
                    <li className="list-unstyled px-2" key={user.lastName}>
                      {" "}
                      {user.lastName}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col text-start">
              <ul>
                <ul className="text-center">Email</ul>
                {users.map((user) => {
                  return (
                    <li className="list-unstyled px-2" key={user.email}>
                      {" "}
                      {user.email}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col text-start">
              <ul>
                <ul className="text-center">Phone</ul>
                {users.map((user) => {
                  return (
                    <li className="list-unstyled px-2" key={user.phone}>
                      {" "}
                      {user.phone}
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* <div className="columnName col">
              <ul>
                {users.map((user) => {
                  return (
                    <li className="list-unstyled px-2" key={user.image}>
                      {" "}
                      {user.image}
                    </li>
                  );
                })}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
