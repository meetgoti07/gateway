import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"; // Shadcn Table components
import { toast } from "sonner";
import axiosInstance from "@/api/axiosInstance.ts";

export default function EscrowList() {
    const [escrowList, setEscrowList] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Escrow List from backend using axiosInstance
        const fetchEscrowList = async () => {
            try {
                const response = await axiosInstance.get("/admin/escrow-list");

                if (response.data) {
                    setEscrowList(response.data);
                } else {
                    toast.error("No escrow accounts available");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching escrow list");
            }
        };

        fetchEscrowList();
    }, []);

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-2xl font-semibold">Escrow Account List</h1>
            {escrowList.length === 0 ? (
                <p>No escrow accounts available</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Merchant</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {escrowList.map((escrow) => (
                            <TableRow key={escrow._id}>
                                <TableCell>{escrow._id}</TableCell>
                                <TableCell>{escrow.transaction_id}</TableCell>
                                <TableCell>{escrow.merchant_id.name}</TableCell>
                                <TableCell>{escrow.amount}</TableCell>
                                <TableCell>{escrow.status}</TableCell>
                                <TableCell>{new Date(escrow.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
