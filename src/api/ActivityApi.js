import { MainApi } from "./ApiManager";

export async function findAllActivityApi(token, id, page) {
  try {
    console.log(token);
    console.log(id);
    console.log(page);
    const response = await MainApi(`/activities/find-all/${id}?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "GET",
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function nextActivityApi(token, id) {
  try {
    const response = await MainApi(`activities/next/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
    });
    return;
  } catch (error) {
    console.error(error);
  }
}
