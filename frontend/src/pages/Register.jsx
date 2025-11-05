// ...existing code...
import Form from "../components/Form";

function Register() {
  return (
    <>
      <Form
        route="/api/user/register/"
        method="register"
        registerLink="/login"
        registerText="Already have an account? Login"
      />
    </>
  );
}

export default Register;
// ...existing code...