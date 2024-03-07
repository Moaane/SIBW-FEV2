import { MainApi } from "./ApiManager";

export async function findAllActivityTemplateApi(page, perPage) {
  try {
    const result = await MainApi(
      `/activity-templates/find-all?page=${page}&perPage=${perPage}`
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createActivityTemplateApi(body) {
  try {
    const result = await MainApi("/activity-templates/create", {
      method: "POST",
      data: body,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateActivityTemplateApi(id, body) {
  try {
    const result = await MainApi(`/activity-templates/update/${id}`, {
      method: "PATCH",
      data: body,
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteActivityTemplateApi(id) {
  try {
    const result = await MainApi(`/activity-templates/delete/${id}`, {
      method: "DELETE",
    });
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
