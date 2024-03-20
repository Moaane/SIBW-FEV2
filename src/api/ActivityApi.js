import { MainApi } from "./ApiManager";

export async function findAllActivityApi(token, id, page) {
  try {
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
