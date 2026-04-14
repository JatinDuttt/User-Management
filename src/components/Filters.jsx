function Filters({ filters, onChange, onClear }) {
    return (
        <section className="panel controls-panel">
            <div className="panel-heading">
                <div>
                    <p className="panel-kicker">Search and sort</p>
                    <h2>Browse Users</h2>
                </div>
            </div>

            <div className="controls-grid">
                <label>
                    <span>Search</span>
                    <input
                        name="query"
                        onChange={onChange}
                        placeholder="Search name, email, mobile, or role"
                        type="text"
                        value={filters.query}
                    />
                </label>

                <label>
                    <span>Filter by Role</span>
                    <select name="role" onChange={onChange} value={filters.role}>
                        <option value="All">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Support">Support</option>
                        <option value="User">User</option>
                    </select>
                </label>

                <label>
                    <span>Sort</span>
                    <select name="sort" onChange={onChange} value={filters.sort}>
                        <option value="recent">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="name-asc">Name A-Z</option>
                        <option value="name-desc">Name Z-A</option>
                    </select>
                </label>

                <button className="secondary-button wide-button" type="button" onClick={onClear}>
                    Clear Filters
                </button>
            </div>
        </section>
    );
}

export default Filters;
