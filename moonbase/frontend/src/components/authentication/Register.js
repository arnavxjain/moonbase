import React, { useState } from 'react';
import Button from '../page/Button';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useTitleEffect } from '../../functions/main';

function Register() {

    const [passwordShowState, setShowState] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    const [currentError, setCurrentError] = useState([false, null]);

    const toggleShowState = () => {
        setShowState(state => !state);
    }

    useTitleEffect("Register | Moonbase");

    const registerUser = () => {
        axios.post("http://localhost:5500/auth/register", {
            username: username,
            email: email,
            password: password,
            conPassword: conPassword,
            firstname: firstname,
            lastname: lastname
        }).then((res) => {
            if (res.data.message) {
                setCurrentError([true, res.data.message]);

                setTimeout(() => {
                    setCurrentError([false, null])
                }, 3000);
            }
        })
    }

    return (
        <div className="mb-reg">
            <h1 className="mb-title">moonbase</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <h2 align="center">Register</h2>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="First Name" />
                <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Last Name" />
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
                <input value={conPassword} onChange={(e) => setConPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                <Button onClick={registerUser} className="mb-reg-final" disabled={!username || !password ? true : false} text="Register" />
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                    Already have an account?
                    <Link className="links" to="/login">Log In Here</Link>
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

export default Register;
