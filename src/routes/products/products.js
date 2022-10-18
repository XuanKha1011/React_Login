// import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import "./products.css";



function Products() {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({});

  const handleUser = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        console.log(products)
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
            <ul>Admin / Products</ul>
            <ul className="text-end">Logout</ul>
          </nav>
          <div className="row container bg-white">
            <div className="columnName col-sm-1 ">
              <ul>
                <ul className="text-start">id</ul>
                {products.map((product) => {
                  return (
                    <li className="list-unstyled px-2" key={product.id}>
                      {product.id}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col-sm-4 text-start">
              <ul>
                <ul className="text-center">title</ul>
                {products.map((product) => {
                  return (
                    <li className="list-unstyled px-2" key={product.title}>
                      {" "}
                      {product.title}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col-sm-2 text-start">
              <ul>
                <ul className="text-center">price</ul>
                {products.map((product) => {
                  return (
                    <li className="list-unstyled px-2" key={product.price}>
                      {" "}
                      {product.price}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col-sm-2 text-start">
              <ul>
                <ul className="text-center">quantity</ul>
                {products.map((product) => {
                  return (
                    <li className="list-unstyled px-2" key={product.stock}>
                      {" "}
                      {product.stock}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col text-start">
              <ul>
                <ul className="text-center">Total</ul>
                {products.map((product) => {
                  return (
                    <li className="list-unstyled px-2" key={product.total}>
                      {product.stock * product.price}
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

export default Products;
