-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InternationalNonTeachingStaffProfile" (
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
    CONSTRAINT "InternationalNonTeachingStaffProfile_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_InternationalNonTeachingStaffProfile" ("createdAt", "id", "passportAttachment", "passportExpirationDate", "passportNo", "residentPermitAttachment", "residentPermitExpirationDate", "residentPermitNo", "staffId", "updateAt", "workPermitAttachment", "workPermitExpirationDate", "workPermitNo") SELECT "createdAt", "id", "passportAttachment", "passportExpirationDate", "passportNo", "residentPermitAttachment", "residentPermitExpirationDate", "residentPermitNo", "staffId", "updateAt", "workPermitAttachment", "workPermitExpirationDate", "workPermitNo" FROM "InternationalNonTeachingStaffProfile";
DROP TABLE "InternationalNonTeachingStaffProfile";
ALTER TABLE "new_InternationalNonTeachingStaffProfile" RENAME TO "InternationalNonTeachingStaffProfile";
CREATE UNIQUE INDEX "InternationalNonTeachingStaffProfile_staffId_key" ON "InternationalNonTeachingStaffProfile"("staffId");
CREATE TABLE "new_ResidentNonTeachingStaffProfile" (
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
    CONSTRAINT "ResidentNonTeachingStaffProfile_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ResidentNonTeachingStaffProfile" ("createdAt", "id", "nationalIdAttachment", "nationalIdNo", "nssfAttachment", "nssfNo", "staffId", "tinAttachment", "tinNo", "updatedAt") SELECT "createdAt", "id", "nationalIdAttachment", "nationalIdNo", "nssfAttachment", "nssfNo", "staffId", "tinAttachment", "tinNo", "updatedAt" FROM "ResidentNonTeachingStaffProfile";
DROP TABLE "ResidentNonTeachingStaffProfile";
ALTER TABLE "new_ResidentNonTeachingStaffProfile" RENAME TO "ResidentNonTeachingStaffProfile";
CREATE UNIQUE INDEX "ResidentNonTeachingStaffProfile_staffId_key" ON "ResidentNonTeachingStaffProfile"("staffId");
CREATE TABLE "new_ResidentTeachingStaffProfile" (
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
    CONSTRAINT "ResidentTeachingStaffProfile_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ResidentTeachingStaffProfile" ("createdAt", "id", "nationalIdAttachment", "nationalIdNo", "nssfAttachment", "nssfNo", "staffId", "teachingLicenseAttachment", "teachingLicenseNo", "tinAttachment", "tinNo", "updatedAt") SELECT "createdAt", "id", "nationalIdAttachment", "nationalIdNo", "nssfAttachment", "nssfNo", "staffId", "teachingLicenseAttachment", "teachingLicenseNo", "tinAttachment", "tinNo", "updatedAt" FROM "ResidentTeachingStaffProfile";
DROP TABLE "ResidentTeachingStaffProfile";
ALTER TABLE "new_ResidentTeachingStaffProfile" RENAME TO "ResidentTeachingStaffProfile";
CREATE UNIQUE INDEX "ResidentTeachingStaffProfile_staffId_key" ON "ResidentTeachingStaffProfile"("staffId");
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
    CONSTRAINT "Staff_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "StaffDesignation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("comment", "createdAt", "dateOfBirth", "dateOfEmployment", "designationId", "firstName", "gender", "highestQualification", "id", "middleName", "nationality", "noOfYearsAtCCIS", "resumeURL", "staffId", "staffType", "surname", "updatedAt", "yearsOfWorkExperience") SELECT "comment", "createdAt", "dateOfBirth", "dateOfEmployment", "designationId", "firstName", "gender", "highestQualification", "id", "middleName", "nationality", "noOfYearsAtCCIS", "resumeURL", "staffId", "staffType", "surname", "updatedAt", "yearsOfWorkExperience" FROM "Staff";
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
    CONSTRAINT "StaffEmergencyContact_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StaffEmergencyContact" ("contactPhone", "createdAt", "fullNames", "id", "relationship", "staffId", "updatedAt", "whatsapp") SELECT "contactPhone", "createdAt", "fullNames", "id", "relationship", "staffId", "updatedAt", "whatsapp" FROM "StaffEmergencyContact";
DROP TABLE "StaffEmergencyContact";
ALTER TABLE "new_StaffEmergencyContact" RENAME TO "StaffEmergencyContact";
CREATE TABLE "new_internationalTeachingStaffProfile" (
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
    CONSTRAINT "internationalTeachingStaffProfile_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_internationalTeachingStaffProfile" ("createdAt", "expirationDate", "id", "passportAttachment", "passportExpirationDate", "passportNo", "residentPermitAttachment", "residentPermitExpirationDate", "residentPermitNo", "staffId", "tcuAttachment", "tcuNo", "teachingLicenseAttachment", "teachingLicenseNo", "updateAt", "workPermitAttachment", "workPermitExpirationDate", "workPermitNo") SELECT "createdAt", "expirationDate", "id", "passportAttachment", "passportExpirationDate", "passportNo", "residentPermitAttachment", "residentPermitExpirationDate", "residentPermitNo", "staffId", "tcuAttachment", "tcuNo", "teachingLicenseAttachment", "teachingLicenseNo", "updateAt", "workPermitAttachment", "workPermitExpirationDate", "workPermitNo" FROM "internationalTeachingStaffProfile";
DROP TABLE "internationalTeachingStaffProfile";
ALTER TABLE "new_internationalTeachingStaffProfile" RENAME TO "internationalTeachingStaffProfile";
CREATE UNIQUE INDEX "internationalTeachingStaffProfile_staffId_key" ON "internationalTeachingStaffProfile"("staffId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
