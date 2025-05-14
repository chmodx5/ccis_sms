/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    PrismaClient,
    Gender,
    StaffType,
    // Prisma.StaffDesignationCreateInput, // Only if needed for explicit typing
} from "@prisma/client";
import { faker } from "@faker-js/faker";

// Defines the standard staff designations
export const STAFF_DESIGNATIONS = [
    "teacher",
    "assistant teacher",
    "accountant",
    "hr",
    "procurement",
    "cook",
];

// Separates designation names for easier assignment
const TEACHER_DESIGNATION_NAMES = ["teacher", "assistant teacher"];
const NON_TEACHER_DESIGNATION_NAMES = [
    "accountant",
    "hr",
    "procurement",
    "cook",
];

/**
 * Ensures all defined staff designations exist in the database, creating them if necessary.
 * @param prisma - The PrismaClient instance.
 * @returns A map of designation names to their database IDs.
 */
async function getOrCreateDesignations(
    prisma: PrismaClient
): Promise<Record<string, string>> {
    console.log("⏳ Ensuring staff designations exist...");
    const existingDesignations = await prisma.staffDesignation.findMany();
    const existingDesignationNames = existingDesignations.map((d) => d.name);

    const designationsToCreate = STAFF_DESIGNATIONS.filter(
        (name) => !existingDesignationNames.includes(name)
    );

    if (designationsToCreate.length > 0) {
        console.log(
            `✨ Creating missing designations: ${designationsToCreate.join(
                ", "
            )}`
        );
        await prisma.staffDesignation.createMany({
            data: designationsToCreate.map((name) => ({ name })),
            // skipDuplicates: true, // Avoid errors if a race condition occurred (unlikely in seeding)
        });
    }
    const allDesignations = await prisma.staffDesignation.findMany();
    const designationsMap: Record<string, string> = {};
    allDesignations.forEach((d) => {
        designationsMap[d.name] = d.id;
    });
    console.log("✅ Staff designations ensured.");
    return designationsMap;
}

/**
 * Seeds the database with staff members, including teachers and non-teaching staff.
 * @param params - An object containing the number of teachers and non-teachers to create.
 * @param prisma - The PrismaClient instance.
 */
