import {  useSelector } from "react-redux";

const Navbar = ({ logout }) => {
  let user = useSelector((state) => {
    let theUser = state?.state?.user;
    return theUser;
  });

  return (
    <div className="navbar dashboard-nav">
      <div className="dashboard-welcome"></div>
      <div className="dashboard-nav-btn-wrapper">
        <span className="user-welcome">
          <span className="name">{user?.name ? user.name : ""}</span>
          <span className="_id">{user?.role ? user.role : ""}</span>
        </span>
        <button onClick={logout} className="logout-btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
