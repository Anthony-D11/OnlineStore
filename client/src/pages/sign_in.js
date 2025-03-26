import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import $ from 'jquery';

const SignIn = () => {
    const api_url = "http://localhost:4000/api/v1/users/sign-in";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            let payload = {
                "username": username,
                "password": password
            }
            const response = await axios.post(api_url, payload, {withCredentials: true});
            if (response.status != 200) {
                throw response.statusText;
            }
            $(".statusText").text(response.statusText);
            $(".statusText").removeClass("error");
            $(".statusText").addClass("success");
            setUsername("");
            setPassword("");
            alert("Sign in successfully!");
            navigate("/");
            window.location.reload();

        } catch(error) {
            $(".statusText").text(error);
            $(".statusText").removeClass("success");
            $(".statusText").addClass("error");
            console.error(`Error registering user: ${error}`);
        }
    }

    return (
        <>
            <div className="section-section container">
                <div className="sign-in-container">
                    <div className="sign-in-wrapper">
                        <form className="sign-in" onSubmit={handleSignIn}>
                            <span className="sign-in-header">Sign In</span>
                            <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <input type="text" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit">Sign In</button>
                            <a className="register-link" href="/register"> Register?</a>
                            <span className="statusText"></span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignIn;