import { Suspense } from "react";
import ResetPassword from "../../authentication/reset-password";

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPassword />
        </Suspense>
    );
}
