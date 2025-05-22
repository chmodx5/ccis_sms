/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    PrismaClient,
    Gender,
    PreferredContact,
    GuardianRelationship,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function seedStudents(count: number = 10, prisma: PrismaClient) {
    console.log("🌱 Starting student seeding process..."); // Added emoji

    console.log("⏳ Looking for classes ....");
    const classes = await prisma.class.findMany();
    console.log("⏳ Looking for academic years ....");
    const academicYears = await prisma.academicYear.findMany();

    if (!classes.length || !academicYears.length) {
        console.error(
            "❌ Classes or Academic Years are missing. Seed those first."
        );
        return;
    }

    console.log(`✅ Found ${classes.length} classes`);
    console.log(`✅ Found ${academicYears.length} academic years`);

    console.log("🗑️ Deleting existing students..."); // Changed emoji
    await prisma.student.deleteMany(); // Clears out all students
    console.log("✅ Deleted all students successfully");

    console.log(`⚙️ Generating data for ${count} students...`); // Added emoji
    const studentData = Array.from({ length: count }).map((_, index) => {
        const gender = faker.helpers.arrayElement(["male", "female"]) as Gender;
        const dob = faker.date.birthdate({ min: 6, max: 12, mode: "age" });
        const expiryDate = faker.date.future({ years: 2 });

        const numGuardians = faker.number.int({ min: 1, max: 2 });
        const numEmergencyContacts = faker.number.int({ min: 1, max: 5 });
        const numDoctors = faker.number.int({ min: 0, max: 3 });
        const registrationNo = `ccis-${(index + 1)
            .toString()
            .padStart(4, "0")}`; // 👨‍🎓 Unique student ID

        return {
            // 📚 Academic Info
            academicYearId: faker.helpers.arrayElement(academicYears).id,
            classId: faker.helpers.arrayElement(classes).id,
            dateOfAdmission: faker.date.past({ years: 1 }),
            registrationNo,
            // 👤 Personal Info
            firstName: faker.person.firstName(gender),
            middleName: faker.person.firstName(gender),
            surname: faker.person.lastName(),
            preferredName: faker.person.firstName(),
            nationality: faker.location.country(),
            dateOfBirth: dob,
            gender,
            religion: faker.word.noun(),
            studentPhoto: faker.image.urlLoremFlickr(),

            // 📄 Document Info
            birthCertificatNo: faker.helpers.replaceSymbols("BC########"),
            birthCertificateFile: faker.image.urlLoremFlickr(),
            passportNo: faker.helpers.replaceSymbols("P########"),
            expiryDate, // For passport
            passportFile: faker.image.urlLoremFlickr(),
            studentPassNo: faker.helpers.replaceSymbols("SP########"),
            dateOfExpiry: expiryDate, // For student pass (can be same as passport for simplicity)
            studentPassFile: faker.image.urlLoremFlickr(),

            // 🏫 Previous School Info
            nameOfSchool: faker.company.name(),
            location: faker.location.city(),
            reasonForExit: faker.lorem.sentence(),
            recentReportFile: faker.image.urlLoremFlickr(),

            // ➕ Additional Info
            bloodType: faker.helpers.arrayElement(["A", "B", "AB", "O"]),
            whoLivesWithStudentAtHome: faker.person.fullName(),
            primaryLanguageAtHome: faker.lorem.word(),
            otherChildrenAtCCIS: faker.datatype.boolean(),
            referredByCurrentFamily: faker.datatype.boolean(),
            permissionForSocialMediaPhotos: faker.datatype.boolean(),
            specialInformation: faker.lorem.sentence(),
            medicalConditions: faker.lorem.words(3),
            feesContribution: faker.datatype.boolean(),
            feesContributionPercentage: faker.number.int({ min: 0, max: 100 }),

            // 👨‍👩‍👧‍👦 Guardian Info
            guardians: {
                create: Array.from({ length: numGuardians }).map(() => ({
                    relationship: faker.helpers.arrayElement(
                        Object.values(GuardianRelationship)
                    ),
                    fullName: faker.person.fullName(),
                    occupation: faker.person.jobTitle(),
                    residentialAddress: faker.location.streetAddress(),
                    contactPhone: faker.phone.number({
                        style: "international",
                    }),
                    whatsappNumber: faker.phone.number({
                        style: "international",
                    }),
                    emailAddress: faker.internet.email(),
                    preferredContact: faker.helpers.arrayElement(
                        Object.values(PreferredContact)
                    ),
                })),
            },
            // 📞 Emergency Contacts
            emergencyContacts: {
                create: Array.from({ length: numEmergencyContacts }).map(
                    () => ({
                        fullNames: faker.person.fullName(),
                        relationship: faker.helpers.arrayElement([
                            "uncle",
                            "aunt",
                            "sibling",
                            "neighbor",
                            "grandparent", // Added more variety
                            "family_friend",
                        ]),
                        contactPhone: faker.phone.number({
                            style: "international",
                        }),
                        whatsappNumber: faker.phone.number({
                            style: "international",
                        }),
                    })
                ),
            },
            // 🩺 Doctor Info
            doctors: {
                create: Array.from({ length: numDoctors }).map(() => ({
                    fullNames: faker.person.fullName(),
                    contactPhone: faker.phone.number({
                        style: "international",
                    }),
                })),
            },
        };
    });

    console.log(`➕ Adding ${count} core student records to db ...`);
    const created = await prisma.student.createMany({
        data: studentData.map(
            // Exclude relational data for the initial createMany
            ({ guardians, emergencyContacts, doctors, ...rest }) => rest
        ),
        // skipDuplicates: true, // Use if registrationNo might not be unique during generation (unlikely with padStart logic)
    });
    console.log(`✅ Created ${created.count} core student records.`);

    console.log(
        `🔗 Linking guardians, emergency contacts, and doctors for ${studentData.length} students...`
    ); // Added emoji
    let linkedRelationsCount = 0;
    for (const [index, student] of studentData.entries()) {
        const createdStudent = await prisma.student.findUnique({
            where: { registrationNo: student.registrationNo },
        });

        if (createdStudent) {
            let relationsLinkedForThisStudent = false;
            // Link Guardians 👨‍👩‍👧
            if (student.guardians?.create?.length) {
                await prisma.guardian.createMany({
                    data: student.guardians.create.map((g: any) => ({
                        ...g,
                        studentId: createdStudent.id,
                    })),
                });
                relationsLinkedForThisStudent = true;
            }

            // Link Emergency Contacts 🆘
            if (student.emergencyContacts?.create?.length) {
                await prisma.emergencyContact.createMany({
                    data: student.emergencyContacts.create.map((e: any) => ({
                        ...e,
                        studentId: createdStudent.id,
                    })),
                });
                relationsLinkedForThisStudent = true;
            }

            // Link Doctors 👨‍⚕️
            if (student.doctors?.create?.length) {
                await prisma.studentDoctor.createMany({
                    data: student.doctors.create.map((d: any) => ({
                        ...d,
                        studentId: createdStudent.id,
                    })),
                });
                relationsLinkedForThisStudent = true;
            }
            if (relationsLinkedForThisStudent) linkedRelationsCount++;
            console.log(
                `✅ Relations linked for student ${index + 1} (${
                    student.registrationNo
                })`
            ); // Optional: for verbose logging
        } else {
            console.warn(
                `⚠️ Could not find student ${student.registrationNo} to link relations.`
            );
        }
    }
    console.log(
        `✅ ${linkedRelationsCount} students had their relational data successfully linked.`
    );

    console.log(
        `🎉 Seeded ${created.count} students with full relational data successfully!` // Changed emoji and text
    );
}
