import { MainApi } from "./ApiManager";

export async function findAllUserApi(token, page) {
  try {
    const result = await MainApi(`/users/find-all?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function findOneUserApi(id) {
  try {
    const result = await MainApi(`/users/find/${id}`, {
      method: "GET",
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createUserApi(token, body) {
  try {
    const result = await MainApi("/users/create", {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data: body,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserApi(token, id, body) {
  try {
    const result = await MainApi(`/users/update/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "PATCH",
      data: body,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUserApi(token, id) {
  try {
    console.log(id);
    const result = await MainApi(`/users/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
