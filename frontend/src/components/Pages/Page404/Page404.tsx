import { Link, NavLink, Navigate } from "react-router-dom";

function Page404(): JSX.Element {
  return (
    <>
      <div className="Page404 text-white">
        Page 404 NOT FOUND...
        <br />
      </div>
      <NavLink to="/">
        <div className="text-blue-500 underline">Return to home page</div>
      </NavLink>
    </>
  );
}

export default Page404;
