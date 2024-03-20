import { Field, Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import * as yup from "yup";
import { Toaster } from "react-hot-toast";
import {
  FaAt,
  FaArrowsAltH,
  FaArrowsAltV,
  FaFish,
  FaWeight,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { updateAreaApi } from "../../api/AreaApi";

export default function UpdateAreaModal({ token, area, onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: area.name,
    wide: area.wide,
    depth: area.depth,
    fishTotal: area.fishTotal,
    fishWeight: area.fishWeight,
  });

  const validationSchema = yup.object().shape({
    fishWeight: yup.number().required("Fish weight is required"),
    fishTotal: yup.number().required("Total Fish is required"),
    depth: yup.number().required("Depth is required"),
    wide: yup.number().required("Wide is required"),
    name: yup.string().required("Name is required"),
  });

  async function handleSubmit(values, { setSubmitting }) {
    try {
      await validationSchema.validate(values);
      setSubmitting(true);
      setLoading(true);
      await updateAreaApi(token, area.id, values);
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
      <div className="fixed inset-0 flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
        <div className="fixed w-full h-full bg-black opacity-30" />
        <div className="animate-jump-in z-50 relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className=" relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Area
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
                      Name
                    </label>
                    <div className="flex items-center space-x-4 border-gray-300 focus:ring-primary-600 focus:border-primary-600 rounded-lg bg-gray-50 border pr-4 ">
                      <Field
                        type="text"
                        name="name"
                        className="text-gray-900 focus:outline-none text-sm block rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter your area name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Wide
                    </label>
                    <div className="flex items-center space-x-4 border-gray-300 focus:ring-primary-600 focus:border-primary-600 rounded-lg bg-gray-50 border pr-4 ">
                      <Field
                        type="number"
                        min="0"
                        name="wide"
                        className="text-gray-900 focus:outline-none text-sm block rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter your are wide length"
                      />
                      <FaArrowsAltH className="text-gray-500" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Depth
                    </label>
                    <div className="flex items-center space-x-4 border-gray-300 focus:ring-primary-600 focus:border-primary-600 rounded-lg bg-gray-50 border pr-4 ">
                      <Field
                        type="number"
                        min="0"
                        name="depth"
                        className="text-gray-900 focus:outline-none text-sm block rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter your area depth length"
                      />
                      <FaArrowsAltV className="text-gray-500" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Total Fish
                    </label>
                    <div className="flex items-center space-x-4 border-gray-300 focus:ring-primary-600 focus:border-primary-600 rounded-lg bg-gray-50 border pr-4 ">
                      <Field
                        type="number"
                        min="0"
                        name="fishTotal"
                        className="text-gray-900 focus:outline-none text-sm block rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter your total fish"
                      />
                      <FaFish className="text-gray-500" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Fish Weight
                    </label>
                    <div className="flex items-center space-x-4 border-gray-300 focus:ring-primary-600 focus:border-primary-600 rounded-lg bg-gray-50 border pr-4 ">
                      <Field
                        type="number"
                        min="0"
                        name="fishWeight"
                        className="text-gray-900 focus:outline-none text-sm block rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter your fish weight"
                      />
                      <FaWeight className="text-gray-500" size={20} />
                    </div>
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
                      <>Update</>
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
