import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Agent from "../views/Agent.vue";
import AgentDetail from "../views/AgentDetail.vue";
import Engine from "../views/Engine.vue";
import Assault from "../views/Assault.vue";

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
    path: "/engine",
    name: "Engine",
    component: Engine,
  },
  {
    path: "/assault",
    name: "Assault",
    component: Assault,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
