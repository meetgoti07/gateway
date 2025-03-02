import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "@/pages/Auth/Login.tsx";
import Register from "@/pages/Auth/Register.tsx";
import MerchantOnboarding from "@/pages/Onboarding/MerchantOnboarding.tsx";
import MerchantDashboard from "@/pages/Dashboard/MerchantDashboard.tsx";
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

function App() {

    return (

        <Router>
            <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path={"/register"} element={<Register/>} />
                <Route path={"/onboarding"} element={<MerchantOnboarding/>} />
                <Route path={"/dashboard"} element={<ProtectedRoute component={<MerchantDashboard/>}/> }/>
                <Route path={"/secure/payment/:transaction_id"} element={<ProcessTransaction/>} />
                <Route path={"/demo"} element={<Initiate/>} />

                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin/escrow-list" element={<EscrowList />} />
                <Route path="/admin/merchant-list" element={<MerchantList />} />
                <Route path="/admin/refund-list" element={<RefundList />} />
                <Route path="/admin/settlement-list" element={<SettlementList />} />
                <Route path="/admin/transaction-list" element={<TransactionList />} />
            </Routes>
            </AuthProvider>
        </Router>

    );
}

export default App;
