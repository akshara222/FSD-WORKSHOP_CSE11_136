import { useState } from "react";

function EditUser({ user, onUpdate, onCancel }) {

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [department, setDepartment] =
        useState(user.department);

    const handleSubmit = (e) => {

        e.preventDefault();

        onUpdate({
            ...user,
            name,
            email,
            department
        });
    };

    return (

        <div className="edit-overlay">

            <div className="edit-box">

                <h2>Edit User</h2>

                <form onSubmit={handleSubmit}>

                    <label>Name</label>

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <label>Email</label>

                    <input
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <label>Department</label>

                    <input
                        value={department}
                        onChange={(e) =>
                            setDepartment(e.target.value)
                        }
                    />

                    <div className="edit-actions">

                        <button
                            type="submit"
                            className="save-button"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditUser;