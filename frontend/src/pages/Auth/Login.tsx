import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

import {useAuth} from "@/AuthContext/AuthContext.tsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const { isAuthenticated } = useAuth();
    // Get the 'next' parameter from the URL (if it exists)
    const redirectTo = new URLSearchParams(location.search).get("next") || "/dashboard";

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard"); // Redirect to dashboard if already logged in
        }
    }, [isAuthenticated, navigate]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make API request for login
            const response = await axiosInstance.post("/auth/merchant/login", { email, password });

            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken); // Save refresh token as well
                navigate(redirectTo);
            } else {
                setErrorMessage("Invalid email or password.");
            }

        } catch (error) {
            // Handle errors, like invalid credentials
            setErrorMessage("Invalid email or password.");
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errorMessage && (
                                        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
                                    )}
                                    <div className="flex flex-col gap-3">
                                        <Button type="submit" className="w-full">
                                            Login
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <button onClick={() => navigate("/register")} className="underline underline-offset-4">
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
