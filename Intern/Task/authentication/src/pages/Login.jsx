import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import usersData from "../data/users.json";
import "./login.css"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated === "true") {
            navigate("/home");
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        const user = usersData.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            const { password,...userWithoutPassword } = user;
            console.log(userWithoutPassword,password);
            
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
            navigate("/home");
        } else {
            setError("Invalid email or password!");
        }
    };

    return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin} >
                    {error && <div className="error">{error}</div>}
                    
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-btn" >Login</button>
                </form>
               
                
                
            </div>
    );
};



export default Login;