import { Role } from "@prisma/client";
import { AppSidebarContentProps } from "./app/(dashboard)/_components/app-sidebar/app-sidebar-content";

export const APP_NAME = "School Management System";

export const GENDERS = ["male", "female"] as const;
export const RELIGIONS = [
    "Christian",
    "Muslim",
    "Hindu",
    "Buddhist",
    "Sikh",
    "Jewish",
    "Atheist",
    "Other",
] as const;
export const BLOOD_GROUPS = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
    "Unknown",
] as const;
export const ACADEMIC_YEARS = [
    "2020-2021",
    "2021-2022",
    "2022-2023",
    "2023-2024",
    "2024-2025",
    "2025-2026",
] as const;
export const CLASSES = [
    "dik-dik",
    "impala",
    "year 1",
    "year 2",
    "year 3",
    "year 4",
    "year 5",
    "year 6",
] as const;
export const PREFERRED_CONTACT_METHODS = [
    "email",
    "phone",
    "sms",
    "whatsapp",
] as const;
export const RELATIONSHIPS = ["father", "mother", "guardian"] as const;
export const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
];
export const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/jpg",
    "image/png",
];
export const UPLOAD_FOLDER = {
    STUDENT_PHOTO: "student-images",
    STUDENT_BIRTH_CERTIFICATE: "student-birth-certificates",
    STUDENT_PASSPORT: "student-passports",
    STUDENT_PASS: "student-passes",
    STUDENT_FORMER_SCHOOOL_REPORT_CARD: "student-report-cards",
    STAFF_RESUME: "staff-resumes",
    STAFF_ID: "staff-ids",
    STAFF_PASSPORT: "staff-passports",

    STAFF_TIN: "staff-tins",
    STAFF_NSSF: "staff-nssfs",
    STAFF_TEACHING_LICENSE: "staff-teaching-licenses",
    STAFF_TCU: "staff-tcus",
    STAFF_WORK_PERMIT: "staff-work-permits",
    STAFF_RESIDENT_PERMIT: "staff-resident-permits",

    STAFF_RESIDENT_PERMIT_ATTACHMENT: "staff-resident-permit-attachments",
};
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_FILE_SIZE_MB = 10; // or whatever you prefer

export const STAFF_DESIGNATIONS = [
    "teacher",
    "assistant teacher",
    "accountant",
    "hr",
    "procurement",
    "cook",
];

export const STAFF_QUALIFICATIONS = [
    "PhD",
    "Masters",
    "Bachelors",
    "Diploma",
    "Certificate",
    "form 6",
    "form 4",
    "class 7",
];

const BASE_URL = "";
const TEACHERS_BASE_URL = `${BASE_URL}/teachers`;
const STUDENTS_BASE_URL = `${BASE_URL}/students`;
const PARENTS_BASE_URL = `${BASE_URL}/parents`;
const ACADEMICS_BASE_URL = `${BASE_URL}/academics`;
const STAFF_BASE_URL = `${BASE_URL}/staff`;
const REPORTS_BASE_URL = `${BASE_URL}/report`;

export const ADMIN_SIDEBAR_ITEMS: AppSidebarContentProps["items"] = [
    {
        title: "Dashboard",
        url: "/",
    },
    {
        title: "Students",
        url: STUDENTS_BASE_URL,
        items: [
            {
                title: "Add student",
                url: `${STUDENTS_BASE_URL}/add`,
            },
            {
                title: "View Students",
                url: `${STUDENTS_BASE_URL}/view/list`,
            },
            // {
            //     title: "Edit student",
            //     url: `${STUDENTS_BASE_URL}/students/edit/<studentid>`,
            // },
        ],
    },

    {
        title: "Staff",
        url: `${STAFF_BASE_URL}`,
        items: [
            {
                title: "Add Staff",
                url: `${STAFF_BASE_URL}/add`,
            },
            {
                title: "Staff list",
                url: `${STAFF_BASE_URL}/view/list`,
            },
        ],
    },
    {
        title: "Reports",
        url: `${REPORTS_BASE_URL}`,
        items: [
            {
                title: "Year levels",
                url: `${REPORTS_BASE_URL}/students`,
            },
            {
                title: "Classes",
                url: `${REPORTS_BASE_URL}/staff`,
            },
        ],
    },
];

export const TEACHER_SIDEBAR_ITEMS: AppSidebarContentProps["items"] = [
    {
        title: "Students",
        url: "/students",
        items: [
            {
                title: "Admit student",
                url: "/add-student",
            },
            {
                title: "Students list",
                url: "/add-student",
            },
        ],
    },
    {
        title: "Parents",
        url: "/parents",
        items: [
            {
                title: "Add new parent",
                url: "/add-parent",
            },
            {
                title: "parents list",
                url: "/add-staff",
            },
        ],
    },
];
