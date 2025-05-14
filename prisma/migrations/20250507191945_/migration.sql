-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmergencyContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "fullNames" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmergencyContact_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EmergencyContact" ("contactPhone", "createdAt", "fullNames", "id", "relationship", "studentId", "updatedAt", "whatsappNumber") SELECT "contactPhone", "createdAt", "fullNames", "id", "relationship", "studentId", "updatedAt", "whatsappNumber" FROM "EmergencyContact";
DROP TABLE "EmergencyContact";
ALTER TABLE "new_EmergencyContact" RENAME TO "EmergencyContact";
CREATE TABLE "new_Guardian" (
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
    CONSTRAINT "Guardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Guardian" ("contactPhone", "createdAt", "emailAddress", "fullName", "id", "occupation", "preferredContact", "relationship", "residentialAddress", "studentId", "updatedAt", "whatsappNumber") SELECT "contactPhone", "createdAt", "emailAddress", "fullName", "id", "occupation", "preferredContact", "relationship", "residentialAddress", "studentId", "updatedAt", "whatsappNumber" FROM "Guardian";
DROP TABLE "Guardian";
ALTER TABLE "new_Guardian" RENAME TO "Guardian";
CREATE TABLE "new_StudentDoctor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "fullNames" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudentDoctor_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StudentDoctor" ("contactPhone", "createdAt", "fullNames", "id", "studentId", "updatedAt") SELECT "contactPhone", "createdAt", "fullNames", "id", "studentId", "updatedAt" FROM "StudentDoctor";
DROP TABLE "StudentDoctor";
ALTER TABLE "new_StudentDoctor" RENAME TO "StudentDoctor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
