import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import $ from 'jquery';
import validateInput from "../input_validation";

function Register () {
    const api_url = "http://localhost:4000/api/v1/users/register";
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        let validationResult = validateInput("general", name);
        if (!validationResult.isValid) {
            alert(validationResult.error);
            return;
        }
        validationResult = validateInput("username", username);
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
                "name": name,
                "username": username,
                "password": password
            }
            const response = await axios.post(api_url, payload);
            if (response.status != 200) {
                throw response.statusText;
            }
            $(".statusText").text(response.statusText);
            $(".statusText").removeClass("error");
            $(".statusText").addClass("success");
            setName("");
            setUsername("");
            setPassword("");
            alert("User created!");
            navigate("/sign-in");

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
                <div className="register-container">
                    <div className="register-wrapper">
                        <form className="register" onSubmit={handleRegister}>
                            <span className="register-header">Register</span>
                            <input type="text" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
                            <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <input type="text" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit">Register</button>
                            <a className="sign-in-link" href="/sign-in"> Login?</a>
                            <span className="statusText"></span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;