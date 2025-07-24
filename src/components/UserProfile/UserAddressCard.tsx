
import { updatePassword } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef, useState } from "react";
import SuccessAlert from "../ui/alert/suceessAlert";
import ErrorAlert from "../ui/alert/errorAlert";
import { useNavigate } from "react-router-dom";




export default function UserAddressCard() {

  const [successPassword, setSuccess] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  let password = useRef<HTMLInputElement>(null);
  const token = useAuth().token;
  const decoded = token ? jwtDecode<{ id: string }>(token) : null;

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decoded) {
      console.error("Token is invalid or missing.");
      return;
    }
    const userId = decoded.id;
    const passwordref = password.current?.value ?? "";

    try {
      const response = await updatePassword(userId, passwordref);
      if (response) {
        console.log("password changed with success:", response);
        setSuccess(true);
      }
    } catch (error) {
      console.error("can't change password:", error);
      setVisible(true);

    }
  };

  useEffect(() => {
    if (visible || successPassword) {
      const timeoutId = setTimeout(() => {
          if (successPassword) {
          navigate("/");
        } else {
          navigate("/profile");
        }
        setVisible(false);
        setSuccess(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [visible, successPassword]);


  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Change Password
            </h4>

            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">

              {(successPassword || visible) && (
                <div className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50">
                  {successPassword && <SuccessAlert isVisible={successPassword} msg="Password changed successfully" />}
                  {visible && <ErrorAlert isVisible={visible} msg="failed to change password" />}  </div>)}


              <form onSubmit={changePassword} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-xs text-gray-500">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    ref={password}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-morgen hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>


        </div>
      </div>

    </>
  );
}
