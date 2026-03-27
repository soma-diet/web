// router/router.ts
import { useAuthStore } from "@/lib/stores";
import Dashboard from "@/views/Dashboard.vue";
import NotFound from "@/views/NotFound.vue";
import SignIn from "@/views/SignIn.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const { authState } = useAuthStore();

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach((to) => {
  const isAuthenticated = authState.isLoggedIn;

  // pokud chce na stranku, co potrebuje auth -> presmerovat na SignIn
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: "SignIn", query: { redirect: to.fullPath } };
  }

  // pokud je logged in zabranime mu cestu na sign in
  else if ((to.name === "SignIn" || to.name === "/") && isAuthenticated) {
    return { name: "Dashboard" };
  }
});

export default router;
