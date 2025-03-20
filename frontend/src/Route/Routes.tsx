import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "@/pages/Auth/Login.tsx";
import Register from "@/pages/Auth/Register.tsx";
import MerchantOnboarding from "@/pages/Onboarding/MerchantOnboarding.tsx";
import ProcessTransaction from "@/pages/Gateway/ProcessTransaction.tsx";
import Initiate from "@/pages/Demo/Initiate.tsx";
import EscrowList from "@/pages/Admin/EscrowList.tsx";
import MerchantList from "@/pages/Admin/MerchantList.tsx";
import RefundList from "@/pages/Admin/RefundList.tsx";
import SettlementList from "@/pages/Admin/SettlementList.tsx";
import TransactionList from "@/pages/Admin/TransactionList.tsx";
import AdminLogin from "@/pages/Admin/AdminLogin.tsx";
import {AuthProvider} from "@/AuthContext/AuthContext.tsx";
import ProtectedRoute from "@/AuthContext/ProtectedRoute.tsx";
import MerchantEscrowList from "@/pages/Merchant/MerchantEscrowList.tsx";
import MerchantRefundList from "@/pages/Merchant/MerchantRefundList.tsx";
import MerchantSettlementList from "@/pages/Merchant/MerchantSettlementList.tsx";
import MerchantTransactionList from "@/pages/Merchant/MerchantTransactionList.tsx";
import Layout from "@/layout/Layout.tsx";
import MerchantDashboard from "@/pages/Merchant/MerchantDashboard.tsx";
import UPIMerchantConnect from "@/pages/Merchant/ConnectMerchant.tsx";
import TransactionHistory from "@/pages/Merchant/TransactionHistory.tsx";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Public routes without Layout */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/onboarding" element={<MerchantOnboarding />} />
                    <Route path="/secure/payment/:transaction_id" element={<ProcessTransaction />} />
                    <Route path="/admin-login" element={<AdminLogin />} />

                    {/* All other routes wrapped in Layout */}
                    <Route path="/" element={<Layout />}>
                        {/* Demo page */}
                        <Route path="demo" element={<Initiate />} />

                        {/* Dashboard routes */}
                        <Route path="dashboard">
                            <Route index element={<ProtectedRoute component={<MerchantDashboard />} />} />
                            <Route path="escrow-list" element={<ProtectedRoute component={<MerchantEscrowList />} />} />
                            <Route path="refund-list" element={<ProtectedRoute component={<MerchantRefundList />} />} />
                            <Route path="settlement-list" element={<ProtectedRoute component={<MerchantSettlementList />} />} />
                            <Route path="transaction-list" element={<ProtectedRoute component={<MerchantTransactionList />} />} />
                            <Route path="merchant-connect" element={<ProtectedRoute component={<UPIMerchantConnect />} />} />
                            <Route path="transaction-history" element={<ProtectedRoute component={<TransactionHistory />} />} />
                        </Route>

                        {/* Admin routes */}
                        <Route path="admin">
                            <Route path="escrow-list" element={<ProtectedRoute component={<EscrowList />} />} />
                            <Route path="merchant-list" element={<ProtectedRoute component={<MerchantList />} />} />
                            <Route path="refund-list" element={<ProtectedRoute component={<RefundList />} />} />
                            <Route path="settlement-list" element={<ProtectedRoute component={<SettlementList />} />} />
                            <Route path="transaction-list" element={<ProtectedRoute component={<TransactionList />} />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;