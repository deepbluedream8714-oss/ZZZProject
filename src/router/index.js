import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Agent from "../views/Agent.vue";
import AgentDetail from "../views/AgentDetail.vue";
import Assault from "../views/Assault.vue";
import WEngine from "../views/WEngine.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/agent",
    name: "Agent",
    component: Agent,
  },
  {
    path: "/agent/:id",
    name: "AgentDetail",
    component: AgentDetail,
  },
  {
    path: "/assault",
    name: "Assault",
    component: Assault,
  },
  {
    path: "/wengine",
    name: "WEngine",
    component: WEngine,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
