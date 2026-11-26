import { useState } from "react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {

    const [loggedInUser, setLoggedInUser] =
        useState(null);

    const handleLogin = (user) => {

        setLoggedInUser(user);

    };

    const handleLogout = () => {

        setLoggedInUser(null);

    };

    return (

        <>
            {loggedInUser ? (

                <Dashboard
                    loggedInUser={loggedInUser}
                    onLogout={handleLogout}
                />

            ) : (

                <Login
                    onLogin={handleLogin}
                />

            )}
        </>

    );
}

export default App;