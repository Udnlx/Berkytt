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
                {{ user.name }}
              </h2>
              <p class="text-sm text-gray-500">{{ user.email }}</p>
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
                      Заказ №{{ order.number }}
                    </p>
                    <p class="text-xs text-gray-500">{{ order.date }}</p>
                  </div>
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      getStatusClass(order.status),
                    ]"
                  >
                    {{ order.status }}
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p class="text-xs text-gray-500 mb-1">Товары</p>
                    <p class="text-sm text-gray-800">{{ order.items }} шт.</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 mb-1">Сумма</p>
                    <p class="text-sm font-bold text-gray-800">
                      {{ formatPrice(order.total) }} ₽
                    </p>
                  </div>
                </div>

                <!-- Товары в заказе -->
                <div class="mb-3">
                  <p class="text-xs text-gray-500 mb-2">Товары:</p>
                  <div class="space-y-2">
                    <div
                      v-for="product in order.products"
                      :key="product.name"
                      class="flex justify-between items-center text-sm"
                    >
                      <div>
                        <p class="text-gray-800">{{ product.name }}</p>
                        <p class="text-xs text-gray-500">
                          Размер: {{ product.size }} | {{ product.qnt }} шт.
                        </p>
                      </div>
                      <p class="text-gray-800 font-medium">
                        {{ formatPrice(product.price * product.qnt) }} ₽
                      </p>
                    </div>
                  </div>
                </div>

                <div class="pt-3 border-t border-gray-100">
                  <div class="flex justify-between items-center">
                    <div class="text-xs text-gray-500">
                      <p class="font-medium text-gray-700 mb-1">Доставка:</p>
                      <p>{{ order.deliveryMethod }}</p>
                      <p v-if="order.deliveryAddress">
                        {{ order.deliveryAddress }}
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="text-xs text-gray-500 mb-1">Итого:</p>
                      <p class="text-lg font-bold text-[#ec018c]">
                        {{ formatPrice(order.total) }} ₽
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-12">
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
                  v-model="user.name"
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

              <!-- Save Button -->
              <div class="pt-4">
                <button
                  @click="saveProfile"
                  class="px-8 py-4 bg-[#ec018c] text-white text-sm font-medium rounded-lg hover:bg-[#d4007c] transition-colors"
                >
                  СОХРАНИТЬ ИЗМЕНЕНИЯ
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const router = useRouter();
const { logout: authLogout } = useAuth();

const activeTab = ref("orders");

// Статические данные пользователя
const user = ref({
  name: "Иванов Иван Иванович",
  email: "ivan@example.com",
  phone: "+7 (999) 123-45-67",
});

// Статические данные заказов
const orders = ref([
  {
    id: 1,
    number: "ORD-1234567890",
    date: "15 марта 2026, 14:30",
    status: "В обработке",
    items: 3,
    total: 15990,
    deliveryMethod: "Доставка СДЭК",
    deliveryAddress: "г. Москва, ул. Ленина, 66А",
    products: [
      { name: "Пальто женское демисезонное", size: "44", price: 7990, qnt: 1 },
      { name: "Жилет женский", size: "46", price: 4000, qnt: 2 },
    ],
  },
  {
    id: 2,
    number: "ORD-1234567889",
    date: "10 марта 2026, 10:15",
    status: "Доставлен",
    items: 2,
    total: 8990,
    deliveryMethod: "Доставка СДЭК",
    deliveryAddress: "г. Москва, ул. Пушкина, 10",
    products: [
      { name: "Куртка осенняя", size: "48", price: 5990, qnt: 1 },
      { name: "Шарф вязаный", size: "One Size", price: 3000, qnt: 1 },
    ],
  },
  {
    id: 3,
    number: "ORD-1234567888",
    date: "1 марта 2026, 16:45",
    status: "Доставлен",
    items: 1,
    total: 5490,
    deliveryMethod: "Забрать со склада",
    deliveryAddress: "г. Москва, Сормовский проезд д. 11/7",
    products: [
      { name: "Пальто мужское классическое", size: "50", price: 5490, qnt: 1 },
    ],
  },
]);

// Статус заказа
const getStatusClass = (status: string) => {
  switch (status) {
    case "В обработке":
      return "bg-yellow-100 text-yellow-800";
    case "Доставлен":
      return "bg-green-100 text-green-800";
    case "Отменен":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Форматирование цены
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Действия
const saveProfile = () => {
  alert("Профиль сохранён (демо-режим)");
};

const logout = () => {
  if (confirm("Вы уверены, что хотите выйти?")) {
    authLogout();
    router.push("/");
  }
};
</script>
