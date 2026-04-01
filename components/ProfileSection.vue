<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-[1200px] mx-auto container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <!-- Avatar -->
            <div class="text-center mb-6">
              <h2 class="text-lg font-bold text-gray-800">
                {{ user.title }}
              </h2>
              <p class="text-sm text-gray-500">{{ originalEmail }}</p>
            </div>

            <!-- Navigation -->
            <nav class="space-y-2">
              <button
                @click="activeTab = 'orders'"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  activeTab === 'orders'
                    ? 'bg-[#ec018c] text-white'
                    : 'text-gray-700 hover:bg-gray-100',
                ]"
              >
                <div class="flex items-center gap-3">
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Мои заказы
                </div>
              </button>

              <button
                @click="activeTab = 'profile'"
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  activeTab === 'profile'
                    ? 'bg-[#ec018c] text-white'
                    : 'text-gray-700 hover:bg-gray-100',
                ]"
              >
                <div class="flex items-center gap-3">
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
                  Профиль
                </div>
              </button>

              <hr class="my-4 border-gray-200" />

              <button
                @click="logout"
                class="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <div class="flex items-center gap-3">
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Выйти
                </div>
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Orders Tab -->
          <div
            v-if="activeTab === 'orders'"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 class="text-xl font-bold text-gray-800 mb-6">
              ИСТОРИЯ ЗАКАЗОВ
            </h3>

            <div v-if="orders.length > 0" class="space-y-4">
              <div
                v-for="order in orders"
                :key="order.id"
                class="border border-gray-200 rounded-lg p-4 hover:border-[#ec018c] transition-colors"
              >
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <p class="text-sm font-bold text-gray-800">
                      {{ order.title }}
                    </p>
                    <p class="text-xs text-gray-500">{{ order.dateOrder }}</p>
                  </div>
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      getStatusClass(order.orderStatus),
                    ]"
                  >
                    {{ order.orderStatus }}
                  </span>
                </div>

                <!-- Товары в заказе -->
                <div class="mb-3">
                  <p class="text-xs text-gray-500 mb-2">Товары:</p>
                  <div class="space-y-2">
                    <div
                      v-for="product in order.cart.items"
                      :key="product.id"
                      class="flex justify-between items-center text-sm"
                    >
                      <div>
                        <p class="text-gray-800">{{ product.product }}</p>
                        <p class="text-xs text-gray-500">
                          Размер: {{ product.sizeRussian }} |
                          {{ product.quantity }} шт.
                        </p>
                      </div>
                      <p class="text-gray-800 font-medium">
                        {{ formatPrice(product.price * product.quantity) }} ₽
                      </p>
                    </div>
                  </div>
                </div>

                <div class="pt-3 border-t border-gray-100">
                  <div class="flex justify-between items-center gap-4">
                    <div class="text-xs text-gray-500 max-w-[60%]">
                      <p class="font-medium text-gray-700 mb-1">Доставка:</p>
                      <p class="break-words">{{ order.address }}</p>
                      <p class="mt-1 text-gray-600">
                        Стоимость:
                        <span class="font-medium"
                          >{{ formatPrice(order.deliveryPrice) }} ₽</span
                        >
                      </p>
                    </div>
                    <div class="text-right flex-shrink-0">
                      <p class="text-xs text-gray-500 mb-1">Итого:</p>
                      <p class="text-lg font-bold text-[#ec018c]">
                        {{ formatPrice(order.totalSum) }} ₽
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="!isLoading" class="text-center py-12">
              <svg
                class="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p class="text-gray-500 mb-4">У вас пока нет заказов</p>
              <NuxtLink
                to="/"
                class="inline-block px-6 py-3 bg-[#ec018c] text-white text-sm font-medium rounded-lg hover:bg-[#d4007c] transition-colors"
              >
                Перейти в каталог
              </NuxtLink>
            </div>

            <!-- Индикатор загрузки -->
            <div v-if="isLoading" class="text-center py-12">
              <svg
                class="animate-spin w-8 h-8 text-[#ec018c] mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <p class="text-gray-500">Загрузка заказов...</p>
            </div>
          </div>

          <!-- Profile Tab -->
          <div
            v-if="activeTab === 'profile'"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 class="text-xl font-bold text-gray-800 mb-6">ПРОФИЛЬ</h3>

            <div class="space-y-6">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  ФИО
                </label>
                <input
                  v-model="user.title"
                  type="text"
                  class="w-full px-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent rounded-lg"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Электронная почта
                </label>
                <input
                  v-model="user.email"
                  type="email"
                  class="w-full px-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent rounded-lg"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  v-model="user.phone"
                  type="tel"
                  class="w-full px-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent rounded-lg"
                />
              </div>

              <!-- Success Message -->
              <div
                v-if="saveSuccess"
                class="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p class="text-sm text-green-700">✓ Данные успешно сохранены</p>
              </div>

              <!-- Error Message -->
              <div
                v-if="saveError"
                class="p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p class="text-sm text-red-700">✗ {{ saveError }}</p>
              </div>

              <!-- Save Button -->
              <div class="pt-4">
                <button
                  @click="saveProfile"
                  :disabled="isSaving"
                  class="px-8 py-4 bg-[#ec018c] text-white text-sm font-medium rounded-lg hover:bg-[#d4007c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isSaving ? "Сохранение..." : "СОХРАНИТЬ ИЗМЕНЕНИЯ" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";
