// components/StatCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    className?: string;
    iconClassName?: string;
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
    return (
        <Card className="flex items-center justify-between p-4 rounded-2xl shadow-md bg-primary text-primary-foreground">
            <div>
                <h3 className="text-base ">{title}</h3>
                <p className="text-4xl font-bold">{value}</p>
            </div>
            <div className="rounded-full bg-white/30 p-4">
                {Icon && <Icon className="w-8 h-8" />}
            </div>
        </Card>
    );
}
