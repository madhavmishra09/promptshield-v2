import Login from "./authentication/login";
import SignUp from "./authentication/signup";
import ForgotPassword from "./authentication/forgot-password";
import VerifyOTP from "./authentication/verify-otp";
import ResetPassword from "./authentication/reset-password";
import ResetSuccess from "./authentication/reset-success";
import NavBar from "./components/Navbar";
import PromptInput from "./components/PromptInput";
import ChatMessage from "./components/ChatMessage";
import SecurityBadge from "./components/SecurityBadge";
import MetricCard from "./components/MetricCard"
import AttackChart from "./components/AttackChart";
import SecurityEventTable from "./components/SecurityEventTable";
import './globals.css'
export default function Home() {
  return (
    <>
        <SecurityEventTable/>
    </>
  );
}