import { useRuntimeConfig } from "#app";

const router = useRouter();
const config = useRuntimeConfig();
const { user: authUser, logout: authLogout, getAuthHeaders } = useAuth();

const API_BASE = config.public.apiBase as string;

const activeTab = ref("orders");
const isLoading = ref(false);
const isSaving = ref(false);
const saveSuccess = ref(false);
const saveError = ref<string | null>(null);

// Данные пользователя для редактирования
const user = ref({
  name: "",
  title: "",
  email: "",
  phone: "",
});

// Оригинальный email (для отображения до успешного сохранения)
const originalEmail = ref("");

// Загрузка данных пользователя при монтировании
onMounted(async () => {
  if (authUser.value) {
    // Загружаем данные пользователя
    user.value = {
      name: authUser.value.name || "",
      title: authUser.value.title || "",
      email: authUser.value.email || "",
      phone: authUser.value.phone || "",
    };
    originalEmail.value = authUser.value.email || "";

    await fetchOrders();
  }
});

// Сохранение данных пользователя
const saveProfile = async () => {
  isSaving.value = true;
  saveError.value = null;
  saveSuccess.value = false;

  try {
    console.log("Отправка данных:", {
      name: user.value.title,
      email: user.value.email,
      phone: user.value.phone,
    });

    const response = await fetch(`${API_BASE}/replaceuserdata/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: user.value.title,
        email: user.value.email,
        phone: user.value.phone,
      }),
    });

    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Response:", data);
    console.log("data.userInfo:", data.userInfo);
    console.log("data.userInfo.error:", data.userInfo?.error);

    // Проверяем error в ответе
    const error = data.userInfo?.error || data.error;

    if (error && error !== "") {
      // Если error не пустой - показываем ошибку
      console.log("Ошибка от сервера:", error);
      saveError.value = error;
    } else {
      // Если error пустой - сохранение успешно
      console.log("Сохранение успешно!");
      saveSuccess.value = true;
      // Обновляем оригинальный email
      originalEmail.value = user.value.email;
      // Обновляем данные в auth
      localStorage.setItem(
        "auth_user",
        JSON.stringify({
          ...authUser.value,
          name: user.value.title,
          email: user.value.email,
          phone: user.value.phone,
        }),
      );
    }
  } catch (e) {
    console.error("Ошибка при сохранении:", e);
    saveError.value = "Не удалось подключиться к серверу";
  } finally {
    isSaving.value = false;
  }
};

// Динамические данные заказов
interface OrderProduct {
  id: number;
  name: string;
  product: string;
  size: string;
  sizeRussian: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  name: string;
  title: string;
  dateOrder: string;
  cart: {
    items: OrderProduct[];
    totalQuantity: number;
    totalPrice: number;
  };
  address: string;
  deliveryPrice: number;
  totalSum: number;
  orderStatus: string;
}

const orders = ref<Order[]>([]);

// Загрузка заказов при монтировании
onMounted(async () => {
  if (authUser.value) {
    await fetchOrders();
  }
});

const fetchOrders = async () => {
  isLoading.value = true;

  try {
    const response = await fetch(`${API_BASE}/getorders/`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (response.ok && data.userOrders) {
      orders.value = data.userOrders;
    }
  } catch (e) {
    console.error("Ошибка при загрузке заказов:", e);
  } finally {
    isLoading.value = false;
  }
};

// Статус заказа
const getStatusClass = (status: string) => {
  switch (status) {
    case "В обработке":
      return "bg-yellow-100 text-yellow-800";
    case "Доставка":
      return "bg-blue-100 text-blue-800";
    case "Выполнен":
      return "bg-green-100 text-green-800";
    case "Отменен":
      return "bg-red-100 text-red-800";
    case "Не удался":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Форматирование цены
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const logout = () => {
  if (confirm("Вы уверены, что хотите выйти?")) {
    authLogout();
    router.push("/");
  }
};
</script>
