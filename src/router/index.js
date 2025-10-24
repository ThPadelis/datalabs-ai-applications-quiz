import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    path: "/quiz/:id",
    name: "Quiz",
    component: () => import("@/views/Quiz.vue"),
  },
  {
    path: "/scoreboard",
    name: "Scoreboard",
    component: () => import("@/views/Scoreboard.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory("/datalabs-ai-applications-quiz/"),
  routes,
});
