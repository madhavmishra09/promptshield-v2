import { Suspense } from "react";
import VerifyOTP from "../../authentication/verify-otp";

export default function VerifyOTPPage() {
    return (
        <Suspense>
            <VerifyOTP />
        </Suspense>
    );
}
