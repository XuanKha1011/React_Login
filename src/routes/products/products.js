import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./products.css";

function Products() {
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user-info"));

  const directAdmin = () => {
    navigate("/admin");
  }

  const handleClick = () => {
    navigate("/");
    localStorage.clear();
    window.location.reload();
  };

  const handleUser = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        console.log(products)
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
                <th>title</th>
                <th>price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Image</th>
              </tr>

              <tbody>
                {products.map((product) => (
                  <tr>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.price*product.stock}$ </td>
                    <td><img className="picture" src={product.images[0]} alt="products"/></td>
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

export default Products;
