import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { loginRequest } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function SignInForm() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [successLogin, setSuccess] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  let email = useRef<HTMLInputElement>(null);
  let password = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    const emailref = email.current?.value ?? "";
    const passwordref = password.current?.value ?? "";
    e.preventDefault();
    console.log(emailref);
    try {
      const response = await loginRequest(emailref, passwordref);
      if (response) {
        setSuccess(true);
        setToken(response.token);
        navigate("/");
        console.log("Login successful:", response);
      }
    } catch (error) {
      setVisible(true);

    }
  };

  useEffect(() => {
    if (visible || successLogin) {
      const timeoutId = setTimeout(() => {
        setVisible(false);
        setSuccess(false);
        if (successLogin) {

          navigate("/");
        } else {
          navigate("/signin");
        }
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [visible, successLogin]);

  return (
    <div className="flex flex-col flex-1">

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input type="email"
                    ref={email}
                    placeholder="Enter your email" />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      ref={password}
                      placeholder="6+ Characters, 1 Capital letter"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
