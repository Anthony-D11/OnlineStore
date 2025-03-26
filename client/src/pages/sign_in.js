import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import $ from 'jquery';
import validateInput from "../input_validation";

export default function SignIn() {
    const api_url = "http://localhost:4000/api/v1/users/sign-in";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = (event) => {
        event.preventDefault();
        let validationResult = validateInput("username", username);
        if (!validationResult.isValid) {
            alert(validationResult.error);
            return;
        }
        validationResult = validateInput("password", password);
        if (!validationResult.isValid) {
            alert(validationResult.error);
            return;
        }
        try {
            let payload = {
                "username": username,
                "password": password
            }
            axios.post(api_url, payload, {withCredentials: true}).then((response) => {
                if (response.status != 200) {
                    throw response.statusText;
                }
                setUsername("");
                setPassword("");
                alert("Sign in successfully!");
                navigate("/");
                window.location.reload();
            })
            

        } catch(error) {
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
