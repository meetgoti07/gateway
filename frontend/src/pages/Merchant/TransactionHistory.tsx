import {TransactionTable} from "@/components/TransactionTable.tsx";
export default function TransactionHistory() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-gray-800">Payment Report</h1>
                <p className="text-gray-600 mt-1">Here, you can see the subscription purchase history</p>
            </div>
            <TransactionTable/>
        </div>
    )
}

