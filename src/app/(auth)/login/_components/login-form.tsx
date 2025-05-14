"use client";

import { TextInput } from "@/components/form";
import {
    Alert,
    AlertTitle,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Form,
} from "@/components/ui";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const loginFormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
});

export const LoginForm = () => {
    const [error, setError] = React.useState<string | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof loginFormSchema>) {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid Credentials");
        } else {
            router.push("/");
        }
    }

    return (
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                {error && (
                    <Alert variant={"destructive"}>
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>
                )}
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <TextInput
                                name="email"
                                label="Email"
                                placeholder="m@example.com"
                                control={form.control}
                                disabled={form.formState.isSubmitting}
                            />
                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="******"
                                control={form.control}
                                disabled={form.formState.isSubmitting}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? "Logging in..."
                                    : "Login"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
