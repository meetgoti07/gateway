import { useEffect, useState } from 'react';
import axiosInstance from "@/api/axiosInstance.ts";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Merchant = {
    legal_name: string;
    business_name: string;
    email: string;
    gst_no: string;
    pan_no: string;
    url: string;
    dob: string;
    business_category: string;
    msme_udyam_no: string;
    ownership_type: string;
    bank_acc_no: string;
    ifsc_code: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    aadhar_no: string;
    gender: string;
    createdAt: string;
};

const MerchantDashboard = () => {
    const [merchantData, setMerchantData] = useState<Merchant | null>(null);

    useEffect(() => {
        const fetchMerchantData = async () => {
            try {
                const response = await axiosInstance.post('/merchant/me'); // Assuming you have an endpoint for this
                setMerchantData(response.data.merchant);
            } catch (error) {
                console.error('Error fetching merchant data:', error);
            }
        };

        fetchMerchantData();
    }, []);

    if (!merchantData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Merchant Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Legal Name</Label>
                            <p>{merchantData.legal_name}</p>
                        </div>
                        <div>
                            <Label>Business Name</Label>
                            <p>{merchantData.business_name}</p>
                        </div>
                        <div>
                            <Label>Email</Label>
                            <p>{merchantData.email}</p>
                        </div>
                        <div>
                            <Label>GST No</Label>
                            <p>{merchantData.gst_no}</p>
                        </div>
                        <div>
                            <Label>PAN No</Label>
                            <p>{merchantData.pan_no}</p>
                        </div>
                        <div>
                            <Label>Website URL</Label>
                            <p>{merchantData.url}</p>
                        </div>
                        <div>
                            <Label>Date of Birth</Label>
                            <p>{new Date(merchantData.dob).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <Label>Business Category</Label>
                            <p>{merchantData.business_category}</p>
                        </div>
                        <div>
                            <Label>MSME/Udyam No</Label>
                            <p>{merchantData.msme_udyam_no}</p>
                        </div>
                        <div>
                            <Label>Ownership Type</Label>
                            <p>{merchantData.ownership_type}</p>
                        </div>
                        <div>
                            <Label>Bank Account No</Label>
                            <p>{merchantData.bank_acc_no}</p>
                        </div>
                        <div>
                            <Label>IFSC Code</Label>
                            <p>{merchantData.ifsc_code}</p>
                        </div>
                        <div>
                            <Label>Address Line 1</Label>
                            <p>{merchantData.address_line_1}</p>
                        </div>
                        <div>
                            <Label>Address Line 2</Label>
                            <p>{merchantData.address_line_2}</p>
                        </div>
                        <div>
                            <Label>City</Label>
                            <p>{merchantData.city}</p>
                        </div>
                        <div>
                            <Label>District</Label>
                            <p>{merchantData.district}</p>
                        </div>
                        <div>
                            <Label>State</Label>
                            <p>{merchantData.state}</p>
                        </div>
                        <div>
                            <Label>Pincode</Label>
                            <p>{merchantData.pincode}</p>
                        </div>
                        <div>
                            <Label>Aadhar No</Label>
                            <p>{merchantData.aadhar_no}</p>
                        </div>
                        <div>
                            <Label>Gender</Label>
                            <p>{merchantData.gender}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button variant="outline" onClick={() => alert('Edit functionality coming soon')}>
                            Edit Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MerchantDashboard;
