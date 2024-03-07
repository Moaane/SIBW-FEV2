import { MainApi } from "./ApiManager";

export async function findAllUserApi(page, perPage) {
  try {
    const result = await MainApi(
      `/users/find-all?page=${page}&perPage=${perPage}`
    );
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

export async function createUserApi(body) {
  try {
    const result = await MainApi("/users/create", {
      method: "POST",
      data: body,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserApi(id, body) {
  try {
    const result = await MainApi(`/users/update/${id}`, {
      method: "PATCH",
      data: body,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUserApi(id) {
  try {
    const result = await MainApi(`/users/delete/${id}`, {
      method: "DELETE",
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
