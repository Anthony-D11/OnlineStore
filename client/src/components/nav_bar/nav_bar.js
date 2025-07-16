import React, {useState, useEffect, useContext} from "react";

import './nav_bar.css';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

const base_url = process.env["REACT_APP_BACKEND_URL"];
const user_url = base_url + "/users";

function NavBar() {
    const [scrolled, setNavBar] = useState(false);
    const [smallScreen, setSmall] = useState(false);
    const [ userState, setUserState ] = useState({});
    const location = useLocation();

    window.addEventListener("scroll", (event) => {
        if (window.scrollY > 0) setNavBar(true);
        else setNavBar(false);
    });
    
    const setSize = () => {
        if(window.innerWidth < 768) {
            setSmall(true);
        }
        else setSmall(false);
    };

    useEffect(() => {
        setSize();

    }, []);


    useEffect(() => {
        async function checkLoggedIn() {
            try {
                const res = await axios.get(user_url + "/status?timestamp=" + Date.now().toString(), { withCredentials: true })
                setUserState({ "isLoggedIn": true, "user": res.data });
            } catch (err) {
                setUserState({ "isLoggedIn": false });
                if (err.status !== 401) {
                    console.error(err);
                }
            }
        }
        
    }, [location.pathname]);

    const handleSignOut = () => {
        axios.get(user_url + "/sign-out", { withCredentials: true })
        .then((res) => {
            setUserState({ "isLoggedIn": false});
            window.location.reload();
        })
        .catch((err) => {
            console.error(err);
        });
    }

    window.addEventListener("resize", setSize);
    return (
        <nav className={`navbar navbar-expand-md navbar-light fixed-top ${scrolled? 'scrolled': ''}`}>
            <div className="container">
                <Link to="/" className="d-flex navbar-brand"><strong>Online Store</strong></Link>
                <div className="navbar-collapse collapse">
                    <div className="ms-auto navbar-nav">
                        {!userState.isLoggedIn ?
                        (<div className="nav-item">
                            <Link to="/sign-in" className="nav-link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                                    &nbsp;Log in/ Register
                            </Link>
                        </div>):
                        (<>
                            <div className="nav-item">
                                <span className="greet-user">Hello {userState["user"]["name"]}</span>
                            </div>
                            <div className="nav-item">
                                <Link to="/change-password" className="nav-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                                        &nbsp;Change password
                                </Link>
                            </div>
                            <div className="nav-item">
                                <Link to="#" onClick={handleSignOut} className="nav-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                                        &nbsp;Logout
                                </Link>
                            </div>
                        </>)
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;