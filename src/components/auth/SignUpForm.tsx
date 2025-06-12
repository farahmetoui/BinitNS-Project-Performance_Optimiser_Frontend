import { useEffect, useRef, useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { createUser } from "../../services/authService";
import ErrorAlert from "../ui/alert/errorAlert";
import SuccessAlert from "../ui/alert/suceessAlert";
import DropdownBox from "../../pages/UiElements/DropDown";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string>('')
  let email = useRef<HTMLInputElement>(null);
  let password = useRef<HTMLInputElement>(null);
  let firstName = useRef<HTMLInputElement>(null);
  let lastName = useRef<HTMLInputElement>(null);
  let userName = useRef<HTMLInputElement>(null);
  let phonenumber = useRef<HTMLInputElement>(null);


  const [successLogin, setSuccess] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    const emailref = email.current?.value ?? "";
    const passwordref = password.current?.value ?? "";
    const firstNameref = firstName.current?.value ?? "";
    const lastNameref = lastName.current?.value ?? "";
    const userNameref = userName.current?.value ?? "";
    const phonenumberref = Number(phonenumber.current?.value ?? "");

    e.preventDefault();
    console.log(emailref);
    try {
      const response = await createUser(firstNameref, lastNameref, userNameref, emailref, phonenumberref, passwordref,"tester");
      if (response) {
        setSuccess(true);

        console.log("user creates successful:", response);
      }
    } catch (error) {
      setVisible(true);
      console.log("can't create User:", error);
    }
  };


  useEffect(() => {
    if (visible || successLogin) {
      const timeoutId = setTimeout(() => {
        setVisible(false);
        setSuccess(false);
        navigate("/listUsers");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [visible, successLogin]);
  return (
    <div className="flex flex-col flex-1 w-full h-auto lg:w-1/2">

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">

        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Create User
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            fill out this form to create user
          </p>

          <div>

            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Form
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {visible && <ErrorAlert isVisible={visible} msg="account created successfully" />}
              {successLogin && <SuccessAlert isVisible={successLogin} msg="Account creation failed" />}

              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      ref={firstName}
                      id="fname"
                      name="fname"
                      placeholder="Enter the first name"
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      ref={lastName}
                      id="lname"
                      name="lname"
                      placeholder="Enter the last name"
                    />
                  </div>
                </div>


                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1 ">
                    <Label>
                      UserName<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="userName"
                      ref={userName}
                      name="userName"
                      placeholder="Enter the userName of the user you want to create "
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      PhoneNumber<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      ref={phonenumber}
                      id="phonenumber"
                      name="phonenumber"
                      placeholder="Enter the phone number"
                      min="10000000"
                      max="99999999"
                    />

                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- Email --> */}
                  <div>
                    <Label>
                      Email<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      ref={email}
                      id="email2"
                      name="email"
                      placeholder="Enter the email"
                    />
                  </div>
                  <div className="py-7">
                    <DropdownBox
                      options={[{ label: 'developer' }, { label: 'tester' }]}
                      onSelect={setRole}
                      selected={role}
                    />
                    
                  </div>
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      ref={password}
                      id="password"
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
                <button className="flex items-center my-8 justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                  create user
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
