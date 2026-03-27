// router/router.ts
import { useAuthStore } from "@/lib/stores";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/signin",
      name: "SignIn",
      component: () => import("@/views/SignIn.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/Dashboard.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/404",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to) => {
  const { authState } = useAuthStore();
  const isAuthenticated = authState.isLoggedIn;

  if (to.matched.length === 0) {
    return "/404";
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: "SignIn", query: { redirect: to.fullPath } };
  }
  // pokud je logged in zabranime mu cestu na sign in
  else if ((to.name === "SignIn" || to.name === "/") && isAuthenticated) {
    return { name: "Dashboard" };
  }
});

export default router;
