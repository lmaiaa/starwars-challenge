import { api } from "@/utils/api.instance";

const basePeopleUrl = "/people";
export function getPeoplesApi(page = 1, search = "", id = null) {
  return api.get(
    `${basePeopleUrl}${id ? `/${id}` : ""}?page=${page}&search=${search}`
  );
}
