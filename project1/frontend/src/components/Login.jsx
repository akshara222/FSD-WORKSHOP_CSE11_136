import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const response = await axios.post(
                "http://localhost:5000/api/login",
                {
                    email: email.trim(),
                    password: password
                }
            );

            console.log("LOGIN RESPONSE:", response.data);

            if (response.data.success) {
                onLogin(response.data.user);
            }

        } catch (error) {

            console.log("LOGIN ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Unable to connect to backend"
            );
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>PROJECT1</h1>

                <p className="login-title">
                    Account Login
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                </form>

                <div className="login-info">

                    <p>Demo Login</p>

                    <p>
                        Email: admin@project1.com
                    </p>

                    <p>
                        Password: admin123
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;