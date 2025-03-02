import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import axiosInstance from "@/api/axiosInstance.ts";

export default function RefundList() {
    const [refundList, setRefundList] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Refund List from backend using axiosInstance
        const fetchRefundList = async () => {
            try {
                const response = await axiosInstance.get("/admin/refund-list");

                if (response.data) {
                    setRefundList(response.data);
                } else {
                    toast.error("No refunds available");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching refund list");
            }
        };

        fetchRefundList();
    }, []);

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-2xl font-semibold">Refund List</h1>
            {refundList.length === 0 ? (
                <p>No refunds available</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Refund Date</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {refundList.map((refund) => (
                            <TableRow key={refund._id}>
                                <TableCell>{refund.transaction_id}</TableCell>
                                <TableCell>{refund.amount}</TableCell>
                                <TableCell>{refund.refund_status}</TableCell>
                                <TableCell>{new Date(refund.refund_date).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
