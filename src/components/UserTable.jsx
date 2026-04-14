import { formatDate } from "../utils/date";
import { maskPassword } from "../utils/userTransforms";

function UserTable({ totalUsers, users, onDelete, onEdit }) {
    return (
        <section className="panel table-panel">
            <div className="table-meta">
                <div>
                    <p className="panel-kicker">Directory</p>
                    <h2>User List</h2>
                </div>
                <p className="table-count">
                    {users.length} user{users.length === 1 ? "" : "s"}
                </p>
            </div>

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Role</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td className="empty-state" colSpan="7">
                                    {totalUsers === 0
                                        ? "No users yet. Add your first profile or load demo users."
                                        : "No users match the current filters."}
                                </td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="table-name">
                                            <strong>{user.name}</strong>
                                            <span>Updated {formatDate(user.updatedAt)}</span>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>
                                        <span className="role-badge">{user.role}</span>
                                    </td>
                                    <td>
                                        <span className="password-mask">{maskPassword(user.password)}</span>
                                    </td>
                                    <td>
                                        <div className="actions-cell">
                                            <button
                                                className="action-button"
                                                type="button"
                                                onClick={() => onEdit(user.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="action-button delete"
                                                type="button"
                                                onClick={() => onDelete(user.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default UserTable;
