import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../common/Loader";
import { deleteUserApi, findAllUserApi } from "../../api/UserApi";
import UpdateModalUser from "./UpdateUserModal";
import CreateUserModal from "./CreateUserModal";
import Pagination from "../pagination/Pagination";
import DeleteModal from "../modal/DeleteModal";

export default function UserList() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    email: "",
    role: "",
  });

  async function handlePageChange(newPage) {
    try {
      setPage(newPage);
      await fetchUsers(newPage);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      await deleteUserApi(id);
      await fetchUsers(page);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUsers(page) {
    try {
      const response = await findAllUserApi(page, perPage);
      setUsers(response.result.data);
      setLastPage(response.result.meta.lastPage);
    } catch (error) {
      console.error("Error fetching users : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return loading ? (
    <Loader />
  ) : (
    <>
      {updateModalOpen && (
        <UpdateModalUser
          user={user}
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={() => {
            setUpdateModalOpen(false), fetchUsers(page);
          }}
        />
      )}

      {createModalOpen && (
        <CreateUserModal
          onClose={() => setCreateModalOpen(false)}
          onSubmit={() => {
            setCreateModalOpen(false), fetchUsers(page);
          }}
        />
      )}

      {deleteModalOpen && (
        <DeleteModal
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => handleDelete(user.id)}
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
              <th className="text-left text-white ">Email</th>
              <th className="text-left text-white ">Role</th>
              <th className="text-center text-white pr-24 ">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((item, index) => (
              <tr key={item.id} className="border hover:bg-gray-100">
                <td className="px-6 py-4 text-left font-satoshi font-medium">
                  {(page - 1) * perPage + index + 1}
                </td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td className="space-x-4">
                  <button
                    onClick={() => {
                      setUser({
                        id: item.id,
                        email: item.email,
                        role: item.role,
                      }),
                        setUpdateModalOpen(true);
                    }}
                    className="text-white font-satoshi font-semibold text-sm bg-teal-500 px-5 py-2.5 me-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 "
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setUser({ id: item.id }), setDeleteModalOpen(true);
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
