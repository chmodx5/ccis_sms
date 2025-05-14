// seeders/seed-year-levels-and-classes.ts
import { PrismaClient } from "@prisma/client";

export async function seedClasses(prisma: PrismaClient) {
    console.log("📚 Starting class seeding process..."); // New log

    const classes = [
        { name: "dik dik" },
        { name: "impala" },
        { name: "year 1" },
        { name: "year 2" },
        { name: "year 3" },
        { name: "year 4" },
        { name: "year 5" },
        { name: "year 6" },
    ];
    console.log(`📋 Defined ${classes.length} classes to seed.`); // New log

    try {
        // delete all existing classes
        console.log("🗑️ Deleting existing classes...");
        await prisma.class.deleteMany({});
        console.log("✅ Existing classes deleted successfully.");

        // creating the new classes
        console.log("➕ Creating new classes...");
        const createClasses = await prisma.class.createMany({
            data: classes,
            // skipDuplicates: true, // Optional: uncomment if you want to avoid errors if a class somehow wasn't deleted and you re-run
        });
        console.log(`🎉 Created ${createClasses.count} classes successfully.`);
    } catch (error) {
        console.error("❌ Error seeding classes:", error);
    }
    console.log("🏁 Finished class seeding process."); // New log
}
