import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        alias: "/summary",
        name: "summary",
        component: () => import("./components/Summary.vue"),
    },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
