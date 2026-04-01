<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-[480px] mx-auto container mx-auto px-4">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Регистрация</h2>
          <p class="text-sm text-gray-500">Создайте аккаунт для продолжения</p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Имя
            </label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                v-model="form.title"
                type="text"
                placeholder="Иванов Иван"
                class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent rounded-lg"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Электронная почта
            </label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                v-model="form.email"
                type="email"
                placeholder="example@mail.ru"
                class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent rounded-lg"
              />
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Телефон
            </label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="+7 (999) 000-00-00"
                class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent rounded-lg"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent rounded-lg"
              />
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Подтверждение пароля
            </label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                v-model="form.confirmPassword"
                type="password"
                placeholder="••••••••"
                class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent rounded-lg"
              />
            </div>
          </div>

          <!-- Error Message -->
          <p
            v-if="errorMessage"
            class="text-sm text-red-500 bg-red-50 py-2 px-4 rounded"
          >
            {{ errorMessage }}
          </p>

          <!-- Success Message -->
          <p
            v-if="successMessage"
            class="text-sm text-green-500 bg-green-50 py-2 px-4 rounded"
          >
            {{ successMessage }}
          </p>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-4 bg-[#ec018c] text-white text-sm font-medium rounded-lg hover:bg-[#d4007c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? "Регистрация..." : "ЗАРЕГИСТРИРОВАТЬСЯ" }}
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">или</span>
          </div>
        </div>

        <!-- Login Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Уже есть аккаунт?
            <NuxtLink
              to="/login"
              class="text-[#ec018c] hover:text-[#d4007c] font-medium transition-colors"
            >
              Войти
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "#app";

const router = useRouter();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const apiKey = config.public.apiKey;

const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const form = reactive({
  title: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  // Валидация
  if (!form.title.trim() || !form.email.trim() || !form.password.trim()) {
    errorMessage.value = "Заполните все обязательные поля";
    isLoading.value = false;
    return;
  }

  if (form.password !== form.confirmPassword) {
    errorMessage.value = "Пароли не совпадают";
    isLoading.value = false;
    return;
  }

  if (form.password.length < 6) {
    errorMessage.value = "Пароль должен быть не менее 6 символов";
    isLoading.value = false;
    return;
  }

  try {
    const requestBody = {
      title: form.title,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    console.log("Отправка данных на регистрацию:", {
      url: `${apiBase}/register/`,
      body: requestBody,
    });

    const response = await fetch(`${apiBase}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    // Бэкенд возвращает { userInfo: { success: true, user: {...}, error: "" } }
    const responseData = data.userInfo || data;

    // Если error не пустой - показываем ошибку и не сбрасываем поля
    if (responseData.error && responseData.error !== "") {
      errorMessage.value = responseData.error;
      isLoading.value = false;
      return;
    }

    console.log("Прошли проверку error, продолжаем регистрацию...");

    // Если error пустой - регистрация успешна
    console.log("Регистрация успешна!");
    successMessage.value = "Регистрация успешна! Перенаправление...";
    isLoading.value = false;
    // Перенаправляем на страницу входа через 2 секунды
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (e) {
    console.error("Ошибка при регистрации:", e);
    errorMessage.value = "Не удалось подключиться к серверу";
  } finally {
    isLoading.value = false;
  }
};
</script>
