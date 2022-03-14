import { api } from "@/utils/api.instance";

const basePeopleUrl = "/people";
export function getAllPeoplesApi(page = 1, search = "") {
  return api.get(`${basePeopleUrl}?page=${page}&search=${search}`);
}
