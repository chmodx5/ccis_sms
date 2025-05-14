import { PrismaClient } from "@prisma/client";

export async function seedAcademicYears(prisma: PrismaClient) {
    const academicYears = [
        { name: "2020-2021" },
        { name: "2021-2022" },
        { name: "2022-2023" },
        { name: "2023-2024" },
        { name: "2024-2025" }, // As of May 2025, this is the current academic year.
        { name: "2025-2026" },
    ];

    const data = academicYears.map((year) => ({
        name: year.name,
        startDate: new Date(`${year.name.split("-")[0]}-01-01`),
        endDate: new Date(`${year.name.split("-")[1]}-12-31`),
    }));

    try {
        // delete all existing academic years
        console.log("🗑️ Deleting existing academic years...");
        await prisma.academicYear.deleteMany({});
        console.log("✅ Existing academic years deleted successfully.");

        // creating the new academic years
        console.log("✨ Creating academic years...");
        const createAcademicYears = await prisma.academicYear.createMany({
            data,
        });
        console.log(`✅ Created ${createAcademicYears.count} academic years.`);
    } catch (error) {
        console.error("❌ Error seeding academic years:", error);
    }
}
