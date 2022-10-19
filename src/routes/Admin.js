import { useEffect } from "react";
import "./Admin.css";
import "./posts/posts";
import "./products/products";
import "./users/users";
import { useNavigate } from "react-router-dom";

function Admin() {
  let navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("user-info"));

  const handleClick = () => {
    navigate("/login");
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    
    if (users.id !== 1) navigate("/Home");
  });

  return (
    <div>
      <div className="main-container d-flex">
        <div className="sidebar" id="side_nav">
          <div className="header-box">
            <div className="fs-4 logoAuzuno"></div>
            <div className="btn d-mb-none d-block close-btn px-1 py-4 text-white" href="admin">
              ADMIN PANEL <span className="text-end"></span>
            </div>
          </div>
          <ul className="list-unstyled px-2 text-center ">
            <div className="directPage">
              <a href="admin/users" className="text-decoration-none text-white py-3">
                users
              </a>
            </div>
            <div className="directPage">
              <a href="admin/products" className="text-decoration-none text-white">
                products
              </a>
            </div>
            <div className="directPage">
              <a href="admin/posts" className="text-decoration-none text-white">
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
                <span class="fs-4">Admin</span>
              </a>

              <ul class="nav nav-pills">
                <li onClick={handleClick}>
                  <button className="nav-link active">Logout</button>
                </li>
              </ul>
            </header>
          </nav>
          <div className="row container bg-white">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
