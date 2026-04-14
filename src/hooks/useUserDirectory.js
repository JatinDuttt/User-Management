import { useEffect, useState } from "react";
import { DEMO_USERS } from "../data/demoUsers";
import { loadCollection, saveCollection } from "../lib/storage";
import { STORAGE_KEYS } from "../utils/constants";
import { validateUser } from "../utils/validation";
import {
    buildActivityEntry,
    buildNewUser,
    buildUpdatedUser,
    createEmptyForm,
    filterAndSortUsers,
    getLatestUser,
    getRoleGroups
} from "../utils/userTransforms";

export function useUserDirectory() {
    const [users, setUsers] = useState(() => loadCollection(STORAGE_KEYS.users, []));
    const [activity, setActivity] = useState(() =>
        loadCollection(STORAGE_KEYS.activity, [buildActivityEntry("Workspace loaded")])
    );
    const [formState, setFormState] = useState(createEmptyForm);
    const [filters, setFilters] = useState({
        query: "",
        role: "All",
        sort: "recent"
    });
    const [editingUserId, setEditingUserId] = useState(null);
    const [message, setMessage] = useState({ text: "", type: "success" });

    useEffect(() => {
        saveCollection(STORAGE_KEYS.users, users);
    }, [users]);

    useEffect(() => {
        saveCollection(STORAGE_KEYS.activity, activity);
    }, [activity]);

    const visibleUserList = filterAndSortUsers(users, filters);
    const latestUser = getLatestUser(users);
    const roleGroups = getRoleGroups(users);

    function updateField(event) {
        const { name, value } = event.target;
        setFormState((current) => ({
            ...current,
            [name]: value
        }));
    }

    function updateFilter(event) {
        const { name, value } = event.target;
        setFilters((current) => ({
            ...current,
            [name]: value
        }));
    }

    function clearFilters() {
        setFilters({
            query: "",
            role: "All",
            sort: "recent"
        });
    }

    function resetForm() {
        setEditingUserId(null);
        setFormState(createEmptyForm());
        setMessage({ text: "", type: "success" });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validationError = validateUser(formState, users, editingUserId);
        if (validationError) {
            setMessage({ text: validationError, type: "error" });
            return;
        }

        if (editingUserId) {
            setUsers((current) =>
                current.map((user) =>
                    user.id === editingUserId ? buildUpdatedUser(user, formState) : user
                )
            );
            pushActivity(`Updated ${formState.name}`);
            setMessage({ text: "User updated successfully.", type: "success" });
        } else {
            setUsers((current) => [buildNewUser(formState), ...current]);
            pushActivity(`Added ${formState.name} as ${formState.role}`);
            setMessage({ text: "User added successfully.", type: "success" });
        }

        setEditingUserId(null);
        setFormState(createEmptyForm());
    }

    function startEditMode(userId) {
        const target = users.find((user) => user.id === userId);
        if (!target) {
            return;
        }

        setEditingUserId(userId);
        setFormState({
            name: target.name,
            email: target.email,
            mobile: target.mobile,
            password: target.password,
            role: target.role
        });
        setMessage({
            text: `Editing ${target.name}. Update the fields and save.`,
            type: "success"
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function cancelEditMode() {
        resetForm();
    }

    function deleteUser(userId) {
        const target = users.find((user) => user.id === userId);
        if (!target) {
            return;
        }

        const confirmed = window.confirm(`Delete ${target.name} from the directory?`);
        if (!confirmed) {
            return;
        }

        setUsers((current) => current.filter((user) => user.id !== userId));
        if (editingUserId === userId) {
            setEditingUserId(null);
            setFormState(createEmptyForm());
        }
        pushActivity(`Deleted ${target.name}`);
        setMessage({ text: "User deleted successfully.", type: "success" });
    }

    function loadDemoUsers() {
        const shouldReplace = users.length > 0
            ? window.confirm("Replace current users with demo data?")
            : true;

        if (!shouldReplace) {
            return;
        }

        setUsers(DEMO_USERS.map((user) => buildNewUser(user)));
        setActivity([buildActivityEntry("Loaded demo users")]);
        setEditingUserId(null);
        setFormState(createEmptyForm());
        setMessage({ text: "Demo users loaded.", type: "success" });
        clearFilters();
    }

    function pushActivity(text) {
        setActivity((current) => [buildActivityEntry(text), ...current].slice(0, 8));
    }

    return {
        activity: activity.slice(0, 5),
        filters,
        formState,
        isEditing: editingUserId !== null,
        latestUser,
        message,
        roleGroups,
        totalUsers: users.length,
        visibleUsers: visibleUserList.length,
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
    };
}
