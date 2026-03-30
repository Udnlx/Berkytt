export default defineNuxtRouteMiddleware((to) => {
  // Получаем состояние аутентификации
  const { isAuthenticated } = useAuth();

  // Защищённые страницы (требуют авторизации)
  const protectedPages = ["/profile"];

  if (protectedPages.some((path) => to.path.startsWith(path))) {
    if (!isAuthenticated.value) {
      // Если не авторизован - редирект на login
      return navigateTo("/login");
    }
  }
});
