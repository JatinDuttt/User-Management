export function validateUser(user, existingUsers, editingUserId) {
    if (!user.name || !user.email || !user.mobile || !user.password) {
        return "All fields are required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        return "Enter a valid email address.";
    }

    if (!/^[+\d\s-]{7,20}$/.test(user.mobile)) {
        return "Enter a valid mobile number.";
    }

    if (user.password.length < 4) {
        return "Password should be at least 4 characters.";
    }

    const duplicateUser = existingUsers.find(
        (entry) =>
            entry.email.toLowerCase() === user.email.toLowerCase()
            && entry.id !== editingUserId
    );

    if (duplicateUser) {
        return "A user with this email already exists.";
    }

    return "";
}
