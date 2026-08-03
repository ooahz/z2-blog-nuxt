export default defineNuxtRouteMiddleware((to) => {
  const { userInfo } = useAuth();
  const publicRoutes = ["/login"];

  if (!userInfo.value && !publicRoutes.includes(to.path)) {
    return navigateTo("/login");
  }

  if (userInfo.value && to.path === "/login") {
    return navigateTo("/");
  }
});
