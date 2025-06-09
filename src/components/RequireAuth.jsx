import { Navigate } from "react-router";
import PropTypes from "prop-types";
import useUser from "../context/user/useUser";

function RequireAuth({ children }) {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
