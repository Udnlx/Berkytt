import { ref, computed } from "vue";
import type { Ref } from "vue";

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

// Используем runtimeConfig для API базового URL
const config = useRuntimeConfig();
const API_BASE = config.public.apiBase as string;

// Состояние аутентификации
const token: Ref<string | null> = ref(null);
const user: Ref<User | null> = ref(null);
const isLoading: Ref<boolean> = ref(false);
const error: Ref<string | null> = ref(null);

// Инициализация при загрузке приложения
export const useAuth = () => {
  // Проверка токена при инициализации
  const initAuth = () => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
    }
  };

  // Вход
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (response.ok && data.success && data.token) {
        // Сохраняем токен и данные пользователя
        token.value = data.token;
        user.value = data.user || null;

        localStorage.setItem("auth_token", data.token);
        if (data.user) {
          localStorage.setItem("auth_user", JSON.stringify(data.user));
        }

        isLoading.value = false;
        return true;
      } else {
        // Ошибка авторизации
        error.value = data.message || "Ошибка при входе";
        isLoading.value = false;
        return false;
      }
    } catch (e) {
      error.value = "Не удалось подключиться к серверу";
      isLoading.value = false;
      return false;
    }
  };

  // Выход
  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  // Проверка авторизации
  const isAuthenticated = computed(() => {
    return !!token.value && !!user.value;
  });

  // Получение заголовков для авторизованных запросов
  const getAuthHeaders = () => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token.value) {
      headers["Authorization"] = `Bearer ${token.value}`;
    }

    return headers;
  };

  // Авторизованный fetch
  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = getAuthHeaders();

    return fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });
  };

  // Инициализируем аутентификацию при первом вызове
  initAuth();

  return {
    // Состояние
    token,
    user,
    isLoading,
    error,
    isAuthenticated,

    // Методы
    login,
    logout,
    initAuth,
    getAuthHeaders,
    authFetch,
  };
};
