/*
  Warnings:

  - You are about to drop the `InternationalStaff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResidentStaff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `noOfYearsAtCCIS` on the `Staff` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `yearsOfWorkExperience` on the `Staff` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- DropIndex
DROP INDEX "InternationalStaff_staffId_key";

-- DropIndex
DROP INDEX "ResidentStaff_staffId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "InternationalStaff";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ResidentStaff";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ResidentTeachingStaffProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nationalIdNo" TEXT NOT NULL,
    "nationalIdAttachment" TEXT NOT NULL,
    "nssfNo" TEXT NOT NULL,
    "nssfAttachment" TEXT NOT NULL,
    "tinNo" TEXT NOT NULL,
    "tinAttachment" TEXT NOT NULL,
    "teachingLicenseNo" TEXT NOT NULL,
    "teachingLicenseAttachment" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ResidentTeachingStaffProfile_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ResidentNonTeachingStaffProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nationalIdNo" TEXT NOT NULL,
    "nationalIdAttachment" TEXT NOT NULL,
    "nssfNo" TEXT NOT NULL,
    "nssfAttachment" TEXT NOT NULL,
    "tinNo" TEXT NOT NULL,
    "tinAttachment" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ResidentNonTeachingStaffProfile_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "internationalTeachingStaffProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tcuNo" TEXT NOT NULL,
    "tcuAttachment" TEXT NOT NULL,
    "teachingLicenseNo" TEXT NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "teachingLicenseAttachment" TEXT NOT NULL,
    "workPermitNo" TEXT NOT NULL,
    "workPermitExpirationDate" DATETIME NOT NULL,
    "workPermitAttachment" TEXT NOT NULL,
    "residentPermitNo" TEXT NOT NULL,
    "residentPermitExpirationDate" DATETIME NOT NULL,
    "residentPermitAttachment" TEXT NOT NULL,
    "passportNo" TEXT NOT NULL,
    "passportExpirationDate" DATETIME NOT NULL,
    "passportAttachment" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "internationalTeachingStaffProfile_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InternationalNonTeachingStaffProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workPermitNo" TEXT NOT NULL,
    "workPermitExpirationDate" DATETIME NOT NULL,
    "workPermitAttachment" TEXT NOT NULL,
    "residentPermitNo" TEXT NOT NULL,
    "residentPermitExpirationDate" DATETIME NOT NULL,
    "residentPermitAttachment" TEXT NOT NULL,
    "passportNo" TEXT NOT NULL,
    "passportExpirationDate" DATETIME NOT NULL,
    "passportAttachment" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "InternationalNonTeachingStaffProfile_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "staffId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "nationality" TEXT NOT NULL,
    "designationId" TEXT NOT NULL,
    "dateOfEmployment" DATETIME NOT NULL,
    "highestQualification" TEXT NOT NULL,
    "yearsOfWorkExperience" INTEGER NOT NULL,
    "noOfYearsAtCCIS" INTEGER NOT NULL,
    "resumeURL" TEXT NOT NULL,
    "staffType" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Staff_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "StaffDesignation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("comment", "createdAt", "dateOfBirth", "dateOfEmployment", "designationId", "firstName", "gender", "highestQualification", "id", "middleName", "nationality", "noOfYearsAtCCIS", "resumeURL", "staffId", "staffType", "surname", "updatedAt", "yearsOfWorkExperience") SELECT "comment", "createdAt", "dateOfBirth", "dateOfEmployment", "designationId", "firstName", "gender", "highestQualification", "id", "middleName", "nationality", "noOfYearsAtCCIS", "resumeURL", "staffId", "staffType", "surname", "updatedAt", "yearsOfWorkExperience" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
CREATE UNIQUE INDEX "Staff_staffId_key" ON "Staff"("staffId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ResidentTeachingStaffProfile_staffId_key" ON "ResidentTeachingStaffProfile"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "ResidentNonTeachingStaffProfile_staffId_key" ON "ResidentNonTeachingStaffProfile"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "internationalTeachingStaffProfile_staffId_key" ON "internationalTeachingStaffProfile"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "InternationalNonTeachingStaffProfile_staffId_key" ON "InternationalNonTeachingStaffProfile"("staffId");
