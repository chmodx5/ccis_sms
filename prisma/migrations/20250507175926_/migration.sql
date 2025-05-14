/*
  Warnings:

  - Made the column `gender` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "academicYearId" TEXT NOT NULL,
    "dateOfAdmission" DATETIME NOT NULL,
    "classId" TEXT NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "preferredName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
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
    CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("academicYearId", "birthCertificatNo", "birthCertificateFile", "bloodType", "classId", "createdAt", "dateOfAdmission", "dateOfBirth", "dateOfExpiry", "expiryDate", "feesContribution", "feesContributionPercentage", "firstName", "gender", "id", "location", "medicalConditions", "middleName", "nameOfSchool", "nationality", "otherChildrenAtCCIS", "passportFile", "passportNo", "permissionForSocialMediaPhotos", "preferredName", "primaryLanguageAtHome", "reasonForExit", "recentReportFile", "referredByCurrentFamily", "registrationNo", "religion", "specialInformation", "studentPassFile", "studentPassNo", "studentPhoto", "surname", "updatedAt", "whoLivesWithStudentAtHome") SELECT "academicYearId", "birthCertificatNo", "birthCertificateFile", "bloodType", "classId", "createdAt", "dateOfAdmission", "dateOfBirth", "dateOfExpiry", "expiryDate", "feesContribution", "feesContributionPercentage", "firstName", "gender", "id", "location", "medicalConditions", "middleName", "nameOfSchool", "nationality", "otherChildrenAtCCIS", "passportFile", "passportNo", "permissionForSocialMediaPhotos", "preferredName", "primaryLanguageAtHome", "reasonForExit", "recentReportFile", "referredByCurrentFamily", "registrationNo", "religion", "specialInformation", "studentPassFile", "studentPassNo", "studentPhoto", "surname", "updatedAt", "whoLivesWithStudentAtHome" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_registrationNo_key" ON "Student"("registrationNo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
