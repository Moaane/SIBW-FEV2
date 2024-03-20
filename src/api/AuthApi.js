import { MainApi } from "./ApiManager";

export async function loginApi(body) {
  try {
    const result = await MainApi("auth/login", {
      method: "POST",
      data: body,
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function registerApi(body) {
  try {
    const result = await MainApi("auth/register", {
      method: "POST",
      data: body,
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function refreshTokenApi(refreshToken) {
  try {
    const result = await MainApi.post(
      "auth/refresh",
      {
        refreshToken: refreshToken, // Menyusun objek data sesuai format yang diinginkan
      },
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
