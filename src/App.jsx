import Dashboard from "./components/Dashboard";
import Filters from "./components/Filters";
import Hero from "./components/Hero";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { useUserDirectory } from "./hooks/useUserDirectory";

function App() {
    const {
        activity,
        filters,
        formState,
        isEditing,
        latestUser,
        message,
        roleGroups,
        totalUsers,
        visibleUsers,
        visibleUserList,
        updateField,
        updateFilter,
        clearFilters,
        handleSubmit,
        startEditMode,
        cancelEditMode,
        resetForm,
        deleteUser,
        loadDemoUsers
    } = useUserDirectory();

    return (
        <>
            <div className="page-aura page-aura-left"></div>
            <div className="page-aura page-aura-right"></div>

            <main className="app-shell">
                <Hero totalUsers={totalUsers} onLoadDemo={loadDemoUsers} />

                <section className="workspace-grid">
                    <UserForm
                        formState={formState}
                        isEditing={isEditing}
                        message={message}
                        onCancel={cancelEditMode}
                        onChange={updateField}
                        onReset={resetForm}
                        onSubmit={handleSubmit}
                    />

                    <Dashboard
                        activity={activity}
                        isEditing={isEditing}
                        latestUser={latestUser}
                        roleGroups={roleGroups}
                        totalUsers={totalUsers}
                        visibleUsers={visibleUsers}
                    />
                </section>

                <Filters filters={filters} onChange={updateFilter} onClear={clearFilters} />

                <UserTable
                    totalUsers={totalUsers}
                    users={visibleUserList}
                    onDelete={deleteUser}
                    onEdit={startEditMode}
                />
            </main>
        </>
    );
}

export default App;