export async function seedStaff(
    params: { teachers: number; non_teacher: number },
    prisma: PrismaClient
) {
    console.log("🌱 Starting staff seeding process...");

    // Step 1: Ensure all staff designations are in the DB and get their IDs
    const designationsMap = await getOrCreateDesignations(prisma);

    // Step 2: Delete existing staff data in the correct order to avoid foreign key violations
    console.log("⏳ Deleting existing staff data...");
    await prisma.staffEmergencyContact.deleteMany();
    await prisma.residentTeachingStaffProfile.deleteMany();
    await prisma.residentNonTeachingStaffProfile.deleteMany();
    await prisma.internationalTeachingStaffProfile.deleteMany();
    await prisma.internationalNonTeachingStaffProfile.deleteMany();
    // Staff records are deleted after their dependent profile and contact records
    await prisma.staff.deleteMany();
    console.log("✅ Deleted all existing staff data successfully.");

    const staffToGenerate: any[] = []; // Array to hold generated staff data before DB insertion
    let staffIdxCounter = 0; // Counter for generating unique staff IDs

    // Helper to generate fake attachment URLs, similar to seedStudents
    const generateAttachmentUrl = () => faker.image.url();

    // Step 3: Generate data for Teacher staff members
    console.log(`⚙️ Generating ${params.teachers} teacher records...`);
    for (let i = 0; i < params.teachers; i++) {
        staffIdxCounter++;
        const gender = faker.helpers.arrayElement([Gender.male, Gender.female]);
        const designationName = faker.helpers.arrayElement(
            TEACHER_DESIGNATION_NAMES
        );
        const designationId = designationsMap[designationName];

        if (!designationId) {
            console.error(
                `❌ Critical Error: Designation ID for '${designationName}' not found. Skipping teacher generation.`
            );
            continue;
        }

        const staffType = faker.helpers.arrayElement([
            StaffType.resident_teaching_staff,
            StaffType.international_teaching_staff,
        ]);

        const yearsOfWorkExperience = faker.number.int({ min: 1, max: 35 }); // Teachers usually have some experience
        // Date of employment is in the past, capped by experience or a max of 20 years at CCIS
        const dateOfEmployment = faker.date.past({
            years: Math.min(20, yearsOfWorkExperience),
        });

        const currentYear = new Date().getFullYear();
        let calculatedNoOfYearsAtCCIS =
            currentYear - dateOfEmployment.getFullYear();
        const currentMonth = new Date().getMonth();
        const employmentMonth = dateOfEmployment.getMonth();
        // Adjust if employment was later in the current year than the current month/day
        if (
            employmentMonth > currentMonth ||
            (employmentMonth === currentMonth &&
                dateOfEmployment.getDate() > new Date().getDate())
        ) {
            calculatedNoOfYearsAtCCIS = Math.max(
                0,
                calculatedNoOfYearsAtCCIS - 1
            );
        }
        calculatedNoOfYearsAtCCIS = Math.max(0, calculatedNoOfYearsAtCCIS); // Ensure non-negative
        // Years at CCIS cannot exceed total work experience
        const noOfYearsAtCCIS = Math.min(
            calculatedNoOfYearsAtCCIS,
            yearsOfWorkExperience
        );

        const staffMember: any = {
            staffId: `STF-${staffIdxCounter.toString().padStart(5, "0")}`, // e.g., STF-00001
            firstName: faker.person.firstName(gender),
            middleName: faker.person.firstName(gender),
            surname: faker.person.lastName(),
            gender,
            dateOfBirth: faker.date.birthdate({
                min: 22,
                max: 60,
                mode: "age",
            }), // Min age for teachers
            nationality: faker.location.country(),
            designationId,
            dateOfEmployment,
            highestQualification: faker.lorem.words(
                faker.number.int({ min: 2, max: 4 })
            ),
            yearsOfWorkExperience,
            noOfYearsAtCCIS,
            resumeURL:
                faker.internet.url() +
                "/resume_" +
                faker.system.commonFileName("pdf"),
            staffType,
            comment: faker.lorem.sentence(),
            profileData: {}, // Placeholder for profile-specific data
            emergencyContactsData: [], // Placeholder for emergency contacts
        };

        // Generate 1-2 emergency contacts for the staff member
        const numEmergencyContacts = faker.number.int({ min: 1, max: 2 });
        for (let j = 0; j < numEmergencyContacts; j++) {
            staffMember.emergencyContactsData.push({
                fullNames: faker.person.fullName(),
                relationship: faker.helpers.arrayElement([
                    "spouse",
                    "parent",
                    "sibling",
                    "friend",
                    "child",
                ]),
                contactPhone: faker.phone.number(),
                whatsapp: faker.phone.number(), // Can be the same or different
            });
        }

        // Define common fields for resident and international profiles
        const commonResidentProfileFields = {
            nationalIdNo: faker.string.alphanumeric({
                length: 8,
                casing: "upper",
            }),
            nationalIdAttachment: generateAttachmentUrl(),
            nssfNo: faker.string.alphanumeric({ length: 10, casing: "upper" }),
            nssfAttachment: generateAttachmentUrl(),
            tinNo: faker.string.alphanumeric({ length: 10, casing: "upper" }),
            tinAttachment: generateAttachmentUrl(),
        };
        const commonInternationalProfileFields = {
            workPermitNo: faker.string.alphanumeric({
                length: 12,
                casing: "upper",
            }),
            workPermitExpirationDate: faker.date.future({ years: 3 }),
            workPermitAttachment: generateAttachmentUrl(),
            residentPermitNo: faker.string.alphanumeric({
                length: 12,
                casing: "upper",
            }),
            residentPermitExpirationDate: faker.date.future({ years: 3 }),
            residentPermitAttachment: generateAttachmentUrl(),
            passportNo: faker.string.alphanumeric({
                length: 9,
                casing: "upper",
            }),
            passportExpirationDate: faker.date.future({ years: 5 }),
            passportAttachment: generateAttachmentUrl(),
        };

        // Populate profileData based on the assigned staffType
        switch (staffType) {
            case StaffType.resident_teaching_staff:
                staffMember.profileData = {
                    ...commonResidentProfileFields,
                    teachingLicenseNo: faker.string.alphanumeric({
                        length: 10,
                        casing: "upper",
                    }),
                    teachingLicenseAttachment: generateAttachmentUrl(),
                };
                break;
            case StaffType.international_teaching_staff:
                staffMember.profileData = {
                    ...commonInternationalProfileFields,
                    tcuNo: faker.string.alphanumeric({
                        length: 10,
                        casing: "upper",
                    }), // TCU specific to international teachers
                    tcuAttachment: generateAttachmentUrl(),
                    teachingLicenseNo: faker.string.alphanumeric({
                        length: 10,
                        casing: "upper",
                    }),
                    expirationDate: faker.date.future({ years: 3 }), // Expiration for teaching license
                    teachingLicenseAttachment: generateAttachmentUrl(),
                };
                break;
        }
        staffToGenerate.push(staffMember);
    }

    // Step 4: Generate data for Non-Teacher staff members
    console.log(`⚙️ Generating ${params.non_teacher} non-teacher records...`);
    for (let i = 0; i < params.non_teacher; i++) {
        staffIdxCounter++;
        const gender = faker.helpers.arrayElement([Gender.male, Gender.female]);
        const designationName = faker.helpers.arrayElement(
            NON_TEACHER_DESIGNATION_NAMES
        );
        const designationId = designationsMap[designationName];

        if (!designationId) {
            console.error(
                `❌ Critical Error: Designation ID for '${designationName}' not found. Skipping non-teacher generation.`
            );
            continue;
        }

        const staffType = faker.helpers.arrayElement([
            StaffType.resident_non_teaching_staff,
            StaffType.international_non_teaching_staff,
        ]);

        const yearsOfWorkExperience = faker.number.int({ min: 0, max: 30 }); // Non-teachers can be entry-level
        const dateOfEmployment = faker.date.past({
            years: Math.min(
                20,
                yearsOfWorkExperience > 0 ? yearsOfWorkExperience : 1
            ),
        });

        const currentYear = new Date().getFullYear();
        let calculatedNoOfYearsAtCCIS =
            currentYear - dateOfEmployment.getFullYear();
        const currentMonth = new Date().getMonth();
        const employmentMonth = dateOfEmployment.getMonth();
        if (
            employmentMonth > currentMonth ||
            (employmentMonth === currentMonth &&
                dateOfEmployment.getDate() > new Date().getDate())
        ) {
            calculatedNoOfYearsAtCCIS = Math.max(
                0,
                calculatedNoOfYearsAtCCIS - 1
            );
        }
        calculatedNoOfYearsAtCCIS = Math.max(0, calculatedNoOfYearsAtCCIS);
        const noOfYearsAtCCIS = Math.min(
            calculatedNoOfYearsAtCCIS,
            yearsOfWorkExperience
        );

        const staffMember: any = {
            staffId: `STF-${staffIdxCounter.toString().padStart(5, "0")}`,
            firstName: faker.person.firstName(gender),
            middleName: faker.person.firstName(gender),
            surname: faker.person.lastName(),
            gender,
            dateOfBirth: faker.date.birthdate({
                min: 18,
                max: 60,
                mode: "age",
            }), // Min age for non-teachers
            nationality: faker.location.country(),
            designationId,
            dateOfEmployment,
            highestQualification: faker.lorem.words(
                faker.number.int({ min: 1, max: 3 })
            ),
            yearsOfWorkExperience,
            noOfYearsAtCCIS,
            resumeURL:
                faker.internet.url() +
                "/resume_" +
                faker.system.commonFileName("pdf"),
            staffType,
            comment: faker.lorem.sentence(),
            profileData: {},
            emergencyContactsData: [],
        };

        const numEmergencyContacts = faker.number.int({ min: 1, max: 2 });
        for (let j = 0; j < numEmergencyContacts; j++) {
            staffMember.emergencyContactsData.push({
                fullNames: faker.person.fullName(),
                relationship: faker.helpers.arrayElement([
                    "spouse",
                    "parent",
                    "sibling",
                    "friend",
                    "child",
                ]),
                contactPhone: faker.phone.number(),
                whatsapp: faker.phone.number(),
            });
        }

        const commonResidentProfileFields = {
            nationalIdNo: faker.string.alphanumeric({
                length: 8,
                casing: "upper",
            }),
            nationalIdAttachment: generateAttachmentUrl(),
            nssfNo: faker.string.alphanumeric({ length: 10, casing: "upper" }),
            nssfAttachment: generateAttachmentUrl(),
            tinNo: faker.string.alphanumeric({ length: 10, casing: "upper" }),
            tinAttachment: generateAttachmentUrl(),
        };
        const commonInternationalProfileFields = {
            workPermitNo: faker.string.alphanumeric({
                length: 12,
                casing: "upper",
            }),
            workPermitExpirationDate: faker.date.future({ years: 3 }),
            workPermitAttachment: generateAttachmentUrl(),
            residentPermitNo: faker.string.alphanumeric({
                length: 12,
                casing: "upper",
            }),
            residentPermitExpirationDate: faker.date.future({ years: 3 }),
            residentPermitAttachment: generateAttachmentUrl(),
            passportNo: faker.string.alphanumeric({
                length: 9,
                casing: "upper",
            }),
            passportExpirationDate: faker.date.future({ years: 5 }),
            passportAttachment: generateAttachmentUrl(),
        };

        switch (staffType) {
            case StaffType.resident_non_teaching_staff:
                staffMember.profileData = { ...commonResidentProfileFields };
                break;
            case StaffType.international_non_teaching_staff:
                staffMember.profileData = {
                    ...commonInternationalProfileFields,
                };
                break;
        }
        staffToGenerate.push(staffMember);
    }

    // Step 5: Create staff records in the database
    if (staffToGenerate.length === 0) {
        console.log("ℹ️ No staff members to generate based on parameters.");
        console.log("🎉 Staff seeding process completed (no data added).");
        return;
    }

    console.log(
        `➕ Creating ${staffToGenerate.length} core staff records in the database...`
    );
    // Extract core staff data, excluding profile and emergency contact data which will be linked later
    const staffCoreData = staffToGenerate.map((s) => {
        const { profileData, emergencyContactsData, ...coreData } = s;
        return coreData;
    });

    // Batch create core staff records
    await prisma.staff.createMany({
        data: staffCoreData,
        // skipDuplicates: true, // Helpful if staffId generation could somehow clash (unlikely here)
    });
    console.log(`✅ Created ${staffCoreData.length} core staff records.`);

    // Step 6: Link profiles and emergency contacts to the created staff members
    console.log(
        `🔗 Linking profiles and emergency contacts for ${staffToGenerate.length} staff members...`
    );
    let linkedCount = 0;
    for (const [index, staffGenData] of staffToGenerate.entries()) {
        // Retrieve the just-created staff record by its unique staffId
        const createdStaff = await prisma.staff.findUnique({
            where: { staffId: staffGenData.staffId },
        });

        if (!createdStaff) {
            console.error(
                `❌ Failed to find created staff with staffId: ${staffGenData.staffId}. Skipping relations.`
            );
            continue;
        }

        // Create Emergency Contacts for the staff member
        if (staffGenData.emergencyContactsData.length > 0) {
            const contactsToCreate = staffGenData.emergencyContactsData.map(
                (contact: any) => ({
                    ...contact,
                    staffId: createdStaff.id, // Link to the created staff's database ID
                })
            );
            await prisma.staffEmergencyContact.createMany({
                data: contactsToCreate,
            });
        }

        // Create the specific Profile Data for the staff member
        const profilePayload = {
            ...staffGenData.profileData,
            staffId: createdStaff.id, // Link to the created staff's database ID
        };

        try {
            switch (staffGenData.staffType) {
                case StaffType.resident_teaching_staff:
                    await prisma.residentTeachingStaffProfile.create({
                        data: profilePayload,
                    });
                    break;
                case StaffType.resident_non_teaching_staff:
                    await prisma.residentNonTeachingStaffProfile.create({
                        data: profilePayload,
                    });
                    break;
                case StaffType.international_teaching_staff:
                    await prisma.internationalTeachingStaffProfile.create({
                        data: profilePayload,
                    });
                    break;
                case StaffType.international_non_teaching_staff:
                    await prisma.internationalNonTeachingStaffProfile.create({
                        data: profilePayload,
                    });
                    break;
            }
            linkedCount++;
            // console.log(`✅ Created relations for staff ${index + 1} (${staffGenData.staffId})`); // Can be too verbose for many records
        } catch (e: any) {
            console.error(
                `❌ Error creating profile for staff ${staffGenData.staffId} (DB ID: ${createdStaff.id}): ${e.message}`
            );
            // For detailed debugging, you might want to log: console.error("Profile Payload:", profilePayload);
        }

        console.log(
            `✅ Relations linked for staff ${index + 1} (${
                createdStaff.staffId
            })`
        );
    }

    console.log(
        `✅ ${linkedCount} staff members had their profiles and emergency contacts successfully linked.`
    );
    console.log(
        `🎉 Staff seeding process completed. Total staff processed: ${staffToGenerate.length}.`
    );
}

// Example of how to run this seeder (typically in a standalone seed.ts file)
/*
async function main() {
    const prisma = new PrismaClient();
    try {
        await seedStaff({ teachers: 5, non_teacher: 3 }, prisma);
    } catch (e) {
        console.error("An error occurred during seeding:", e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
*/
