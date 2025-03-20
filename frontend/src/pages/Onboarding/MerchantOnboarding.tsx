import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input"; // Shadcn Input component
import { Button } from "@/components/ui/button"; // Shadcn Button component
import { Label } from "@/components/ui/label"; // Shadcn Label component
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import axiosInstance from "@/api/axiosInstance.ts";
import {useNavigate} from "react-router-dom"; // Shadcn Card components

// Define Zod Schema for Validation
const formSchema = z.object({
    legal_name: z.string().min(2, { message: "Legal Name must be at least 2 characters." }),
    business_name: z.string().min(2, { message: "Business Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address" }),
    gst_no: z.string().min(15, { message: "GST number must be 15 characters." }),
    pan_no: z.string().min(10, { message: "PAN number must be 10 characters." }),
    url: z.string().url({ message: "Invalid URL" }),
    dob: z.string().min(10, { message: "Date of Birth is required" }),
    business_category: z.string().min(2, { message: "Business Category is required" }),
    msme_udyam_no: z.string().min(10, { message: "MSME Udyam number must be 10 characters." }),
    ownership_type: z.string().min(3, { message: "Ownership Type is required" }),
    bank_acc_no: z.string().min(10, { message: "Bank Account Number must be at least 10 characters." }),
    ifsc_code: z.string().min(11, { message: "IFSC Code must be 11 characters." }),
    address_line_1: z.string().min(5, { message: "Address Line 1 is required" }),
    address_line_2: z.string().optional(),
    city: z.string().min(2, { message: "City is required" }),
    district: z.string().min(2, { message: "District is required" }),
    state: z.string().min(2, { message: "State is required" }),
    pincode: z.string().min(6, { message: "Pincode is required" }),
    aadhar_no: z.string().min(12, { message: "Aadhar Number must be 12 digits." }),
    gender: z.string().min(1, { message: "Gender is required" }),
});

type MerchantFormData = z.infer<typeof formSchema>;

