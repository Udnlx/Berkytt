export default defineNuxtRouteMiddleware((to) => {
  // Проверка авторизации только на клиенте
  if (import.meta.client) {
    const { isAuthenticated } = useAuth();

    // Защищённые страницы (требуют авторизации)
    const protectedPages = ["/profile"];

    if (protectedPages.some((path) => to.path.startsWith(path))) {
      if (!isAuthenticated.value) {
        // Если не авторизован - редирект на login
        return navigateTo("/login");
      }
    }
  }
});
