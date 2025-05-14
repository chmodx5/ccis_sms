import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./css/globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/session-provider";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify the weights you need
    subsets: ["latin"], // Specify subsets if needed
    variable: "--font-poppins", // Define a CSS variable for Poppins
    display: "swap", // Recommended for better performance
});

export const metadata: Metadata = {
    title: "CCIS",
    description: "CCIS school management system",
    icons: {
        icon: "/images/favicon.ico", // Path to your favicon.ico
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} antialiased`}>
                <AuthProvider>
                    {children}
                    <Toaster />
                </AuthProvider>
                <Toaster richColors />
            </body>
        </html>
    );
}
