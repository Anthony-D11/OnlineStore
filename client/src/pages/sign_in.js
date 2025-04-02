import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import $ from 'jquery';
import validateInput from "../input_validation";
import { AuthContext } from "../App";

export default function SignIn() {
    const api_url = "http://localhost:4000/api/v1/users/sign-in";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {userState, setUserState} = useContext(AuthContext);
    
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

        let payload = {
            "username": username,
            "password": password
        }
        axios.post(api_url, payload, {withCredentials: true}).then((response) => {
            if (response.status !== 200) {
                throw response;
            }
            setUserState({ "isLoggedIn": true, "user": response.data });
            setUsername("");
            setPassword("");
            alert("Sign in successfully!");
            navigate("/");
            window.location.reload();
        }).catch(error => {
            if(error.status === 401) {
                alert(`Invalid credentials`);
            }
            else {
                console.log(`Error signing: ${error}`);
            }
        })
            
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
