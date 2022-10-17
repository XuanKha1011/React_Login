import { useEffect } from "react";
import "../routes/Admin.css"

function Admin() {
  //   useEffect(() => {});
  return (
    <div>
      <div className="main-container d-flex">
        <div className="sidebar" id="side_nav">
          <div className="header-box">
            <h1 className="fs-4">
              <span className="bg-white text-dark rounded shadow px-2 me-2">CL</span><span className="text-white">Coding League</span>
            </h1>
          </div>

          <ul className="list-unstyled px-2">
            <li>
              <a href="#" className="#" className="text-decoration-none">
                <i className="fal fa=home"></i> Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Admin;
