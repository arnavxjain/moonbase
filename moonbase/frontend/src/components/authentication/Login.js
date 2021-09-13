import React, { useState } from 'react';
import Button from '../page/Button';
import { Link } from 'react-router-dom';
import { localExport, useTitleEffect } from '../../functions/main';
import axios from "axios"

function Login() {

    const [passwordShowState, setShowState] = useState(false);

    useTitleEffect("Log in to Moonbase");
    // useCustoms();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const toggleShowState = () => {
        setShowState(state => !state);
    }

    const [currentError, setCurrentError] = useState([false, null]);

    const login = () => {
        axios.post("http://localhost:5500/auth/login", {
            username: username,
            password: password
        })
            .then((res) => {
                if (res.data.message) {
                    setCurrentError([true, res.data.message]);

                    setTimeout(() => {
                        setCurrentError([false, null])
                    }, 3000);
                } else {
                    localExport(res.data.userObject);
                    window.location.href = "/home";
                }
            });
    }

    return (
        <div className="mb-login">
            <h1 className="mb-title">moonbase</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <h2 align="center">Login</h2>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordShowState ? "text" : "password"} placeholder="Password" />
                    {
                        !passwordShowState ? (
                            <i className="far fa-eye-slash" onClick={toggleShowState}></i>
                        ) : (
                            <i className="far fa-eye" onClick={toggleShowState}></i>
                        )
                    }
                </div>
                <Button onClick={login} className="mb-reg-final" disabled={!username || !password ? true : false} text="Login" />
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                    Don't have an account?
                    <Link className="links" to="/register">Sign Up Here</Link>
                </p>
                {
                    currentError[0] && (
                        <p className="mb-error-span">
                            <i className="fas fa-exclamation-circle"></i>
                            <span>{currentError[1]}</span>
                        </p>
                    )
                }
            </form>
            <footer>
                All Rights Reserved • Moonbase 2021
            </footer>
        </div>
    )
}

export default Login;
