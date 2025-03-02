import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Initiate() {
    const [apiKey, setApiKey] = useState("");
    const [orderId, setOrderId] = useState("");
    const [amount, setAmount] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerMobile, setCustomerMobile] = useState("");
    const [successUrl, setSuccessUrl] = useState("");
    const [errorUrl, setErrorUrl] = useState("");
    const [paymentUrl, setPaymentUrl] = useState("");

    /**
     * 🔹 Fetch Merchant API Key from Backend
     * ✅ Uses JWT authentication (Authorization header)
     */
    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/merchant/apikey/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}` // Assuming JWT is stored in localStorage
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setApiKey(data.api_key);
                    toast.success("API key retrieved successfully.");
                } else {
                    toast.error(data.error || "Failed to fetch API key.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Server error while fetching API key.");
            }
        };

        fetchApiKey();
    }, []);

    /**
     * 🔹 Handles Transaction Initiation
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!apiKey || !orderId || !amount || !successUrl || !errorUrl || !customerMobile) {
            toast.error("Please fill all required fields.");
            return;
        }

        const requestData = {
            order_id: orderId,
            amount: parseFloat(amount),
            success_url: successUrl,
            error_url: errorUrl,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_mobile: customerMobile
        };

        try {
            const response = await fetch("http://localhost:8080/api/secure/process/initiate-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Transaction initiated successfully.");
                setPaymentUrl(data.payment_url);
            } else {
                toast.error(data.error || "Failed to initiate transaction.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl text-center">Merchant Payment Form</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <Input
                            placeholder="Merchant API Key"
                            value={apiKey}
                            readOnly
                            className="bg-gray-200 cursor-not-allowed"
                        />
                        <Input
                            placeholder="Enter Order ID"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                        />
                        <Input
                            placeholder="Enter Amount (₹)"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        <Input
                            placeholder="Customer Name (Optional)"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                        <Input
                            placeholder="Customer Email (Optional)"
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Customer Mobile Number"
                            type="tel"
                            value={customerMobile}
                            onChange={(e) => setCustomerMobile(e.target.value)}
                            required
                        />
                        <Input
                            placeholder="Success Redirect URL"
                            value={successUrl}
                            onChange={(e) => setSuccessUrl(e.target.value)}
                            required
                        />
                        <Input
                            placeholder="Error Redirect URL"
                            value={errorUrl}
                            onChange={(e) => setErrorUrl(e.target.value)}
                            required
                        />

                        <Button type="submit" className="w-full mt-4">
                            Initiate Transaction
                        </Button>
                    </form>

                    {/* Show Payment URL */}
                    {paymentUrl && (
                        <div className="mt-4 text-center">
                            <p className="text-green-600 font-semibold">Transaction Created!</p>
                            <a
                                href={paymentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                Click here to process payment
                            </a>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
