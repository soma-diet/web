// router/router.ts
import { useAuthStore } from "@/lib/stores";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
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
  ],
});

router.beforeEach((to, from, next) => {
  const { authState } = useAuthStore();
  const isAuthenticated = authState.isLoggedIn;
  console.log("isauthenticated", isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "SignIn", query: { redirect: to.fullPath } });
  }
  // pokud je logged in zabranime mu cestu na sign in
  else if ((to.name === "SignIn" || to.name === "/") && isAuthenticated) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
