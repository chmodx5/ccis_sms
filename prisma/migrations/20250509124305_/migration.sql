-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "staffId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "nationality" TEXT NOT NULL,
    "dateOfEmployment" DATETIME NOT NULL,
    "highestQualification" TEXT NOT NULL,
    "yearsOfWorkExperience" TEXT NOT NULL,
    "noOfYearsAtCCIS" TEXT NOT NULL,
    "resumeURL" TEXT NOT NULL,
    "staffType" TEXT NOT NULL,
    "comment" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ResidentStaff" (
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
    CONSTRAINT "ResidentStaff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InternationalStaff" (
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
    CONSTRAINT "InternationalStaff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StaffEmergencyContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullNames" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    CONSTRAINT "StaffEmergencyContact_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffId_key" ON "Staff"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "ResidentStaff_staffId_key" ON "ResidentStaff"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "InternationalStaff_staffId_key" ON "InternationalStaff"("staffId");
