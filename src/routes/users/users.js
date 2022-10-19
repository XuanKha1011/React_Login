import React from "react";

import { useEffect } from "react";
import { useState } from "react";

import "./users.css";
import { useNavigate } from "react-router-dom";

function Users() {
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user-info"));

  const directAdmin = () => {
    navigate("/admin");
  }

  const handleClick = () => {
    navigate("/login");
    localStorage.clear();
    window.location.reload();
  };

  const handleUser = () => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  };
  useEffect(() => {
    if (localStorageData.id !== 1) navigate("/Home");
    handleUser();
  }, []);

  return (
    <div>
      <div className="main-container d-flex">
        <div className="sidebar" id="side_nav">
          <div className="header-box">
            <div className="fs-4 logoAuzuno"></div>
            <div className="btn d-mb-none d-block close-btn px-1 py-4 text-white" onClick={directAdmin}>
              ADMIN PANEL <span className="text-end"></span>
            </div>
          </div>
          <ul className="list-unstyled px-2 text-center ">
            <div className="directPage">
              <a href="Users" className="text-decoration-none text-white py-3">
                users
              </a>
            </div>
            <div className="directPage">
              <a href="products" className="text-decoration-none text-white">
                products
              </a>
            </div>
            <div className="directPage">
              <a href="posts" className="text-decoration-none text-white">
                posts
              </a>
            </div>
          </ul>
        </div>
        <div className="content bg-light">
          <nav className="bg-white px-4">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
              <a
                href="/"
                class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
              >
                <svg class="bi me-2" width="40" height="32"></svg>
                <span class="fs-4">Admin/users</span>
              </a>

              <ul class="nav nav-pills">
                <li onClick={handleClick}>
                  <button className="nav-link active">Logout</button>
                </li>
              </ul>
            </header>
          </nav>
          <div className="row container bg-white">
            <table>
              <tr>
                <th>Id</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Image</th>
              </tr>

              <tbody>
                {users.map((user) => (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <img className="picture" src={user.image} alt="avatar" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
