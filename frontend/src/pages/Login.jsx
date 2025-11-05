// ...existing code...
import { Link } from "react-router-dom";
import Form from "../components/Form";

function Login() {
  return (
    <>
      <Form route="/api/token/" method="login" registerLink="/register" registerText="Register a new user" />
    </>
  );
}

export default Login;
// ...existing code...