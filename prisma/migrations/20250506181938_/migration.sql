/*
  Warnings:

  - You are about to drop the `NonTeachingInternationalStaff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NonTeachingResidentStaff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentEmergencyContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubjectTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeachingInternationalStaff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeachingResidentStaff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YearLevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ParentToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudentToSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubjectToYearLevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `yearLevelId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `actualEntryDate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `ageAtAdmission` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `anticipatedYearLevelId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `birthCertificateNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `birthCertificateURL` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `employerContributeToSchoolFees` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `employerContributionPercentage` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `formerSchool` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `homeResident` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `passportURL` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `permissionToPublishPhotos` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `primaryLanguage` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `proposedEntryDate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `referredByEnrolledFamilyMember` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `referredByFamilyMemberDetails` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `specialThingsAboutTheChild` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `statusOfRegistration` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `statusOfRegistrationDate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentPassExpiryDate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `termOfAdmission` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `StudentDoctor` table. All the data in the column will be lost.
  - Added the required column `academicYearId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthCertificatNo` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfAdmission` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfExpiry` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryDate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feesContributionPercentage` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameOfSchool` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryLanguageAtHome` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reasonForExit` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialInformation` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whoLivesWithStudentAtHome` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `medicalConditions` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passportNo` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentPassNo` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `fullNames` to the `StudentDoctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NonTeachingResidentStaff_nationalId_key";

-- DropIndex
DROP INDEX "Parent_contactPhone_idx";

-- DropIndex
DROP INDEX "Parent_email_idx";

-- DropIndex
DROP INDEX "Parent_email_key";

-- DropIndex
DROP INDEX "Subject_code_idx";

-- DropIndex
DROP INDEX "Subject_name_idx";

-- DropIndex
DROP INDEX "Subject_code_key";

-- DropIndex
DROP INDEX "Subject_name_key";

-- DropIndex
DROP INDEX "SubjectTeacher_subjectId_teacherId_key";

-- DropIndex
DROP INDEX "TeachingResidentStaff_nationalId_key";

-- DropIndex
DROP INDEX "YearLevel_name_key";

-- DropIndex
DROP INDEX "_ClassToSubject_B_index";

-- DropIndex
DROP INDEX "_ClassToSubject_AB_unique";

-- DropIndex
DROP INDEX "_ParentToStudent_B_index";

-- DropIndex
DROP INDEX "_ParentToStudent_AB_unique";

-- DropIndex
DROP INDEX "_StudentToSubject_B_index";

-- DropIndex
DROP INDEX "_StudentToSubject_AB_unique";

-- DropIndex
DROP INDEX "_SubjectToYearLevel_B_index";

-- DropIndex
DROP INDEX "_SubjectToYearLevel_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "NonTeachingInternationalStaff";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "NonTeachingResidentStaff";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Parent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Staff";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StudentDocument";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StudentEmergencyContact";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Subject";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SubjectTeacher";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TeachingInternationalStaff";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TeachingResidentStaff";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "YearLevel";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ClassToSubject";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ParentToStudent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_StudentToSubject";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SubjectToYearLevel";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Guardian" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "residentialAddress" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "emailAddress" TEXT,
    "preferredContact" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Guardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "fullNames" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmergencyContact_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AcademicYear" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Class" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "academicYearId" TEXT NOT NULL,
    "dateOfAdmission" DATETIME NOT NULL,
    "classId" TEXT,
    "registrationNo" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "preferredName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "gender" TEXT,
    "religion" TEXT,
    "studentPhoto" TEXT,
    "birthCertificatNo" TEXT NOT NULL,
    "birthCertificateFile" TEXT,
    "passportNo" TEXT NOT NULL,
    "expiryDate" DATETIME NOT NULL,
    "passportFile" TEXT,
    "studentPassNo" TEXT NOT NULL,
    "dateOfExpiry" DATETIME NOT NULL,
    "studentPassFile" TEXT,
    "nameOfSchool" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "reasonForExit" TEXT NOT NULL,
    "recentReportFile" TEXT,
    "bloodType" TEXT,
    "whoLivesWithStudentAtHome" TEXT NOT NULL,
    "primaryLanguageAtHome" TEXT NOT NULL,
    "otherChildrenAtCCIS" BOOLEAN,
    "referredByCurrentFamily" BOOLEAN,
    "permissionForSocialMediaPhotos" BOOLEAN,
    "specialInformation" TEXT NOT NULL,
    "medicalConditions" TEXT NOT NULL,
    "feesContribution" BOOLEAN,
    "feesContributionPercentage" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Student_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("classId", "createdAt", "dateOfBirth", "firstName", "gender", "id", "medicalConditions", "middleName", "nationality", "passportNo", "preferredName", "registrationNo", "studentPassNo", "surname", "updatedAt") SELECT "classId", "createdAt", "dateOfBirth", "firstName", "gender", "id", "medicalConditions", "middleName", "nationality", "passportNo", "preferredName", "registrationNo", "studentPassNo", "surname", "updatedAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_registrationNo_key" ON "Student"("registrationNo");
CREATE TABLE "new_StudentDoctor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "fullNames" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudentDoctor_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StudentDoctor" ("contactPhone", "createdAt", "id", "studentId", "updatedAt") SELECT "contactPhone", "createdAt", "id", "studentId", "updatedAt" FROM "StudentDoctor";
DROP TABLE "StudentDoctor";
ALTER TABLE "new_StudentDoctor" RENAME TO "StudentDoctor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AcademicYear_name_key" ON "AcademicYear"("name");
