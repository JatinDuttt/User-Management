export function createId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `user-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export function createEmptyForm() {
    return {
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "User"
    };
}

export function buildActivityEntry(text) {
    return {
        id: createId(),
        text,
        time: new Date().toISOString()
    };
}

export function buildNewUser(user) {
    const now = new Date().toISOString();
    const createdAt = user.createdAt ?? now;
    const updatedAt = user.updatedAt ?? createdAt;

    return {
        id: createId(),
        name: user.name.trim(),
        email: user.email.trim(),
        mobile: user.mobile.trim(),
        password: user.password.trim(),
        role: user.role,
        createdAt,
        updatedAt
    };
}

export function buildUpdatedUser(currentUser, formState) {
    return {
        ...currentUser,
        name: formState.name.trim(),
        email: formState.email.trim(),
        mobile: formState.mobile.trim(),
        password: formState.password.trim(),
        role: formState.role,
        updatedAt: new Date().toISOString()
    };
}

export function filterAndSortUsers(users, filters) {
    const query = filters.query.trim().toLowerCase();

    const filteredUsers = users.filter((user) => {
        const matchesQuery = query === ""
            || [user.name, user.email, user.mobile, user.role]
                .join(" ")
                .toLowerCase()
                .includes(query);
        const matchesRole = filters.role === "All" || user.role === filters.role;
        return matchesQuery && matchesRole;
    });

    return [...filteredUsers].sort((left, right) => {
        switch (filters.sort) {
            case "oldest":
                return new Date(left.createdAt) - new Date(right.createdAt);
            case "name-asc":
                return left.name.localeCompare(right.name);
            case "name-desc":
                return right.name.localeCompare(left.name);
            case "recent":
            default:
                return new Date(right.createdAt) - new Date(left.createdAt);
        }
    });
}

export function getLatestUser(users) {
    return [...users].sort(
        (left, right) => new Date(right.createdAt) - new Date(left.createdAt)
    )[0] ?? null;
}

export function getRoleGroups(users) {
    return ["Admin", "Manager", "Support", "User"].map((role) => ({
        role,
        count: users.filter((user) => user.role === role).length
    }));
}

export function maskPassword(password) {
    return "*".repeat(Math.max(4, Math.min(password.length, 10)));
}
