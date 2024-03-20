import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../common/Loader";
import Pagination from "../components/pagination/Pagination";
import { deleteAreaApi, findAllAreaApi } from "../api/AreaApi";
import UpdateAreaModal from "../components/area/UpdateAreaModal";
import CreateAreaModal from "../components/area/CreateAreaModal";
import DeleteModal from "../components/modal/DeleteModal";
import UserLayout from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Area() {
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [area, setArea] = useState({
    id: 0,
    name: "",
    wide: 0,
    depth: 0,
    fishTotal: 0,
    fishWeight: 0,
  });
  const user = useAuth();
  const token = user.token;

  const navigate = useNavigate();

  function handleNavigate(id) {
    navigate(`${id}`);
  }

  async function handlePageChange(newPage) {
    try {
      setPage(newPage);
      await fetchAreas(userId, newPage);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      await deleteAreaApi(token, id);
      await fetchAreas(page);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAreas(page) {
    try {
      const response = await findAllAreaApi(token, page, perPage);
      setAreas(response.result.data);
      setLastPage(response.result.meta.lastPage);
    } catch (error) {
      console.error("Error fetching areas : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAreas(page, token);
  }, [page, token]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <>
        {updateModalOpen && (
          <UpdateAreaModal
            token={token}
            area={area}
            onClose={() => setUpdateModalOpen(false)}
            onSubmit={() => {
              setUpdateModalOpen(false), fetchAreas(page);
            }}
          />
        )}

        {createModalOpen && (
          <CreateAreaModal
            token={token}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={() => {
              setCreateModalOpen(false), fetchAreas(page);
            }}
          />
        )}

        {deleteModalOpen && (
          <DeleteModal
            onClose={() => setDeleteModalOpen(false)}
            onDelete={() => handleDelete(area.id)}
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
                <th className="text-left text-white ">Wide (cm)</th>
                <th className="text-left text-white ">Depth (cm)</th>
                <th className="text-left text-white ">Total Fish</th>
                <th className="text-left text-white ">Fish Weight</th>
                <th className="text-left text-white ">Day Completed</th>
                <th className="text-center text-white pl-20 ">Actions</th>
                <th className="text-center text-white  "></th>
              </tr>
            </thead>
            <tbody className="">
              {areas.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="border hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-left font-satoshi font-medium">
                    {(page - 1) * perPage + index + 1}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.wide}</td>
                  <td>{item.depth}</td>
                  <td>{item.fishTotal}</td>
                  <td>{item.fishWeight}</td>
                  <td>{item.dayCompleted}</td>
                  <td className="space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setArea(
                          {
                            id: item.id,
                            name: item.name,
                            wide: item.wide,
                            depth: item.wide,
                            fishTotal: item.fishTotal,
                            fishWeight: item.fishWeight,
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setArea({ id: item.id }), setDeleteModalOpen(true);
                      }}
                      className="text-white z-10 font-satoshi font-semibold text-sm bg-red-400 px-5 py-2.5 me-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 "
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
    </>
  );
}
