import { api } from "@/utils/api.instance";

const basePeopleUrl = "/films";
export function getFilmsApi(search = "", id = null) {
  return api.get(`${basePeopleUrl}${id ? `/${id}` : ""}?search=${search}`);
}
