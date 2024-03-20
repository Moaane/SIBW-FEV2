import { useAuth } from "../auth/AuthProvider";
import { MainApi } from "./ApiManager";

export async function findAllAreaApi(token, page, perPage) {
  try {
    const result = await MainApi(
      `/areas/find-all?page=${page}&perPage=${perPage}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      }
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createAreaApi(token, body) {
  try {
    const result = await MainApi("/areas/create", {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data: body,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateAreaApi(token, id, body) {
  try {
    const result = await MainApi(`/areas/update/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "PATCH",
      data: body,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAreaApi(token, id) {
  try {
    const result = await MainApi(`/areas/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}
