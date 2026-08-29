import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="w-full h-screen bg-primary-foreground flex items-center justify-center">
            <Outlet />
        </div>
    )
}