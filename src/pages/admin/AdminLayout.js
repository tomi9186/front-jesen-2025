import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./admin.css";

const AdminLayout = () => {
    const location = useLocation();
    const path = location.pathname;

    // console.log(location)
    // console.log(path)
    
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container admin">
      <div className="naslovna"></div>
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-3 d-md-block d-flex justify-content-center align-items-center">
                <img
                src="https://i.pravatar.cc/300"
                alt=""
                className="profile_pic"
              />
            </div>
            <div className="col-md-9 d-md-block d-flex justify-content-center align-items-center px-5 py-3">
              <h1 className="px-5 px-md-0">Settings</h1>
            </div>
          </div>
        </div>
        <div className="col-md-6 px-3 py-3 justify-content-center d-flex justify-content-md-end gap-2">
            <button className="btn btn-secondary">Cancle</button>
            <button className="btn btn-primary">Save</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
            <ul>
                <li>
                    <Link to="mydetails" className={`${path === "/admin/mydetails" ? "text-danger" : ""}`}>My details</Link>
                </li>
                <li>
                    <Link to="myposts" className={`${path === "/admin/myposts" ? "text-danger" : ""}`}>My posts</Link>
                </li>
                <li>
                    <Link to="settings" className={`${path === "/admin/settings" ? "text-danger" : ""}`}>Settings</Link>
                </li>
            </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
