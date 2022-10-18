import { useEffect } from "react";
import "./Admin.css"


function Admin() {
  //   useEffect(() => {});
  return (
    <div>
      <div className="main-container d-flex">
        <div className="sidebar" id="side_nav">
          <div className="header-box">
            <div className="fs-4 logoAuzuno">
          </div>
                 <span className="btn d-mb-none d-block close-btn px-1 py-0 text-white"> ADMIN PANEL <span className="text-end">Icon gi dos</span></span>
              
          </div>
     <ul className="list-unstyled px-2">
            <li>
              <a href="Admin/Users" className="text-decoration-none">
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
                <ul>Admin</ul>
                <ul className="text-end">Logout</ul>
              </nav>
              <div className="mainframe">
                  <form>
                    <div>
                      dsadsa
                    </div>
                    <div>dsadsa</div>
                  </form>
              </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
