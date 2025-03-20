import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"; // Shadcn Table components
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge"; // Assuming Shadcn Badge component is used
import axiosInstance from "@/api/axiosInstance.ts";

export default function MerchantTransactionList() {
    const [transactionList, setTransactionList] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Transaction List from backend using axiosInstance
        const fetchTransactionList = async () => {
            try {
                const response = await axiosInstance.get("/merchant/transaction-list");

                if (response.data) {
                    setTransactionList(response.data);
                } else {
                    toast.error("No transactions available");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching transaction list");
            }
        };

        fetchTransactionList();
    }, []);

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-2xl font-semibold">Transaction List</h1>
            {transactionList.length === 0 ? (
                <p>No transactions available</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Merchant Name</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Customer Email</TableCell>
                            <TableCell>Customer Mobile</TableCell>
                            <TableCell>Success URL</TableCell>
                            <TableCell>Error URL</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Expires At</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactionList.map((transaction) => (
                            <TableRow key={transaction._id}>
                                <TableCell>{transaction._id}</TableCell>
                                <TableCell>{transaction.transaction_id}</TableCell>
                                <TableCell>{transaction.merchant_id?.legal_name || "N/A"}</TableCell>
                                <TableCell>{transaction.order_id}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.customer_name || "N/A"}</TableCell>
                                <TableCell>{transaction.customer_email || "N/A"}</TableCell>
                                <TableCell>{transaction.customer_mobile || "N/A"}</TableCell>
                                <TableCell>
                                    <a href={transaction.success_url} target="_blank" rel="noopener noreferrer">
                                        {transaction.success_url}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <a href={transaction.error_url} target="_blank" rel="noopener noreferrer">
                                        {transaction.error_url}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={transaction.status === "failed" ? "destructive" :  "default"}>
                                        {transaction.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(transaction.created_at).toLocaleString()}</TableCell>
                                <TableCell>{new Date(transaction.expires_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
