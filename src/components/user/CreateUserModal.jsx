import { Field, Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import * as yup from "yup";
import { createUserApi } from "../../api/UserApi";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { FaAt } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function CreateUserModal({ onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  };

  const validationSchema = yup.object().shape({
    role: yup.string().required("Role is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    password: yup
      .string()
      .min(8, "Minimal password in 8 characters")
      .required("Password is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  async function handleSubmit(values, { setSubmitting }) {
    try {
      await validationSchema.validate(values);
      setSubmitting(true);
      setLoading(true);
      const { confirmPassword, ...newValue } = values;
      await createUserApi(newValue);
      onSubmit();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  }

  return (
    <div className="z-50 fixed">
      <Toaster position="bottom-right" />

      {/* <!-- Main modal --> */}
      <div className="fixed inset-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
        <div className="fixed w-full h-full bg-black opacity-30" />
        <div className="animate-jump-in relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create User
              </h3>
              <button
                onClick={onClose}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}

            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Email
                    </label>
                    <div className="flex items-center space-x-4 border-gray-300 focus:ring-primary-600 focus:border-primary-600 rounded-lg bg-gray-50 border pr-4 ">
                      <Field
                        type="text"
                        name="email"
                        className="text-gray-900 focus:outline-none text-sm block rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter your email"
                      />
                      <FaAt className="text-gray-500" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <div className="flex items-center space-x-4 border-gray-300 focus:ring-primary-600 focus:border-primary-600 rounded-lg bg-gray-50 border pr-4 ">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="text-gray-900 text-sm block rounded-lg w-full p-2.5 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter your password"
                      />
                      {showPassword ? (
                        <FaEye
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-500"
                          size={23}
                        />
                      ) : (
                        <FaEyeSlash
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-500"
                          size={23}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Confirm Password
                    </label>
                    <div className="flex items-center space-x-4 border-gray-300 focus:ring-primary-600 focus:border-primary-600 rounded-lg bg-gray-50 border pr-4 ">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className="text-gray-900 text-sm block rounded-lg w-full p-2.5 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter your confirm password"
                      />
                      {showConfirmPassword ? (
                        <FaEye
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-gray-500"
                          size={23}
                        />
                      ) : (
                        <FaEyeSlash
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-gray-500"
                          size={23}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Role
                    </label>
                    <Field
                      as="select"
                      name="role"
                      className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </Field>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <button
                    type="submit"
                    className="text-white font-satoshi font-semibold text-sm bg-indigo-500 px-5 py-2.5 me-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 "
                  >
                    {loading ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                    ) : (
                      <>Create</>
                    )}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
