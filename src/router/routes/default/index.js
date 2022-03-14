import { peopleList } from "./people-list.route";
import { people } from "./people.route";

export const routeDefault = {
  path: "/",
  name: "Default",
  component: () => import("@/layout/Default.vue"),
  children: [peopleList, people],
};
