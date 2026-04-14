import { formatDate } from "../utils/date";

function Dashboard({
    activity,
    isEditing,
    latestUser,
    roleGroups,
    totalUsers,
    visibleUsers
}) {
    return (
        <article className="panel dashboard-panel">
            <div className="panel-heading">
                <div>
                    <p className="panel-kicker">Live insights</p>
                    <h2>Workspace Snapshot</h2>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="stats-grid">
                    <StatCard
                        helper="Saved in local storage"
                        label="Total Users"
                        value={String(totalUsers)}
                    />
                    <StatCard
                        helper="After active filters"
                        label="Visible Now"
                        value={String(visibleUsers)}
                    />
                    <StatCard
                        helper="High-access profiles"
                        label="Admins"
                        value={String(roleGroups.find((group) => group.role === "Admin")?.count ?? 0)}
                    />
                    <StatCard
                        helper={
                            isEditing
                                ? "Finish or cancel before switching tasks"
                                : latestUser
                                    ? `Joined ${formatDate(latestUser.createdAt)}`
                                    : "Add a profile to get started"
                        }
                        label={isEditing ? "Mode" : "Newest User"}
                        value={
                            isEditing
                                ? "Editing"
                                : latestUser
                                    ? latestUser.name.split(" ")[0]
                                    : "None"
                        }
                    />
                </div>

                <section className="activity-card">
                    <h3>Recent Activity</h3>
                    <ul className="activity-list">
                        {activity.length > 0 ? (
                            activity.map((item) => (
                                <li key={item.id}>
                                    <strong>{item.text}</strong>
                                    <span>{formatDate(item.time)}</span>
                                </li>
                            ))
                        ) : (
                            <li>No activity yet.</li>
                        )}
                    </ul>
                </section>

                <section className="role-card">
                    <h3>Role Distribution</h3>
                    <ul className="role-list">
                        {roleGroups.map((group) => (
                            <li className="role-row" key={group.role}>
                                <div className="role-label">
                                    <strong>{group.role}</strong>
                                    <div className="role-bar">
                                        <div
                                            className="role-bar-fill"
                                            style={{
                                                width: `${totalUsers === 0 ? 0 : (group.count / totalUsers) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <span>
                                    {group.count} user{group.count === 1 ? "" : "s"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </article>
    );
}

function StatCard({ helper, label, value }) {
    return (
        <article className="stat-card">
            <p className="stat-label">{label}</p>
            <p className="stat-number">{value}</p>
            <p className="stat-helper">{helper}</p>
        </article>
    );
}

export default Dashboard;
