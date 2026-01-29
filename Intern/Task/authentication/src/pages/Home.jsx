import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"
const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        const currentUser = localStorage.getItem("currentUser");

        if (!isAuthenticated || !currentUser) {
            navigate("/");
        } else {
            setUser(JSON.parse(currentUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUser");
        navigate("/");
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile-container">
            <div className="profile">
                <div className="profile-nav">
                    <div >
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                    </div>
                </div>

                <div>
                    <img src={user.avatar} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.role}</p>
                </div>

                <div className="user-details">
                    <div>
                        <span>Email:</span>
                        <span>{user.email}</span>
                    </div>
                    <div>
                        <span>Phone:</span>
                        <span>{user.phone}</span>
                    </div>
                    <div>
                        <span>Address:</span>
                        <span>{user.address}</span>
                    </div>
                    <div>
                        <span>User ID:</span>
                        <span>{user.id}</span>
                    </div>
                    <div>
                        <span >Joined:</span>
                        <span>{user.joinedDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Home;