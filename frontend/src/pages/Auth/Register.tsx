import  { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "@/api/axiosInstance.ts";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate(); // Initialize navigate for redirect

    // Handle form submission for registration
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make API request for registration
            const response = await axiosInstance.post("/auth/merchant/register", { email, password });

            // On successful registration, show success message
            if(response) {
                setSuccessMessage("Registration successful! You can now log in.");
            }
            // Redirect to login page after successful registration
            setTimeout(() => {
                navigate("/login");
            }, 500); // Redirect after 2 seconds

        } catch ( error) {
            // Handle errors, such as already existing email
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Something went wrong, please try again.");
            }
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Register your account</CardTitle>
                            <CardDescription>
                                Enter your email below to register your account
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

                                    {successMessage && (
                                        <div className="text-green-500 text-sm mt-2">{successMessage}</div>
                                    )}

                                    <div className="flex flex-col gap-3">
                                        <Button type="submit" className="w-full">
                                            Register
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
