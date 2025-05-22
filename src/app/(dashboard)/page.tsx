import { auth } from "@/auth";
import { AppPieChart } from "@/components/charts/pie-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { prisma } from "@/prisma";
import { BookOpenCheck, Briefcase, GraduationCap, Users } from "lucide-react";
import Image from "next/image";
import DashboardPageClient from "./_components/dashboard-page-client";
import { ChartConfig } from "@/components/ui";

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
    // count male and female students
    const maleStudents = await prisma.student.count({
        where: {
            gender: "male",
        },
    });
    const femaleStudents = await prisma.student.count({
        where: {
            gender: "female",
        },
    });

    console.log(maleStudents, femaleStudents);
    const genderChartData = [
        {
            name: "Male",
            value: maleStudents,
        },
        {
            name: "Female",
            value: femaleStudents,
        },
    ];
    const genderChartConfig = {
        Male: {
            label: "Male",
            color: "hsl(var(--chart-1))", // pick your preferred CSS variable
        },
        Female: {
            label: "Female",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    return (
        <div className="space-y-4">
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
            <div className="grid grid-cols-1 md:grid-cols-3">
                <AppPieChart
                    title="Students Gender Distribution"
                    description="Current student gender ratio"
                    data={genderChartData}
                    dataKey="value"
                    nameKey="name"
                    chartConfig={genderChartConfig}
                    // trendText="Up 3.4% from last term"
                    // footerNote="Based on currently enrolled students"
                    showLabels
                />
            </div>
        </div>
    );
}
