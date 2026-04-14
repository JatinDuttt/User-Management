function Hero({ totalUsers, onLoadDemo }) {
    return (
        <section className="hero">
            <div>
                <p className="eyebrow">Dynamic User Workspace</p>
                <h1>User Management Studio</h1>
                <p className="hero-copy">
                    Create, search, update, and organize users with reusable React
                    components, modular logic, and local storage persistence.
                </p>
            </div>

            <div className="hero-actions">
                <span className="status-pill">
                    {totalUsers} profile{totalUsers === 1 ? "" : "s"} synced locally
                </span>
                <button className="ghost-button" type="button" onClick={onLoadDemo}>
                    Load Demo Users
                </button>
            </div>
        </section>
    );
}

export default Hero;
