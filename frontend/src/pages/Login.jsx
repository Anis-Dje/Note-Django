import Form from "../components/Form"

function Login() {
    return (<><Form route="/api/token/" method="login" /><Link to="/register">
        <button>Register a new user</button>
    </Link></>   
    ) 
}

export default Login