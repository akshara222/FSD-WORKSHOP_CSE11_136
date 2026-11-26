function UserTable({ users, onEdit, onDelete }) {

    return (

        <table className="user-table">

            <thead>

                <tr>

                    <th>S.No.</th>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Department</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {users.map((user, index) => (

                    <tr key={user.id}>

                        <td>
                            {index + 1}
                        </td>

                        <td>
                            {user.id}
                        </td>

                        <td>
                            {user.name}
                        </td>

                        <td>
                            {user.email}
                        </td>

                        <td>
                            {user.department}
                        </td>

                        <td className="actions">

                            <button
                                className="edit-button"
                                onClick={() => onEdit(user)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-button"
                                onClick={() => onDelete(user.id)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default UserTable;