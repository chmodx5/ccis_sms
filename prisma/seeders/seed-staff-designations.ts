import { PrismaClient } from "@prisma/client";

export async function seedStaffDesignations(prisma: PrismaClient) {
    console.log("🚀 Starting staff designations seeding..."); // Added console.log at the beginning

    const STAFF_DESIGNATIONS = [
        "teacher",
        "assistant teacher",
        "accountant",
        "hr",
        "procurement",
        "cook",
    ];

    const data = STAFF_DESIGNATIONS.map((name) => ({ name }));

    try {
        // Delete all existing designations
        console.log("🗑️ Deleting existing staff designations...");
        await prisma.staffDesignation.deleteMany({});
        console.log("✅ Existing staff designations deleted successfully.");

        // Create new designations
        console.log("✨ Creating staff designations...");
        const createDesignations = await prisma.staffDesignation.createMany({
            data,
        });
        console.log(
            `🎉 Created ${createDesignations.count} staff designations.`
        );
        console.log("✅ Staff designations seeding completed successfully."); // Added success console.log at the end
    } catch (error) {
        console.error("❌ Error seeding staff designations:", error);
    }
}
