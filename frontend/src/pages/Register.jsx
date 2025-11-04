import Form from "../components/Form"

function Register() {
    return <><Form route="/api/user/register/" method="register" /><Link to="/login">
        <h5>Already have an account?</h5>
        <button>Login</button>
    </Link></>
}

export default Register