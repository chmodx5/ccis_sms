import bcrypt from "bcryptjs";

/**
 * Hashes a password using bcrypt.
 * @param password - The plain text password to hash.
 * @returns The hashed password.
 */

export async function saltAndHashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    return await bcrypt.hash(password, saltRounds);
}
