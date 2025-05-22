export function getInitials(name?: string | null) {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    return parts.length >= 2
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : parts[0][0].toUpperCase();
}
