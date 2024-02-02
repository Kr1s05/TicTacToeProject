import { useContext } from "react";
import { UserContext } from "./UserProvider";
import { Navigate } from "react-router-dom";

function ProtectedComponent(props: { auth: boolean; element: JSX.Element }) {
  const user = useContext(UserContext);
  let authenticated = user && !("message" in user);
  authenticated = props.auth ? authenticated : !authenticated;
  return authenticated ? (
    props.element
  ) : (
    <Navigate to={props.auth ? "/login" : "/"} />
  );
}

export default ProtectedComponent;
