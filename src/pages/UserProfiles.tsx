import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import ChangePassword from "../components/auth/ChangePassword";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../services/authService";
import { useEffect, useState } from "react";

export default function UserProfiles() {
  type UserDetails = {
  firstName: string;
  lastName: string;
  userName:string;
  email: string;
  phonenumber: number;
  role: string;
};
  const token = useAuth().token;
  const decoded = token ? jwtDecode<{id: string}>(token) : null;
  const userId = decoded ? decoded.id : undefined;
  const [user, setUser] = useState<UserDetails | undefined>();

  const fetchUserData = async() => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }
    try {     
      const response = await getUserById(userId); 
      console.log("User data fetched successfully:", response);
      setUser(response);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [userId])
  
  return (
    <>
      <PageMeta
        title="PerformanceMetricsDashboard | PerformanceMetricsDashboard-Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
            {user && (
          <UserMetaCard  userName={user.userName} role={user.role} /> )}
          {user && (
            <UserInfoCard
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              phonenumber={user.phonenumber}
              role={user.role}
            />
          )}
          <UserAddressCard />
          
        </div>
      </div>
    </>
  );
}
