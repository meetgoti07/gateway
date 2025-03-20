"use client"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'

// Sample transaction data (empty for now, matching the image)
const transactions: Transaction[] = []

// Transaction type definition
type Transaction = {
    id: number
    customerName: string
    clientTxnId: string
    amount: number
    status: "success" | "pending" | "failed"
    date: string
}

export function TransactionTable() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
                <CardTitle className="text-xl font-semibold">Today Activity</CardTitle>
                <Button variant="outline" className="flex items-center gap-1">
                    View All Transactions
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">#</TableHead>
                            <TableHead>Customer Name</TableHead>
                            <TableHead>Client Txn ID</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No transactions for today
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>{transaction.customerName}</TableCell>
                                    <TableCell>{transaction.clientTxnId}</TableCell>
                                    <TableCell>₹ {transaction.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                    <span className={getStatusClass(transaction.status)}>
                      {transaction.status}
                    </span>
                                    </TableCell>
                                    <TableCell>{transaction.date}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

// Helper function to get the appropriate status class
function getStatusClass(status: string) {
    switch (status) {
        case "success":
            return "inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
        case "pending":
            return "inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
        case "failed":
            return "inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
        default:
            return ""
    }
}
