import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./products.css";
import { type } from "@testing-library/user-event/dist/type";

function Products() {
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const localStorageData = JSON.parse(localStorage.getItem("user-info"));
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState("");

  const [titleUpdate, setTitleUpdate] = useState("");
  const [priceUpdate, setPriceUpdate] = useState("");
  const [quantityUpdate, setQuantityUpdate] = useState("");
  const [imagesUpdate, setImagesUpdate] = useState("");

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);

  const [a, setA] = useState({});
  const [b, setB] = useState({});

  const [searchBar, setSearchBar] = useState("");

  const indexOfLastProducts = currentPage * limit;
  const indexOfFirstProducts = indexOfLastProducts - limit;
  const currentProducts = products.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );

  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  const directAdmin = () => {
    navigate("/admin");
  };

  const handleClick = () => {
    navigate("/");
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (localStorageData.id !== 1) navigate("/Home");
    const handleUser = async () => {
      await fetch(`https://dummyjson.com/products`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
        });
    };
    handleUser();
    fetchCategories();
    handleCategory();
  }, []);

  const handleSort = () => {
    products.sort((a, b) => b.id - a.id);
  };

  // products.sort((a, b) => a.id - b.id);

  const showToastMessage = async () => {
    //   toast.success("Success Notification !", {
    //     position: toast.POSITION.TOP_LEFT,
    //   });
    await toast.success("Success Notification", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const fetchCategories = () => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  const handleSubmitNewProduct = async () => {
    let Data = [...products];
    await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        price: price,
        stock: quantity,
        images: images,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Data.unshift(data);
        setProducts(Data);
      })
      .then(setTitle(""), setPrice(""), setQuantity(""), setImages(""));
  };

  const handleOnClickDelete = (product) => {
    let data = products;
    data = data.filter((item) => item.id !== product.id);
    setProducts(data);
  };

  const handleUpdateProduct = async (product, index) => {
    let Data = [...products];
    await fetch(`https://dummyjson.com/products/${product.id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleUpdate,
        price: priceUpdate,
        stock: quantityUpdate,
        images: imagesUpdate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Data[index + currentPage * limit - limit].title = data.title;
        Data[index + currentPage * limit - limit].price = data.price;
        Data[index + currentPage * limit - limit].stock = data.stock;
        Data[index + currentPage * limit - limit].images = data.images;
      });
    await setProducts(Data);
  };

  const handleCategory = (category) => {
    try {
      fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => setCurrentCategory(data.products));
    } catch (e) {
      console.log(e);
    }
  };

  categories.splice(6, 20);

  return (
    <div>
      <div className="main-container d-flex">
        <div className="sidebar" id="side_nav">
          <div className="header-box">
            <div className="fs-4 logoAuzuno"></div>
            <div
              className="btn d-mb-none d-block close-btn px-1 py-4 text-white"
              onClick={directAdmin}
            >
              ADMIN PANEL <span className="text-end"></span>
            </div>
          </div>
          <ul className="list-unstyled px-2 text-center ">
            {/* <div className="directPage">
              <a href="Users" className="text-decoration-none text-white py-3">
                users
              </a>
            </div> */}
            <div className="directPage">
              <a href="products" className="text-decoration-none text-white">
                products
              </a>
            </div>
            {/* <div className="directPage">
              <a href="posts" className="text-decoration-none text-white">
                posts
              </a>
            </div> */}
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
                <span class="fs-4">Admin/products</span>
              </a>

              <ul class="nav nav-pills">
                <li onClick={handleClick}>
                  <button className="nav-link active">Logout</button>
                </li>
              </ul>
            </header>
          </nav>
          <div className="row container bg-white">
            <div className="row">
              <div className="btn-toolbar " aria-label="First group">
                <div className="px-2 text-center">
                  <button
                    className="btn btn-danger btn-add"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#myModalAdd"
                  >
                    Add
                  </button>
                  <div class="modal" id="myModalAdd">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title">Add Products</h4>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>

                        <div class="modal-body">
                          <form>
                            <div class="form-floating mb-3 mt-3">
                              <input
                                value={title}
                                type="text"
                                class="form-control"
                                placeholder="Enter title"
                                onChange={(e) => setTitle(e.target.value)}
                              />
                              <label>Title Product</label>
                            </div>
                            <div class="form-floating mt-3 mb-3">
                              <input
                                value={price}
                                type="text"
                                class="form-control"
                                placeholder="Enter Price"
                                onChange={(e) => setPrice(e.target.value)}
                              />
                              <label>Price</label>
                            </div>
                            <div class="form-floating mt-3 mb-3">
                              <input
                                value={quantity}
                                type="text"
                                class="form-control"
                                placeholder="Enter quantity"
                                onChange={(e) => setQuantity(e.target.value)}
                              />
                              <label>Quantity</label>
                            </div>
                            <div class="form-floating mt-3 mb-3">
                              <label class="input-group-text">URL</label>
                              <input
                                value={images}
                                type="text"
                                class="form-control"
                                placeholder="Image"
                                onChange={(e) => setImages(e.target.value)}
                              />
                            </div>
                          </form>
                        </div>

                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={(e) => {
                              showToastMessage(e);
                              handleSubmitNewProduct();
                            }}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-2 text-start ">
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Button group with nested dropdown"
                  >
                    <div class="btn-group" role="group">
                      <button
                        type="button"
                        class="btn btn-primary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Select
                      </button>
                      <ul class="dropdown-menu">
                        <li
                          className="dropdown-item"
                          onClick={(e) => setLimit(5)}
                        >
                          5
                        </li>
                        <li
                          className="dropdown-item"
                          onClick={(e) => setLimit(10)}
                        >
                          10
                        </li>
                        <li
                          className="dropdown-item"
                          onClick={(e) => setLimit(15)}
                        >
                          15
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  {" "}
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-primary dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Category
                    </button>
                    <ul className="dropdown-menu">
                      <li
                        className="dropdown-item"
                        onClick={(e) => {
                          setCurrentCategory("");
                        }}
                      >
                        All category
                      </li>
                      {categories.map((item) => (
                        <li
                          className="dropdown-item"
                          onClick={(e) => {
                            handleCategory(item);
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="search text-end col">
                  <input
                    type="text"
                    placeholder="Search products "
                    onChange={(e) => setSearchBar(e.target.value)}
                    value={searchBar}
                  />
                  <i className="fa fa-search m-2"></i>
                </div>
              </div>
            </div>
            <table>
              <tr>
                <th>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="btn"
                    onClick={handleSort()} 

                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                    />
                  </svg> */}
                  Id
                </th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
              <tbody>
                {currentCategory.length > 0
                  ? products
                      .filter((product) =>
                        product.title
                          .toLowerCase()
                          .includes(searchBar.toLowerCase())
                      ) // search bar
                      .filter(function (v) {
                        return currentCategory.some(
                          (n) => JSON.stringify(n) === JSON.stringify(v)
                        );
                      }) //filter category
                      .map((product, index) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.title}</td>
                          <td>{product.price}</td>
                          <td>{product.stock}</td>
                          <td>{product.price * product.stock}$ </td>
                          <td>
                            <img
                              className="picture"
                              src={product.images[0]}
                              alt="products"
                            />
                          </td>
                          <td className="btn-group">
                            <button
                              className="btn btn-basic btn-delete"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalDelete"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="icons"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                            <div class="modal" tabindex="-1" id="myModalDelete">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title">Delete product</h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <p>
                                      Are you sure you want to delete this data?
                                    </p>
                                  </div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-danger"
                                      data-bs-dismiss="modal"
                                      onClick={(e) => {
                                        handleOnClickDelete(product);
                                        showToastMessage(e);
                                      }}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="btn btn-b"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalUpdate"
                              onClick={(e) => {
                                setA(product);
                                setB(index);
                                setTitleUpdate(product.title);
                                setQuantityUpdate(product.stock);
                                setPriceUpdate(product.price);
                                setImagesUpdate(product.images);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="icons"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>
                            <div class="modal" id="myModalUpdate">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h4 class="modal-title">Update data</h4>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                    ></button>
                                  </div>

                                  <div class="modal-body">
                                    <form>
                                      <div class="form-floating mb-3 mt-3">
                                        <input
                                          value={titleUpdate}
                                          type="text"
                                          class="form-control"
                                          placeholder="Enter first name"
                                          onChange={(e) =>
                                            setTitleUpdate(e.target.value)
                                          }
                                        />
                                        <label>Title Product</label>
                                      </div>
                                      <div class="form-floating mt-3 mb-3">
                                        <input
                                          value={priceUpdate}
                                          type="text"
                                          class="form-control"
                                          placeholder="Enter price"
                                          onChange={(e) =>
                                            setPriceUpdate(e.target.value)
                                          }
                                        />
                                        <label>price</label>
                                      </div>
                                      <div class="form-floating mt-3 mb-3">
                                        <input
                                          value={quantityUpdate}
                                          type="text"
                                          class="form-control"
                                          placeholder="Enter Quantity"
                                          onChange={(e) =>
                                            setQuantityUpdate(e.target.value)
                                          }
                                        />
                                        <label>Quantity</label>
                                      </div>

                                      <div class="form-floating mt-3 mb-3">
                                        <label class="input-group-text">
                                          URL
                                        </label>
                                        <input
                                          value={imagesUpdate}
                                          type="text"
                                          class="form-control"
                                          placeholder="Image"
                                          onChange={(e) =>
                                            setImagesUpdate(e.target.value)
                                          }
                                        />
                                      </div>
                                    </form>
                                  </div>

                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-dismiss="modal"
                                      onClick={(e) => {
                                        showToastMessage(e);
                                        handleUpdateProduct(a, b);
                                      }}
                                    >
                                      Update
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                  : currentProducts
                      .filter((product) =>
                        product.title
                          .toLowerCase()
                          .includes(searchBar.toLowerCase())
                      )
                      .map((product, index) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.title}</td>
                          <td>{product.price}</td>
                          <td>{product.stock}</td>
                          <td>{product.price * product.stock}$ </td>
                          <td>
                            <img
                              className="picture"
                              src={product.images[0]}
                              alt="products"
                            />
                          </td>
                          <td className="btn-group">
                            <button
                              className="btn btn-basic btn-delete"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalDelete"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="icons"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                            <div class="modal" tabindex="-1" id="myModalDelete">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title">Delete product</h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <p>
                                      Are you sure you want to delete this data?
                                    </p>
                                  </div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-danger"
                                      data-bs-dismiss="modal"
                                      onClick={(e) => {
                                        handleOnClickDelete(product);
                                        showToastMessage(e);
                                      }}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="btn btn-b"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalUpdate"
                              onClick={(e) => {
                                setA(product);
                                setB(index);
                                setTitleUpdate(product.title);
                                setQuantityUpdate(product.stock);
                                setPriceUpdate(product.price);
                                setImagesUpdate(product.images);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="icons"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>
                            <div class="modal" id="myModalUpdate">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h4 class="modal-title">Update data</h4>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                    ></button>
                                  </div>

                                  <div class="modal-body">
                                    <form>
                                      <div class="form-floating mb-3 mt-3">
                                        <input
                                          value={titleUpdate}
                                          type="text"
                                          class="form-control"
                                          placeholder="Enter first name"
                                          onChange={(e) =>
                                            setTitleUpdate(e.target.value)
                                          }
                                        />
                                        <label>Title Product</label>
                                      </div>
                                      <div class="form-floating mt-3 mb-3">
                                        <input
                                          value={priceUpdate}
                                          type="text"
                                          class="form-control"
                                          placeholder="Enter price"
                                          onChange={(e) =>
                                            setPriceUpdate(e.target.value)
                                          }
                                        />
                                        <label>price</label>
                                      </div>
                                      <div class="form-floating mt-3 mb-3">
                                        <input
                                          value={quantityUpdate}
                                          type="text"
                                          class="form-control"
                                          placeholder="Enter Quantity"
                                          onChange={(e) =>
                                            setQuantityUpdate(e.target.value)
                                          }
                                        />
                                        <label>Quantity</label>
                                      </div>

                                      <div class="form-floating mt-3 mb-3">
                                        <label class="input-group-text">
                                          URL
                                        </label>
                                        <input
                                          value={imagesUpdate}
                                          type="text"
                                          class="form-control"
                                          placeholder="Image"
                                          onChange={(e) =>
                                            setImagesUpdate(e.target.value)
                                          }
                                        />
                                      </div>
                                    </form>
                                  </div>

                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-dismiss="modal"
                                      onClick={(e) => {
                                        showToastMessage(e);
                                        handleUpdateProduct(a, b);
                                      }}
                                    >
                                      Update
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
              </tbody>
            </table>
            <ToastContainer
              position="top-left"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Pagination
              totalRows={products.length}
              limit={limit}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
