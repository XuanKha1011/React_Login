import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./posts.css";


function Posts() {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState({});

  const handleUser = () => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
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
            <ul>Admin / posts</ul>
            <ul className="text-end">Logout</ul>
          </nav>
          <div className="row container bg-white">
            <div className="columnName col-sm-1">
              <ul>
                <ul className="text-start">id</ul>
                {posts.map((post) => {
                  return (
                    <li className="list-unstyled px-2" key={post.id}>
                      {post.id}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col-sm text-start">
              <ul>
                <ul className="text-center">title</ul>
                {posts.map((post) => {
                  return (
                    <li className="list-unstyled px-2" key={post.title}>
                      {" "}
                      {post.title}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col-sm-6 text-start">
              <ul>
                <ul className="text-center">body</ul>
                {posts.map((posts) => {
                  return (
                    <li className="list-unstyled px-2" key={posts.body}>
                      {" "}
                      {posts.body}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="columnName col-sm text-start">
              <ul>
                <ul className="text-center">Tags</ul>
                {posts.map((post) => {
                  return (
                    <li className="list-unstyled px-2" key={post.tags}>
                      {" "}
                      {post.tags}
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
