import {  Outlet } from "react-router-dom"


export function AuthGuard() {
    // Get the current location to redirect the user back after login if needed.
    // use it to pass the current location to the login page so that after successful login, the user can be redirected back to the page they were trying to access.
    // const location = useLocation()

    // Fetch current user from the server to check if the user is authenticated.


    // Return the content if the user is authenticated, otherwise redirect to the login page.
    return <Outlet />
}
