import { PrismaClient } from "@prisma/client";
import { seedAdminUser } from "./seeders/seed-admin-user";
import { seedAcademicYears } from "./seeders/seed-academic-years";
import { seedClasses } from "./seeders/seed-classes";
import { seedStaffDesignations } from "./seeders/seed-staff-designations";
import { seedStudents } from "./seeders/seed-student";
import { seedStaff } from "./seeders/seed-staff";

const prisma = new PrismaClient(); // Initialize Prisma client *only once*

async function main() {
    try {
        await seedAdminUser(prisma);
        await seedClasses(prisma);
        await seedAcademicYears(prisma);
        await seedStaffDesignations(prisma);
        await seedStudents(250, prisma);
        await seedStaff(
            {
                teachers: 32,
                non_teacher: 29,
            },
            prisma
        );
    } catch (error) {
        console.error("Error during seeding:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
