import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";
import { FaAt } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import logo from "../assets/logo.jpg";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const auth = useAuth();

  const validationSchema = yup.object().shape({
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Confirm password must match"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must 8 characters or more"),
    email: yup.string().required("Email is required").email("Email invalid"),
  });

  async function handleSubmit(values, { setSubmitting }) {
    try {
      await validationSchema.validate(values);
      setSubmitting(true);
      const { confirmPassword, ...sendValue } = values;
      const response = await auth.registerAction(sendValue);
      if (response.statusCode === 400) {
        toast.error(response.message);
      }
      return;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster position="bottom-right" />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <Field
                    name="email"
                    autoComplete="email"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2 flex items-center space-x-5 rounded-md border-0">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="block w-full pl-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {showPassword ? (
                    <FaEye
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 cursor-pointer"
                      size={23}
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 cursor-pointer"
                      size={23}
                    />
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2 flex items-center space-x-5">
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {showConfirmPassword ? (
                    <FaEye
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-gray-500 cursor-pointer"
                      size={23}
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-gray-500 cursor-pointer"
                      size={23}
                    />
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </Form>
          </Formik>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Continue this way
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