export default function MerchantOnboarding() {
    const navigate = useNavigate();
    // 1. Initialize react-hook-form
    const form = useForm<MerchantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            legal_name: "",
            business_name: "",
            email: "",
            gst_no: "",
            pan_no: "",
            url: "",
            dob: "",
            business_category: "",
            msme_udyam_no: "",
            ownership_type: "",
            bank_acc_no: "",
            ifsc_code: "",
            address_line_1: "",
            address_line_2: "",
            city: "",
            district: "",
            state: "",
            pincode: "",
            aadhar_no: "",
            gender: "",
        },
    });

    // 2. Define submit handler
    const onSubmit = async (data: MerchantFormData) => {
        console.log(data); // Do something with form data (like sending it to an API)
        const response = await axiosInstance.post("/merchant/register", data);
        if(response) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Merchant Registration</CardTitle>
                        <CardDescription>Enter the details to register as a merchant.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Legal Name */}
                            <div className="grid gap-3">
                                <Label htmlFor="legal_name">Legal Name</Label>
                                <Input
                                    id="legal_name"
                                    type="text"
                                    {...form.register("legal_name")}
                                    placeholder="Enter legal name"
                                />
                                {form.formState.errors.legal_name && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.legal_name?.message}</p>
                                )}
                            </div>

                            {/* Business Name */}
                            <div className="grid gap-3">
                                <Label htmlFor="business_name">Business Name</Label>
                                <Input
                                    id="business_name"
                                    type="text"
                                    {...form.register("business_name")}
                                    placeholder="Enter business name"
                                />
                                {form.formState.errors.business_name && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.business_name?.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...form.register("email")}
                                    placeholder="Enter email address"
                                />
                                {form.formState.errors.email && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.email?.message}</p>
                                )}
                            </div>

                            {/* GST Number */}
                            <div className="grid gap-3">
                                <Label htmlFor="gst_no">GST Number</Label>
                                <Input
                                    id="gst_no"
                                    type="text"
                                    {...form.register("gst_no")}
                                    placeholder="Enter GST number"
                                />
                                {form.formState.errors.gst_no && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.gst_no?.message}</p>
                                )}
                            </div>

                            {/* PAN Number */}
                            <div className="grid gap-3">
                                <Label htmlFor="pan_no">PAN Number</Label>
                                <Input
                                    id="pan_no"
                                    type="text"
                                    {...form.register("pan_no")}
                                    placeholder="Enter PAN number"
                                />
                                {form.formState.errors.pan_no && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.pan_no?.message}</p>
                                )}
                            </div>

                            {/* URL */}
                            <div className="grid gap-3">
                                <Label htmlFor="url">Business URL</Label>
                                <Input
                                    id="url"
                                    type="text"
                                    {...form.register("url")}
                                    placeholder="Enter website URL"
                                />
                                {form.formState.errors.url && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.url?.message}</p>
                                )}
                            </div>

                            {/* Date of Birth */}
                            <div className="grid gap-3">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input
                                    id="dob"
                                    type="date"
                                    {...form.register("dob")}
                                    placeholder="Enter date of birth"
                                />
                                {form.formState.errors.dob && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.dob?.message}</p>
                                )}
                            </div>

                            {/* Business Category */}
                            <div className="grid gap-3">
                                <Label htmlFor="business_category">Business Category</Label>
                                <Input
                                    id="business_category"
                                    type="text"
                                    {...form.register("business_category")}
                                    placeholder="Enter business category"
                                />
                                {form.formState.errors.business_category && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.business_category?.message}</p>
                                )}
                            </div>

                            {/* MSME Udyam No */}
                            <div className="grid gap-3">
                                <Label htmlFor="msme_udyam_no">MSME Udyam No</Label>
                                <Input
                                    id="msme_udyam_no"
                                    type="text"
                                    {...form.register("msme_udyam_no")}
                                    placeholder="Enter MSME Udyam number"
                                />
                                {form.formState.errors.msme_udyam_no && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.msme_udyam_no?.message}</p>
                                )}
                            </div>

                            {/* Ownership Type */}
                            <div className="grid gap-3">
                                <Label htmlFor="ownership_type">Ownership Type</Label>
                                <Input
                                    id="ownership_type"
                                    type="text"
                                    {...form.register("ownership_type")}
                                    placeholder="Enter ownership type"
                                />
                                {form.formState.errors.ownership_type && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.ownership_type?.message}</p>
                                )}
                            </div>

                            {/* Bank Account Number */}
                            <div className="grid gap-3">
                                <Label htmlFor="bank_acc_no">Bank Account Number</Label>
                                <Input
                                    id="bank_acc_no"
                                    type="text"
                                    {...form.register("bank_acc_no")}
                                    placeholder="Enter bank account number"
                                />
                                {form.formState.errors.bank_acc_no && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.bank_acc_no?.message}</p>
                                )}
                            </div>

                            {/* IFSC Code */}
                            <div className="grid gap-3">
                                <Label htmlFor="ifsc_code">IFSC Code</Label>
                                <Input
                                    id="ifsc_code"
                                    type="text"
                                    {...form.register("ifsc_code")}
                                    placeholder="Enter IFSC code"
                                />
                                {form.formState.errors.ifsc_code && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.ifsc_code?.message}</p>
                                )}
                            </div>

                            {/* Address Line 1 */}
                            <div className="grid gap-3">
                                <Label htmlFor="address_line_1">Address Line 1</Label>
                                <Input
                                    id="address_line_1"
                                    type="text"
                                    {...form.register("address_line_1")}
                                    placeholder="Enter address line 1"
                                />
                                {form.formState.errors.address_line_1 && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.address_line_1?.message}</p>
                                )}
                            </div>

                            {/* Address Line 2 */}
                            <div className="grid gap-3">
                                <Label htmlFor="address_line_2">Address Line 2</Label>
                                <Input
                                    id="address_line_2"
                                    type="text"
                                    {...form.register("address_line_2")}
                                    placeholder="Enter address line 2"
                                />
                            </div>

                            {/* City */}
                            <div className="grid gap-3">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    {...form.register("city")}
                                    placeholder="Enter city"
                                />
                                {form.formState.errors.city && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.city?.message}</p>
                                )}
                            </div>

                            {/* District */}
                            <div className="grid gap-3">
                                <Label htmlFor="district">District</Label>
                                <Input
                                    id="district"
                                    type="text"
                                    {...form.register("district")}
                                    placeholder="Enter district"
                                />
                                {form.formState.errors.district && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.district?.message}</p>
                                )}
                            </div>

                            {/* State */}
                            <div className="grid gap-3">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    type="text"
                                    {...form.register("state")}
                                    placeholder="Enter state"
                                />
                                {form.formState.errors.state && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.state?.message}</p>
                                )}
                            </div>

                            {/* Pincode */}
                            <div className="grid gap-3">
                                <Label htmlFor="pincode">Pincode</Label>
                                <Input
                                    id="pincode"
                                    type="text"
                                    {...form.register("pincode")}
                                    placeholder="Enter pincode"
                                />
                                {form.formState.errors.pincode && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.pincode?.message}</p>
                                )}
                            </div>

                            {/* Aadhar Number */}
                            <div className="grid gap-3">
                                <Label htmlFor="aadhar_no">Aadhar Number</Label>
                                <Input
                                    id="aadhar_no"
                                    type="text"
                                    {...form.register("aadhar_no")}
                                    placeholder="Enter aadhar number"
                                />
                                {form.formState.errors.aadhar_no && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.aadhar_no?.message}</p>
                                )}
                            </div>

                            {/* Gender */}
                            <div className="grid gap-3">
                                <Label htmlFor="gender">Gender</Label>
                                <select
                                    id="gender"
                                    {...form.register("gender")}
                                    className="border px-3 py-2 rounded-md w-full"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {form.formState.errors.gender && (
                                    <p className="text-red-500 text-sm">{form.formState.errors.gender?.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-center">
                                <Button type="submit" className="w-full">
                                    Register Merchant
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
