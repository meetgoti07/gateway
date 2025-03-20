import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IndianRupee, CheckCircle2, AlertCircle } from "lucide-react"
import { CircularProgress } from "@/components/ui/progress"
import {AreaChartComponent} from "@/components/AreaChartComponent.tsx";
import {TransactionTable} from "@/components/TransactionTable.tsx";

// Sample data for the line chart
const lineChartData = [
    { date: "11-Mar", amount: 0.0 },
    { date: "12-Mar", amount: 0.0 },
    { date: "13-Mar", amount: 0.0 },
    { date: "14-Mar", amount: 0.0 },
    { date: "15-Mar", amount: 0.0 },
    { date: "16-Mar", amount: 0.0 },
    { date: "17-Mar", amount: 0.0 },
    { date: "18-Mar", amount: 0.0 },
    { date: "19-Mar", amount: 0.0 },
    { date: "20-Mar", amount: 0.0 },
]

export default function MerchantDashboard() {
    // Calculate percentage for the circular progress
    const totalTxns = 100
    const usedTxns = 4
    const percentageUsed = (usedTxns / totalTxns) * 100

    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-emerald-500 rounded-full p-3 flex items-center justify-center">
                            <IndianRupee className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <div className="text-2xl font-semibold">₹ 0</div>
                            <div className="text-muted-foreground">Today Receive Amount</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-emerald-500 rounded-full p-3 flex items-center justify-center">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <div className="text-2xl font-semibold">0</div>
                            <div className="text-muted-foreground">Today Success Transaction</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-emerald-500 rounded-full p-3 flex items-center justify-center">
                            <AlertCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <div className="text-2xl font-semibold">0</div>
                            <div className="text-muted-foreground">Today Pending Transaction</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Line Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Last 10 Days Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className={"p-0"}>
                        <div className="w-full">
                            <AreaChartComponent/>
                        </div>
                    </CardContent>
                </Card>

                {/* QR Transactions Statistics */}
                <Card>
                    <CardHeader>
                        <CardTitle>QR Transactions Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-6">
                        {/* Circular Progress */}
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <div className="absolute inset-0">
                                <CircularProgress value={percentageUsed} />
                            </div>
                            <div className="text-center">
                                <div className="text-emerald-600 font-medium">Transaction Used</div>
                                <div className="text-3xl font-bold">4.00%</div>
                            </div>
                        </div>

                        {/* Transaction Counts */}
                        <div className="grid grid-cols-2 w-full gap-4 text-center">
                            <div>
                                <div className="text-muted-foreground">Total Txns</div>
                                <div className="text-2xl font-bold">100</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">Used Txns</div>
                                <div className="text-2xl font-bold">4</div>
                            </div>
                        </div>

                        {/* Plan Status */}
                        <div className="w-full text-center">
                            <div className="text-muted-foreground">Plan Expire</div>
                            <div className="text-xl font-semibold">No Active Plan</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <TransactionTable/>
        </div>
    )
}

