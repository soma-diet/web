import router from ".";

export function redirectAfterLogin() {
  const currentRoute = router.currentRoute.value;

  // neblokovat redirect v route jinak /dashboard
  const targetPath = (currentRoute.query.redirect as string) || "/dashboard";
  router.push(targetPath);
}

export function redirectAfterLogout() {
  const currentRoute = router.currentRoute.value;
  const targetPath = (currentRoute.query.redirect as string) || "/signin";
  router.push(targetPath);
}
