import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function seedAdminUser(prisma: PrismaClient) {
    console.log("🚀 Starting admin user seeding process..."); // New log

    const passwordToHash = "admin123"; // Storing password in a variable for clarity
    console.log("🔑 Preparing to hash admin password..."); // New log
    const hashedPassword = await bcrypt.hash(passwordToHash, 10);
    console.log("🔒 Password hashed successfully."); // New log

    try {
        const adminEmail = "admin@sms.com";
        console.log(
            `🔍 Checking for existing admin user with email: ${adminEmail}...`
        ); // New log
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if (!existingAdmin) {
            console.log("🤔 Admin user not found, proceeding to create one."); // New log
            await prisma.user.create({
                data: {
                    name: "admin user",
                    username: "adminUser",
                    email: adminEmail,
                    password: hashedPassword,
                    role: "admin",
                },
            });

            console.log("Admin user created successfully. ✅");
        } else {
            console.log("Admin user already exists. ℹ️");
        }
    } catch (error) {
        console.error("Error creating/checking admin user: ❌", error);
        // throw error;
    }
    console.log("🏁 Finished admin user seeding process."); // New log
}
