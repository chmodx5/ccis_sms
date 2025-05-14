/*
  Warnings:

  - Added the required column `updatedAt` to the `InternationalStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ResidentStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designationId` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StaffEmergencyContact` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "StaffDesignation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InternationalStaff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tcuNo" TEXT NOT NULL,
    "tcuAttachment" TEXT NOT NULL,
    "teachingLicenseNo" TEXT NOT NULL,
    "teachingLicenseAttachment" TEXT NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "workPermitNo" TEXT NOT NULL,
    "workPermitAttachment" TEXT NOT NULL,
    "workPermitExpirationDate" DATETIME NOT NULL,
    "residentPermitNo" TEXT NOT NULL,
    "residentPermitAttachment" TEXT NOT NULL,
    "residentPermitExpirationDate" DATETIME NOT NULL,
    "passportNo" TEXT NOT NULL,
    "passportAttachment" TEXT NOT NULL,
    "passportExpirationDate" DATETIME NOT NULL,
    "staffId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InternationalStaff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InternationalStaff" ("expirationDate", "id", "passportAttachment", "passportExpirationDate", "passportNo", "residentPermitAttachment", "residentPermitExpirationDate", "residentPermitNo", "staffId", "tcuAttachment", "tcuNo", "teachingLicenseAttachment", "teachingLicenseNo", "workPermitAttachment", "workPermitExpirationDate", "workPermitNo") SELECT "expirationDate", "id", "passportAttachment", "passportExpirationDate", "passportNo", "residentPermitAttachment", "residentPermitExpirationDate", "residentPermitNo", "staffId", "tcuAttachment", "tcuNo", "teachingLicenseAttachment", "teachingLicenseNo", "workPermitAttachment", "workPermitExpirationDate", "workPermitNo" FROM "InternationalStaff";
DROP TABLE "InternationalStaff";
ALTER TABLE "new_InternationalStaff" RENAME TO "InternationalStaff";
CREATE UNIQUE INDEX "InternationalStaff_staffId_key" ON "InternationalStaff"("staffId");
CREATE TABLE "new_ResidentStaff" (
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
    CONSTRAINT "ResidentStaff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ResidentStaff" ("id", "nationalIdAttachment", "nationalIdNo", "nssfAttachment", "nssfNo", "staffId", "teachingLicenseAttachment", "teachingLicenseNo", "tinAttachment", "tinNo") SELECT "id", "nationalIdAttachment", "nationalIdNo", "nssfAttachment", "nssfNo", "staffId", "teachingLicenseAttachment", "teachingLicenseNo", "tinAttachment", "tinNo" FROM "ResidentStaff";
DROP TABLE "ResidentStaff";
ALTER TABLE "new_ResidentStaff" RENAME TO "ResidentStaff";
CREATE UNIQUE INDEX "ResidentStaff_staffId_key" ON "ResidentStaff"("staffId");
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
    "yearsOfWorkExperience" TEXT NOT NULL,
    "noOfYearsAtCCIS" TEXT NOT NULL,
    "resumeURL" TEXT NOT NULL,
    "staffType" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Staff_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "StaffDesignation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("comment", "dateOfBirth", "dateOfEmployment", "firstName", "gender", "highestQualification", "id", "middleName", "nationality", "noOfYearsAtCCIS", "resumeURL", "staffId", "staffType", "surname", "yearsOfWorkExperience") SELECT "comment", "dateOfBirth", "dateOfEmployment", "firstName", "gender", "highestQualification", "id", "middleName", "nationality", "noOfYearsAtCCIS", "resumeURL", "staffId", "staffType", "surname", "yearsOfWorkExperience" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
CREATE UNIQUE INDEX "Staff_staffId_key" ON "Staff"("staffId");
CREATE TABLE "new_StaffEmergencyContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullNames" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StaffEmergencyContact_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StaffEmergencyContact" ("contactPhone", "fullNames", "id", "relationship", "staffId", "whatsapp") SELECT "contactPhone", "fullNames", "id", "relationship", "staffId", "whatsapp" FROM "StaffEmergencyContact";
DROP TABLE "StaffEmergencyContact";
ALTER TABLE "new_StaffEmergencyContact" RENAME TO "StaffEmergencyContact";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "StaffDesignation_name_key" ON "StaffDesignation"("name");
