"use client";
import { AppPieChart } from "@/components/charts/pie-chart";
import React from "react";

const DashboardPageClient = () => {
    const chartData = [
        { name: "Chrome", value: 275, fill: "var(--color-chrome)" },
        { name: "Safari", value: 200, fill: "var(--color-safari)" },
        { name: "Firefox", value: 187, fill: "var(--color-firefox)" },
        { name: "Edge", value: 173, fill: "var(--color-edge)" },
        { name: "Other", value: 90, fill: "var(--color-other)" },
    ];

    const chartConfig = {
        value: { label: "Visitors" },
        Chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
        Safari: { label: "Safari", color: "hsl(var(--chart-2))" },
        Firefox: { label: "Firefox", color: "hsl(var(--chart-3))" },
        Edge: { label: "Edge", color: "hsl(var(--chart-4))" },
        Other: { label: "Other", color: "hsl(var(--chart-5))" },
    };
    return (
        <div>
            {" "}
            <AppPieChart
                title="Browser Share"
                description="Jan - June 2024"
                data={chartData}
                dataKey="value"
                nameKey="name"
                chartConfig={chartConfig}
                trendText="Trending up by 5.2% this month"
                footerNote="Showing total visitors for the last 6 months"
            />
        </div>
    );
};

export default DashboardPageClient;
