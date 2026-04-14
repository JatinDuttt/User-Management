const ROLE_OPTIONS = ["User", "Admin", "Manager", "Support"];

function UserForm({
    formState,
    isEditing,
    message,
    onCancel,
    onChange,
    onReset,
    onSubmit
}) {
    return (
        <article className="panel form-panel">
            <div className="panel-heading">
                <div>
                    <p className="panel-kicker">Manage profiles</p>
                    <h2>{isEditing ? `Editing ${formState.name || "User"}` : "Add New User"}</h2>
                </div>
                <button className="text-button" type="button" onClick={onReset}>
                    Clear Form
                </button>
            </div>

            <form className="user-form" onSubmit={onSubmit}>
                <label>
                    <span>Full Name</span>
                    <input
                        autoComplete="off"
                        name="name"
                        onChange={onChange}
                        placeholder="Aarav Sharma"
                        type="text"
                        value={formState.name}
                    />
                </label>

                <label>
                    <span>Email Address</span>
                    <input
                        autoComplete="off"
                        name="email"
                        onChange={onChange}
                        placeholder="aarav@example.com"
                        type="email"
                        value={formState.email}
                    />
                </label>

                <label>
                    <span>Mobile Number</span>
                    <input
                        autoComplete="off"
                        name="mobile"
                        onChange={onChange}
                        placeholder="+91 98765 43210"
                        type="tel"
                        value={formState.mobile}
                    />
                </label>

                <div className="inline-fields">
                    <label>
                        <span>Password</span>
                        <input
                            autoComplete="off"
                            name="password"
                            onChange={onChange}
                            placeholder="Minimum 4 characters"
                            type="password"
                            value={formState.password}
                        />
                    </label>

                    <label>
                        <span>Role</span>
                        <select name="role" onChange={onChange} value={formState.role}>
                            {ROLE_OPTIONS.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="button-row">
                    <button className="primary-button" type="submit">
                        {isEditing ? "Update User" : "Save User"}
                    </button>

                    {isEditing ? (
                        <button className="secondary-button" type="button" onClick={onCancel}>
                            Cancel Edit
                        </button>
                    ) : null}
                </div>
            </form>

            <p className={`form-message ${message.type === "error" ? "is-error" : ""}`}>
                {message.text}
            </p>
        </article>
    );
}

export default UserForm;
