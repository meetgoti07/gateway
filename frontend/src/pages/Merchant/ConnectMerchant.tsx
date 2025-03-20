import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
export default function UPIMerchantConnect() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-gray-800">Connect UPI Merchant</h1>
                <p className="text-gray-600 mt-1">Connect your Merchant App to the UPIGateway and accept payments online.</p>
            </div>

            {/* Main Section */}
            <Card className="grid md:grid-cols-2 gap-8 mb-16 items-center">
                <CardContent>
                    <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                        You are one step away from accepting the payment via QR
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Available Merchant: PhonePe Business, HDFC Bank SmartHub Vyapar, YONO SBI Merchant, Paytm for Business,
                        BharatPe for Merchants
                    </p>
                    <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white">
                        Select Merchant <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
                <div className="relative">
                    <img
                        src="https://picsum.photos/500/400"
                        alt="UPI Payment Options"
                        width={500}
                        height={400}
                        className="rounded-lg"
                    />
                </div>
            </Card>

            {/* How It Works Section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">How UPIGateway - Merchant Connect Work!</h2>
                <p className="text-gray-600 mb-8">
                    By following the below steps, you can get a better understanding of the functioning of the UPIGateway service.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Step 1 */}
                    <Card className="border border-gray-200">
                        <CardContent className="pt-6">
                            <div className="aspect-square relative mb-4">
                                <img src="https://picsum.photos/200" alt="Step 1" width={200} height={200} className="mx-auto" />
                            </div>
                            <div className="text-center mb-4">
                                <h3 className="font-semibold text-lg">Step 1</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                You must have a UPI Merchant account that is supported by UPIGateway to use our service. Create new
                                merchant account if you don't have one.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Step 2 */}
                    <Card className="border border-gray-200">
                        <CardContent className="pt-6">
                            <div className="aspect-square relative mb-4">
                                <img src="https://picsum.photos/200" alt="Step 2" width={200} height={200} className="mx-auto" />
                            </div>
                            <div className="text-center mb-4">
                                <h3 className="font-semibold text-lg">Step 2</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                <span className="text-emerald-600 font-medium">Connect your preferred UPI Merchant account</span> with
                                UPIGateway, and <span className="text-emerald-600 font-medium">integrate our API</span> with your portal
                                for seamless integration of our UPIGateway service.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Step 3 */}
                    <Card className="border border-gray-200">
                        <CardContent className="pt-6">
                            <div className="aspect-square relative mb-4">
                                <img src="https://picsum.photos/200" alt="Step 3" width={200} height={200} className="mx-auto" />
                            </div>
                            <div className="text-center mb-4">
                                <h3 className="font-semibold text-lg">Step 3</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                We will create the QR code for your merchant account on your behalf as part of our service, which will
                                allow you to receive UPI payments effortlessly.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Step 4 */}
                    <Card className="border border-gray-200">
                        <CardContent className="pt-6">
                            <div className="aspect-square relative mb-4">
                                <img src="https://picsum.photos/200/" alt="Step 4" width={200} height={200} className="mx-auto" />
                            </div>
                            <div className="text-center mb-4">
                                <h3 className="font-semibold text-lg">Step 4</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Our QR code enables easy and secure payment acceptance from any UPI app, with automatic transaction
                                confirmation via <span className="text-emerald-600 font-medium">Webhook</span>.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

