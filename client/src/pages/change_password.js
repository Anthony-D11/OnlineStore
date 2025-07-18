import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import $ from 'jquery';
import validateInput from "../input_validation";

export default function ChangePassword () {
    const base_url = process.env["REACT_APP_BACKEND_URL"];
    const api_url = base_url + "/users/change-password";
    const [newPassword, setNewPassword] = useState("");
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const navigate = useNavigate();

    const handleChangePassword = async (event) => {
        event.preventDefault();
        let validationResult = validateInput("username", username);
        if (!validationResult.isValid) {
            alert(validationResult.error);
            return;
        }
        validationResult = validateInput("password", oldPassword);
        if (!validationResult.isValid) {
            alert(validationResult.error);
            return;
        }
        validationResult = validateInput("password", newPassword);
        if (!validationResult.isValid) {
            alert(validationResult.error);
            return;
        }
        try {
            let payload = {
                "username": username,
                "old_password": oldPassword,
                "new_password": newPassword
            }
            const response = await axios.post(api_url, payload, {withCredentials: true});
            if (response.status != 200) {
                throw response.statusText;
            }
            $(".statusText").text(response.statusText);
            $(".statusText").removeClass("error");
            $(".statusText").addClass("success");
            setUsername("");
            setOldPassword("");
            setNewPassword("");
            alert("Change password successfully!");
            navigate("/");

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
                        <form className="register" onSubmit={handleChangePassword}>
                            <span className="register-header">Change password</span>
                            <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <input type="text" name="password" placeholder="Old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                            <input type="text" name="new_password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            <button type="submit">Change password</button>
                            <span className="statusText"></span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
