import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"; // Shadcn Table components
import { toast } from "sonner";
import axiosInstance from "@/api/axiosInstance.ts";

export default function MerchantList() {
    const [merchantList, setMerchantList] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Merchant List from backend using axiosInstance
        const fetchMerchantList = async () => {
            try {
                const response = await axiosInstance.get("/admin/merchant-list");

                if (response.data) {
                    setMerchantList(response.data);
                } else {
                    toast.error("No merchants available");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching merchant list");
            }
        };

        fetchMerchantList();
    }, []);

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-2xl font-semibold">Merchant List</h1>
            {merchantList.length === 0 ? (
                <p>No merchants available</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Merchant ID</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Legal Name</TableCell>
                            <TableCell>Business Name</TableCell>
                            <TableCell>Business Category</TableCell>
                            <TableCell>Address Line 1</TableCell>
                            <TableCell>Address Line 2</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Pincode</TableCell>
                            <TableCell>GST No</TableCell>
                            <TableCell>PAN No</TableCell>
                            <TableCell>Aadhar No</TableCell>
                            <TableCell>Bank Account No</TableCell>
                            <TableCell>IFSC Code</TableCell>
                            <TableCell>Ownership Type</TableCell>
                            <TableCell>MSME Udyam No</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>DOB</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>Website URL</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {merchantList.map((merchant) => (
                            <TableRow key={merchant._id}>
                                <TableCell>{merchant._id}</TableCell>
                                <TableCell>{merchant.email}</TableCell>
                                <TableCell>{merchant.legal_name}</TableCell>
                                <TableCell>{merchant.business_name}</TableCell>
                                <TableCell>{merchant.business_category}</TableCell>
                                <TableCell>{merchant.address_line_1}</TableCell>
                                <TableCell>{merchant.address_line_2}</TableCell>
                                <TableCell>{merchant.city}</TableCell>
                                <TableCell>{merchant.state}</TableCell>
                                <TableCell>{merchant.pincode}</TableCell>
                                <TableCell>{merchant.gst_no}</TableCell>
                                <TableCell>{merchant.pan_no}</TableCell>
                                <TableCell>{merchant.aadhar_no}</TableCell>
                                <TableCell>{merchant.bank_acc_no}</TableCell>
                                <TableCell>{merchant.ifsc_code}</TableCell>
                                <TableCell>{merchant.ownership_type}</TableCell>
                                <TableCell>{merchant.msme_udyam_no}</TableCell>
                                <TableCell>{merchant.gender}</TableCell>
                                <TableCell>{new Date(merchant.dob).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(merchant.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{new Date(merchant.updatedAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <a href={merchant.url} target="_blank" rel="noopener noreferrer">
                                        {merchant.url}
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
