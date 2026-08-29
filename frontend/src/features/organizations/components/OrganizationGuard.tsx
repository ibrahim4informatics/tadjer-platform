import { Outlet } from "react-router-dom"

const OrganizationGuard = () => {
  
    // Fetch the current selected organization

    // if user does not have a selected organization, redirect to the select organization page.
    
    // if (!selectedOrganization) {
    //     return <Navigate to="/app/select-organization" />;
    // }

    
    // If the user has a selected organization, render the content, otherwise redirect to the select organization page.

    return <Outlet />
}

export default OrganizationGuard