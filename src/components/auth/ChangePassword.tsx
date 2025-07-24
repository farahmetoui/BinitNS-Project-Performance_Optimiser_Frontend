import { useEffect, useRef, useState } from "react";
import { updatePassword } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

export default function ChangePassword() {

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
          }
        } catch (error) {
            console.error("can't change password:", error);
         
        }
      };


      return (
        <div className="flex justify-center items-center  flex-col">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <form onSubmit={changePassword} className="space-y-6">
                <div>
                    <label htmlFor="password" className="block text-sm font-bold text-gray-700">
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
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                   Change Password
                </button>
                </form>
            </div>
         

        </div>
      )


}