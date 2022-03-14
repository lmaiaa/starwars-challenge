import { peopleList } from "./people-list.route";

export const routeDefault = {
  path: "/",
  name: "Default",
  component: () => import("@/layout/Default.vue"),
  children: [peopleList],
};
