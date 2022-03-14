export const people = {
  path: "/people/:id",
  name: "People",
  component: () => import("@/views/People.vue"),
  props: true,
};
