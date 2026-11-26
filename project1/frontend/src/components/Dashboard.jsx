import { useEffect, useState } from "react";
import axios from "axios";

import UserTable from "./UserTable";
import EditUser from "./EditUser";

function Dashboard({ loggedInUser, onLogout }) {

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] =
        useState(null);

    // -------------------------
    // GET USERS
    // -------------------------

    const fetchUsers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/users"
            );

            setUsers(response.data);

        } catch (error) {

            console.log("Error fetching users", error);

        }
    };

    useEffect(() => {

        fetchUsers();

    }, []);

    // -------------------------
    // DELETE USER
    // -------------------------

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:5000/api/users/${id}`
            );

            fetchUsers();

        } catch (error) {

            console.log("Delete error", error);

        }
    };

    // -------------------------
    // EDIT USER
    // -------------------------

    const handleUpdate = async (updatedUser) => {

        try {

            await axios.put(
                `http://localhost:5000/api/users/${updatedUser.id}`,
                updatedUser
            );

            setSelectedUser(null);

            fetchUsers();

        } catch (error) {

            console.log("Update error", error);

        }
    };

    return (

        <div className="dashboard">

            <header className="dashboard-header">

                <div>

                    <p className="small-heading">
                        Account Dashboard
                    </p>

                    <h1>
                        Users
                    </h1>

                </div>

                <div className="welcome-section">

                    <p>
                        Welcome,
                    </p>

                    <strong>
                        {loggedInUser.name}
                    </strong>

                    <button
                        className="logout-button"
                        onClick={onLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>

            <main className="dashboard-content">

                <div className="table-heading">

                    <h2>
                        User Accounts
                    </h2>

                </div>

                <UserTable
                    users={users}
                    onEdit={setSelectedUser}
                    onDelete={handleDelete}
                />

            </main>

            {selectedUser && (

                <EditUser
                    user={selectedUser}
                    onUpdate={handleUpdate}
                    onCancel={() =>
                        setSelectedUser(null)
                    }
                />

            )}

        </div>
    );
}

export default Dashboard;