import { MainApi } from "./ApiManager";

export async function findAllActivityTemplateApi(token, page) {
  try {
    const result = await MainApi(`/activity-templates/find-all?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createActivityTemplateApi(token, body) {
  try {
    const result = await MainApi("/activity-templates/create", {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data: body,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateActivityTemplateApi(token, id, body) {
  try {
    const result = await MainApi(`/activity-templates/update/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "PATCH",
      data: body,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteActivityTemplateApi(token, id) {
  try {
    const result = await MainApi(`/activity-templates/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
