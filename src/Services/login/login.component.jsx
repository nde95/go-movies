import { useState } from "react";
import Input from "../../components/forms/input.component";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { setJwtToken } = useOutletContext();
    const { setAlertClassName } = useOutletContext();
    const { setAlertMessage } = useOutletContext();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email == "admin@test.com" && password == "tester") {
            setJwtToken("123")
            setAlertClassName("d-none")
            setAlertMessage("")
            navigate("/")
        } else {
            setAlertClassName("alert-danger")
            setAlertMessage("Invalid login, please try again.")
        }
    }


    return(
        <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            <hr />

            <form onSubmit={handleSubmit}>
                <Input
                    title="Email Address"
                    type="email"
                    className="form-control"
                    name="email"
                    autoComplate="email-new"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplate="password-new"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <hr />

                <Input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />

            </form>
        </div>
    )
}

export default Login; 