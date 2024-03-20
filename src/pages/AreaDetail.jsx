import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../common/Loader";
import Pagination from "../components/pagination/Pagination";
import UserLayout from "../layout/UserLayout";
import { findAllActivityApi, nextActivityApi } from "../api/ActivityApi";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function AreaDetail() {
  const [loading, setLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [completedRows, setCompletedRows] = useState([]);
  const [activities, setActivities] = useState([]);
  const [area, setArea] = useState({});
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const { id } = useParams();
  const user = useAuth();
  const token = user.token;

  async function handlePageChange(newPage) {
    try {
      setPage(newPage);
      await findAllActivityApi(token, id, newPage);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  function handleRowClick(rowId) {
    if (!completedRows.includes(rowId)) {
      setCompletedRows([...completedRows, rowId]);
    }
  }

  function handleCompleteActivity(index) {
    // Update status aktivitas di state
    const updatedActivities = [...activities];
    updatedActivities[index].isCompleted = true;
    setActivities(updatedActivities);
  }

  async function handleNextActivity() {
    try {
      await nextActivityApi(token, id);
      await fetchActivities(page);
    } catch (error) {}
  }

  async function fetchActivities(page) {
    try {
      const response = await findAllActivityApi(token, id, page);
      setActivities(response.result.data.activities);
      setArea(response.result.data.area);
      setLastPage(response.result.meta.lastPage);
    } catch (error) {
      console.error("Error fetching activities : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchActivities(page);
  }, [token, page, id]); // Mengubah dependensi useEffect untuk memanggil fetchActivities saat token, page, atau id berubah

  // useEffect baru untuk memperbarui isComplete setelah activities diperbarui
  useEffect(() => {
    const allCompleted = activities.every((activity) => activity.isCompleted);
    setIsComplete(allCompleted);
  }, [activities]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="animate-fade-up z-0">
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-bold text-2xl text-indigo-500 font-satoshi">
            Day {area.dayCompleted}
          </h1>
          <button
            onClick={() => handleNextActivity(id)}
            disabled={!isComplete}
            // onClick={() => setCreateModalOpen(true)}
            className={` text-white font-satoshi font-semibold text-sm px-5 py-2.5 me-2 mb-2 rounded-lg focus:outline-none ${
              isComplete
                ? "bg-indigo-500 focus:ring-4 focus:ring-indigo-300"
                : "bg-gray-500 text-gray-300"
            }`}
          >
            Complete Activities
          </button>
        </div>
        <table className=" table-fixed w-full border">
          <thead className="rounded-xl">
            <tr className="h-10 bg-gray-800 *:text-left *:text-white *:font-satoshi">
              <th className="px-5 py-3">ID</th>
              <th>Name</th>
              <th>Time</th>
              <th>Feed Total (g)</th>
              <th>Note</th>
              <th>Description</th>
              <th className="pl-6">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {activities.map((item, index) => (
              <tr
                key={item.id}
                className="border hover:bg-gray-100 *:text-left *:font-satoshi *:font-medium"
              >
                <td className="px-6 py-4">
                  {(page - 1) * perPage + index + 1}
                </td>
                <td>{item.name}</td>
                <td>{item.time}</td>
                <td>{item.feedTotal.split(".")[0]}</td>
                <td>{item.note}</td>
                <td>{item.description}</td>
                <td className="space-x-4">
                  <button
                    disabled={completedRows.includes(item.id)}
                    onClick={() => {
                      handleRowClick(item.id);
                      handleCompleteActivity(index);
                    }}
                    className={`text-white font-satoshi font-semibold text-sm px-5 py-2.5 me-2 rounded-lg focus:outline-none focus:ring-4  ${
                      completedRows.includes(item.id)
                        ? "bg-gray-500 text-gray-300 "
                        : "bg-indigo-500 focus:ring-indigo-300"
                    } `}
                  >
                    Complete
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
