import { auth } from "@/auth";
import { StatCard } from "@/components/dashboard/stat-card";
import { prisma } from "@/prisma";
import { BookOpenCheck, Briefcase, GraduationCap, Users } from "lucide-react";
import Image from "next/image";

export default async function Home() {
    const totalStudents = await prisma.student.count();
    const totalTeachers = await prisma.staff.count({
        where: {
            designation: {
                name: {
                    in: ["teacher", "assistant teacher"],
                },
            },
        },
    });
    const totalParents = await prisma.guardian.count();
    const totalStaff = await prisma.staff.count();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
                title="Students"
                value={totalStudents}
                icon={GraduationCap}
            />
            <StatCard
                title="Teachers"
                value={totalTeachers}
                icon={BookOpenCheck}
            />
            <StatCard
                title="Parents/Guardians"
                value={totalParents}
                icon={Users}
            />
            <StatCard title="Staff" value={totalStaff} icon={Briefcase} />
        </div>
    );
}
