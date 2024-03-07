import React from "react";
import { useState } from "react";
import {
  deleteActivityTemplateApi,
  findAllActivityTemplateApi,
} from "../../api/AcitivityTemplateApi";
import { useEffect } from "react";
import Pagination from "../pagination/Pagination";
import CreateActivityTemplateModal from "./CreateActivityTemplateModal";
import UpdateActivityModal from "./UpdateActivityTemplateModal";
import DeleteModal from "../modal/DeleteModal";

export default function ActivityTemplateList() {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activity, setActivity] = useState({
    id: 0,
    name: "",
    day: "",
    time: "",
    feedPercent: 0,
    note: "",
    description: "",
  });

  async function handlePageChange(newPage) {
    try {
      setPage(newPage);
      await fetchAts(newPage);
    } catch (error) {
      console.error("Error fetching activity templates:", error);
    }
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      await deleteActivityTemplateApi(id);
      await fetchAts(page);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAts(page) {
    try {
      const response = await findAllActivityTemplateApi(page, perPage);
      setActivities(response.result.data);
      setLastPage(response.result.meta.lastPage);
    } catch (error) {
      console.error("Error fetching activity templates : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAts(page);
  }, [page]);

  return (
    <>
      {updateModalOpen && (
        <UpdateActivityModal
          activity={activity}
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={() => {
            setUpdateModalOpen(false), fetchAts(page);
          }}
        />
      )}

      {createModalOpen && (
        <CreateActivityTemplateModal
          onClose={() => setCreateModalOpen(false)}
          onSubmit={() => {
            setCreateModalOpen(false), fetchAts(page);
          }}
        />
      )}

      {deleteModalOpen && (
        <DeleteModal
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => handleDelete(activity.id)}
        />
      )}

      <div className="animate-fade-up z-0">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setCreateModalOpen(true)}
            className=" text-white font-satoshi font-semibold text-sm bg-indigo-500 px-5 py-2.5 me-2 mb-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 "
          >
            Add new
          </button>
        </div>
        <table className=" table-fixed w-full border">
          <thead className="rounded-xl">
            <tr className="h-10 bg-gray-800">
              <th className="text-left text-white font-satoshi px-5 py-3">
                ID
              </th>
              <th className="text-left text-white ">Name</th>
              <th className="text-left text-white ">Day</th>
              <th className="text-left text-white ">Time</th>
              <th className="text-left text-white ">Feed%</th>
              <th className="text-left text-white ">Note</th>
              <th className="text-left text-white ">Description</th>
              <th className="text-center text-white pl-20 ">Actions</th>
              <th className="text-center text-white  "></th>
            </tr>
          </thead>
          <tbody className="">
            {activities.map((item, index) => (
              <tr key={item.id} className="border hover:bg-gray-100">
                <td className="px-6 py-4 text-left font-satoshi font-medium">
                  {(page - 1) * perPage + index + 1}
                </td>
                <td>{item.name}</td>
                <td>{item.day}</td>
                <td>{item.time}</td>
                <td>{item.feedPercent}</td>
                <td>{item.note}</td>
                <td>{item.description}</td>
                <td className="space-x-4">
                  <button
                    onClick={() => {
                      setActivity(
                        {
                          id: item.id,
                          name: item.name,
                          day: item.day,
                          time: item.time,
                          feedPercent: item.feedPercent,
                          note: item.note,
                          description: item.description,
                        },
                        setUpdateModalOpen(true)
                      );
                    }}
                    className="text-white font-satoshi font-semibold text-sm bg-teal-500 px-5 py-2.5 me-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 "
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setActivity({ id: item.id }), setDeleteModalOpen(true);
                    }}
                    className="text-white font-satoshi font-semibold text-sm bg-red-400 px-5 py-2.5 me-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={page}
          lastPage={lastPage}
          changePage={handlePageChange}
        />
      </div>
    </>
  );
}
