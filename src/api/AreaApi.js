import { MainApi } from "./ApiManager";

export async function findAllAreaApi(userId, page, perPage) {
  const response = await MainApi`/area/find-all`;
}
