import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import axiosInstance from "@/api/axiosInstance.ts";

export default function SettlementList() {
    const [settlementList, setSettlementList] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Settlement List from backend using axiosInstance
        const fetchSettlementList = async () => {
            try {
                const response = await axiosInstance.get("/admin/settlement-list");

                if (response.data) {
                    setSettlementList(response.data);
                } else {
                    toast.error("No settlements available");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching settlement list");
            }
        };

        fetchSettlementList();
    }, []);

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-2xl font-semibold">Settlement List</h1>
            {settlementList.length === 0 ? (
                <p>No settlements available</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Escrow ID</TableCell>
                            <TableCell>Merchant</TableCell>
                            <TableCell>Amount Settled</TableCell>
                            <TableCell>Settlement Date</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {settlementList.map((settlement) => (
                            <TableRow key={settlement._id}>
                                <TableCell>{settlement.escrow_account_id}</TableCell>
                                <TableCell>{settlement.merchant_id.name}</TableCell>
                                <TableCell>{settlement.amount_settled}</TableCell>
                                <TableCell>{new Date(settlement.settlement_date).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
