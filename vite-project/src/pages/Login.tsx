// Redirected from Landing Page
// Once login successful, direct to Dashboard Page

import OnLogin from "@/scenes/login";
export default function LoginPage(){
    return(
        <div className="app bg-gray-20">
            <OnLogin></OnLogin>
        </div>
    );
}
