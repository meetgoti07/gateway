import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from "sonner";
import axiosInstance from "@/api/axiosInstance.ts";

export default function ProcessTransaction() {
    const { transaction_id } = useParams();
    const navigate = useNavigate();

    console.log(transaction_id);
    const [upiId, setUpiId] = useState("");
    const [isUpiVerified, setIsUpiVerified] = useState(false);
    const [transaction, setTransaction] = useState(null);
    const [timer, setTimer] = useState(600); // 10 min for VPA
    const [paymentTimer, setPaymentTimer] = useState(300); // 5 min for payment
    const [isPaymentStarted, setIsPaymentStarted] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    /**
     * 🔹 Fetch Transaction Data from Backend
     * ✅ If transaction is invalid or expired, redirect to error page
     */
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await axiosInstance.get(`/secure/process/transaction/${transaction_id}`);
                const data = await response.data;

                if (data.error) {
                    toast.error("Transaction invalid or expired. Redirecting...");
                    setTimeout(() => navigate("/error"), 2000);
                } else {
                    setTransaction(data);
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching transaction details.");
            }
        };

        if (transaction_id) {
            fetchTransaction();
        } else {
            toast.error("Invalid transaction ID. Redirecting...");
            setTimeout(() => navigate("/error"), 2000);
        }
    }, [transaction_id]);

    /**
     * 🔹 Countdown Timer for VPA Entry (10 Minutes)
     * ✅ If time expires, redirect user
     */
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        } else {
            toast.error("Transaction expired. Redirecting...");
            setTimeout(() => navigate("/merchant-portal"), 2000);
        }
    }, [timer]);

    /**
     * 🔹 Countdown for Payment Completion (5 Minutes)
     * ✅ If time expires, mark transaction as failed
     */
    useEffect(() => {
        if (isPaymentStarted && paymentTimer > 0) {
            const interval = setInterval(() => setPaymentTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        } else if (isPaymentStarted) {
            toast.error("Transaction failed. Redirecting...");
            setTimeout(() => navigate("/merchant-portal"), 2000);
        }
    }, [isPaymentStarted, paymentTimer]);

    /**
     * 🔹 Handle Verifying UPI ID
     * ✅ Ensure UPI ID format is correct before proceeding
     */
    const handleVerifyUpi = () => {
        if (!upiId.match(/^[a-zA-Z0-9.\-_]+@[a-zA-Z]+$/)) {
            toast.error("Invalid UPI ID. Please enter a valid one.");
            return;
        }
        setIsUpiVerified(true);
        toast.success("UPI ID Verified!");
    };

    /**
     * 🔹 Handle Payment Start
     * ✅ Once started, user must complete within 5 minutes
     */
    const handleStartPayment = async () => {
        setIsPaymentStarted(true);
        toast.info("Please complete the payment within 5 minutes.");
    };

    /**
     * 🔹 Prevent Accidental Back Navigation
     * ✅ Opens drawer to confirm cancellation
     */
    useEffect(() => {
        const handlePopState = (event: any) => {
            event.preventDefault();
            setShowDrawer(true);
            window.history.pushState(null, "", window.location.pathname);
        };

        window.history.pushState(null, "", window.location.pathname);
        window.addEventListener("popstate", handlePopState);

        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl text-center">UPI Payment</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Show Transaction Details */}
                    {transaction ? (
                        <>
                            <div className="mb-4 text-center">
                                <span className="font-semibold">Transaction ID:</span> {transaction.transaction_id}
                            </div>
                            <div className="mb-4 text-center">
                                <span className="font-semibold">Order ID:</span> {transaction.order_id}
                            </div>
                            <div className="mb-4 text-center">
                                <span className="font-semibold">Amount:</span> ₹{transaction.amount}
                            </div>

                            {/* Timer Display */}
                            <div className="text-center mb-4 text-red-500">
                                {isPaymentStarted
                                    ? `Complete the payment in ${Math.floor(paymentTimer / 60)}:${String(paymentTimer % 60).padStart(2, "0")}`
                                    : `Enter UPI ID within ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}
                            </div>

                            {/* UPI ID Input */}
                            {!isUpiVerified && (
                                <div className="flex flex-col gap-2">
                                    <Input
                                        placeholder="Enter your UPI ID (e.g., user@upi)"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                    />
                                    <Button onClick={handleVerifyUpi} className="w-full">
                                        Verify UPI ID
                                    </Button>
                                </div>
                            )}

                            {/* Proceed to Payment Button */}
                            {isUpiVerified && !isPaymentStarted && (
                                <Button onClick={handleStartPayment} className="w-full mt-4">
                                    Proceed to Pay ₹{transaction.amount}
                                </Button>
                            )}

                            {/* Payment in Progress Message */}
                            {isPaymentStarted && (
                                <div className="mt-4 text-center text-green-600">
                                    Open your UPI app and complete the transaction.
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center text-gray-500">Loading transaction details...</div>
                    )}
                </CardContent>
            </Card>

            {/* Bottom Drawer for Back Navigation */}
            <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
                <DrawerTrigger />
                <DrawerContent className="p-4">
                    <p className="text-lg font-semibold mb-3">Are you sure you want to cancel?</p>
                    <div className="flex justify-between">
                        <Button onClick={() => setShowDrawer(false)} variant="outline">
                            Stay on Page
                        </Button>
                        <Button onClick={() => navigate("/merchant-portal")} variant="destructive">
                            Cancel Transaction
                        </Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
