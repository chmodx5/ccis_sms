/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TrendingUp } from "lucide-react";
import { Cell, LabelList, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartDataItem {
    name: string;
    value: number;
    fill?: string;
    [key: string]: any;
}

interface PieChartCardProps {
    title: string;
    description?: string;
    data: PieChartDataItem[];
    dataKey: string;
    nameKey: string;
    chartConfig: ChartConfig;
    trendText?: string;
    footerNote?: string;
    showLabels?: boolean;
}

export function AppPieChart({
    title,
    description,
    data,
    dataKey,
    nameKey,
    chartConfig,
    trendText,
    footerNote,
    showLabels = false,
}: PieChartCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] px-0"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey={dataKey}
                                    hideLabel
                                />
                            }
                        />
                        <Pie
                            data={data}
                            dataKey={dataKey}
                            nameKey={nameKey}
                            labelLine={false}
                            // label={({ payload, ...props }) => (
                            //     <text
                            //         cx={props.cx}
                            //         cy={props.cy}
                            //         x={props.x}
                            //         y={props.y}
                            //         textAnchor={props.textAnchor}
                            //         dominantBaseline={props.dominantBaseline}
                            //         fill="hsla(var(--foreground))"
                            //     >
                            //         {payload[dataKey]}
                            //     </text>
                            // )}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        chartConfig[entry[nameKey]]?.color ??
                                        "hsl(var(--muted))"
                                    }
                                />
                            ))}
                            {showLabels && (
                                <LabelList
                                    dataKey="name"
                                    position="inside"
                                    fontSize={12}
                                    fill="white"
                                    fontWeight={200}
                                />
                            )}
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {trendText && (
                    <div className="flex items-center gap-2 font-medium leading-none">
                        {trendText} <TrendingUp className="h-4 w-4" />
                    </div>
                )}
                {footerNote && (
                    <div className="leading-none text-muted-foreground">
                        {footerNote}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
