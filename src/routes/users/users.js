import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";

import "./users.css";
import axios from "axios";

function Users() {
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user-info"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [phoneUser, setPhoneUser] = useState("");
  const [imageUser, setImageUser] = useState("");

  const [firstNameUpdate, setFirstNameUpdate] = useState("");
  const [lastNameUpdate, setLastNameUpdate] = useState("");
  const [emailUserUpdate, setEmailUserUpdate] = useState("");
  const [phoneUserUpdate, setPhoneUserUpdate] = useState("");
  const [imageUserUpdate, setImageUserUpdate] = useState("");

  const [loading, setLoading] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const [a, setA] = useState({});
  const [b, setB] = useState({});

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
      const res = await axios.get(`https://dummyjson.com/users`);
      setUsers(res.data.users);
      setLoading(false);
    };
    handleUser();
  }, []);

  const handleOnClickDelete = (user) => {
    let data = users;
    data = data.filter((item) => item.id !== user.id);
    setUsers(data);
  };

  const handleSubmitNewUser = () => {
    let Data = [...users];
    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: emailUser,
        phone: phoneUser,
        image: imageUser,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Data.push(data);
        setUsers(Data);
      })
      .then(
        setFirstName(""),
        setLastName(""),
        setEmailUser(""),
        setPhoneUser(""),
        setImageUser("")
      );
  };

  const handleUpdateUser = async (user, index) => {
    console.log(index);
    let Data = [...users];
    await fetch(`https://dummyjson.com/users/${user.id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstNameUpdate,
        lastName: lastNameUpdate,
        email: emailUserUpdate,
        phone: phoneUserUpdate,
        image: imageUserUpdate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Data[index + currentPage * usersPerPage - usersPerPage].firstName =
          data.firstName;
        Data[index + currentPage * usersPerPage - usersPerPage].lastName =
          data.lastName;
        Data[index + currentPage * usersPerPage - usersPerPage].email =
          data.email;
        Data[index + currentPage * usersPerPage - usersPerPage].phone =
          data.phone;
        Data[index + currentPage * usersPerPage - usersPerPage].image =
          data.image;
      });
    await setUsers(Data);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <span className="h4"> All Users</span>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((user, index) => (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <img className="picture" src={user.image} alt="avatar" />
                    </td>
                    <td className="btn-group">
                      <button
                        className="btn btn-basic"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#myModalAdd"
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
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>

                      <div class="modal" id="myModalAdd">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h4 class="modal-title">Add User</h4>
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
                                  value={firstName}
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter first name"
                                    onChange={(e) =>
                                      setFirstName(e.target.value)
                                    }
                                  />
                                  <label>First Name</label>
                                </div>
                                <div class="form-floating mt-3 mb-3">
                                  <input
                                  value={lastName}
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter last name"
                                    onChange={(e) =>
                                      setLastName(e.target.value)
                                    }
                                  />
                                  <label>Last Name</label>
                                </div>
                                <div class="form-floating mt-3 mb-3">
                                  <input
                                  value={emailUser}
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter email"
                                    onChange={(e) =>
                                      setEmailUser(e.target.value)
                                    }
                                  />
                                  <label>Email</label>
                                </div>
                                <div class="form-floating mt-3 mb-3">
                                  <input
                                  value={phoneUser}
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter phone number"
                                    onChange={(e) =>
                                      setPhoneUser(e.target.value)
                                    }
                                  />
                                  <label>Phone</label>
                                </div>
                                <div class="form-floating mt-3 mb-3">
                                  <label class="input-group-text">URL</label>
                                  <input
                                  value={imageUser}
                                    type="text"
                                    class="form-control"
                                    placeholder="Image"
                                    onChange={(e) =>
                                      setImageUser(e.target.value)
                                    }
                                  />
                                </div>
                              </form>
                            </div>

                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleSubmitNewUser}
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

                      <button
                        onClick={(e) => handleOnClickDelete(user)}
                        className="btn btn-basic"
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

                      <button
                        type="button"
                        className="btn btn-b"
                        data-bs-toggle="modal"
                        data-bs-target="#myModalUpdate"
                        onClick={(e) => {
                          setA(user);
                          setB(index);
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
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter first name"
                                    onChange={(e) =>
                                      setFirstNameUpdate(e.target.value)
                                    }
                                  />
                                  <label>First Name</label>
                                </div>
                                <div class="form-floating mt-3 mb-3">
                                  <input
                                    value={user.lastName}
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter last name"
                                    onChange={(e) =>
                                      setLastNameUpdate(e.target.value)
                                    }
                                  />
                                  <label>Last Name</label>
                                </div>
                                <div class="form-floating mt-3 mb-3">
                                  <input
                                    value={user.email}
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter email"
                                    onChange={(e) =>
                                      setEmailUserUpdate(e.target.value)
                                    }
                                  />
                                  <label>Email</label>
                                </div>
                                <div class="form-floating mt-3 mb-3">
                                  <input
                                    value={user.phone}
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter phone number"
                                    onChange={(e) =>
                                      setPhoneUserUpdate(e.target.value)
                                    }
                                  />
                                  <label>Phone</label>
                                </div>
                                <div class="form-floating mt-3 mb-3">
                                  <label class="input-group-text">URL</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Image"
                                    onChange={(e) =>
                                      setImageUserUpdate(e.target.value)
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
                                onClick={(e) => handleUpdateUser(a, b)}
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
            <Pagination
              totalUsers={users.length}
              usersPerPage={usersPerPage}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
