<template>
  <section class="py-12 bg-white">
    <div class="max-w-[1200px] mx-auto container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Order Details -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            ИНФОРМАЦИЯ О ЗАКАЗЕ
          </h2>

          <!-- Order Number & Status -->
          <div class="mb-8 p-6 bg-green-50 rounded-lg">
            <div class="flex items-center gap-3 mb-2">
              <svg
                class="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-lg font-medium text-green-700">
                Заказ успешно оформлен!
              </span>
            </div>
            <p class="text-sm text-green-600">
              Номер заказа: <span class="font-bold">{{ orderNumber }}</span>
            </p>
            <p class="text-xs text-green-500 mt-1">Дата: {{ formattedDate }}</p>
          </div>

          <!-- Products in Order -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-400 mb-4 uppercase">
              Товары в заказе:
            </h3>

            <div
              v-if="order?.products && order.products.length > 0"
              class="space-y-3"
            >
              <div
                v-for="item in order.products"
                :key="
                  'item-' + item.id + '-' + item.idSize + '-' + item.product
                "
                class="flex justify-between items-center py-3 border-b border-gray-100"
              >
                <div>
                  <p class="text-sm text-gray-800">{{ item.product }}</p>
                  <p class="text-xs text-gray-400">Размер: {{ item.size }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-800">{{ item.qnt }} шт.</p>
                  <p class="text-xs text-gray-400">
                    {{ formatPrice(item.price * item.qnt) }} ₽
                  </p>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-6">
              <p class="text-gray-500">Нет данных о товарах</p>
            </div>
          </div>

          <!-- Buyer Information -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-400 mb-4 uppercase">
              Информация о покупателе:
            </h3>

            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <svg
                  class="w-5 h-5 text-gray-400"
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
                <span class="text-sm text-gray-700">{{
                  order?.buyer?.name || "—"
                }}</span>
              </div>

              <div class="flex items-center gap-3">
                <svg
                  class="w-5 h-5 text-gray-400"
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
                <span class="text-sm text-gray-700">{{
                  order?.buyer?.email || "—"
                }}</span>
              </div>

              <div class="flex items-center gap-3">
                <svg
                  class="w-5 h-5 text-gray-400"
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
                <span class="text-sm text-gray-700">{{
                  order?.buyer?.phone || "—"
                }}</span>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-400 mb-4 uppercase">
              Способ оплаты:
            </h3>
            <p class="text-sm text-gray-700">
              {{ paymentText }}
            </p>
          </div>

          <!-- Delivery Method -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-400 mb-4 uppercase">
              Доставка:
            </h3>
            <p class="text-sm text-gray-700">
              {{ deliveryText }}
            </p>
            <p
              v-if="order?.deliveryMethod === 'pickup'"
              class="text-xs text-gray-500 mt-2"
            >
              г.Москва, Сормовский проезд д. 11/7<br />
              с 9:00 до 17:00 Пн-Пт
            </p>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="pl-0 lg:pl-8 lg:border-l border-gray-200">
            <h3 class="text-lg font-bold text-gray-800 mb-6">СУММА ЗАКАЗА:</h3>

            <div class="space-y-4">
              <!-- Total Items -->
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">Всего наименований</span>
                <div class="flex items-center gap-2">
                  <span
                    class="flex-1 border-b border-dotted border-gray-300"
                  ></span>
                  <span class="text-gray-800 font-medium whitespace-nowrap">
                    {{ order?.totalItems || 0 }} шт.
                  </span>
                </div>
              </div>

              <!-- Subtotal -->
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">Стоимость</span>
                <div class="flex items-center gap-2">
                  <span
                    class="flex-1 border-b border-dotted border-gray-300"
                  ></span>
                  <span class="text-gray-800 font-medium whitespace-nowrap">
                    {{ formatPrice(order?.subtotal || 0) }} ₽
                  </span>
                </div>
              </div>

              <!-- Delivery -->
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">Доставка</span>
                <div class="flex items-center gap-2">
                  <span
                    class="flex-1 border-b border-dotted border-gray-300"
                  ></span>
                  <span class="text-gray-800 font-medium whitespace-nowrap">
                    {{ formatPrice(order?.deliveryCost || 0) }} ₽
                  </span>
                </div>
              </div>

              <!-- Total -->
              <div
                class="flex justify-between items-center pt-4 border-t border-gray-200"
              >
                <span class="text-[#ec018c] font-bold">ИТОГО</span>
                <div class="flex items-center gap-2">
                  <span
                    class="flex-1 border-b border-dotted border-[#ec018c]"
                  ></span>
                  <span class="text-[#ec018c] font-bold whitespace-nowrap">
                    {{ formatPrice(order?.total || 0) }} ₽
                  </span>
                </div>
              </div>

              <!-- Continue Shopping Button -->
              <div class="mt-8">
                <NuxtLink
                  to="/"
                  class="w-full py-4 border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-[#ec018c] hover:text-[#ec018c] transition-colors duration-300 text-center block"
                >
                  ПРОДОЛЖИТЬ ПОКУПКИ
                </NuxtLink>
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

interface OrderProduct {
  id: number;
  idSize: number;
  product: string;
  size: string;
  price: number;
  qnt: number;
}

interface OrderBuyer {
  name: string;
  email: string;
  phone: string;
}

interface OrderData {
  products: OrderProduct[];
  buyer: OrderBuyer;
  paymentMethod: string;
  deliveryMethod: string;
  totalItems: number;
  subtotal: number;
  deliveryCost: number;
  total: number;
  orderDate: string;
  orderNumber: string;
}

const order = ref<OrderData | null>(null);

onMounted(() => {
  const storedOrder = localStorage.getItem("currentOrder");
  if (storedOrder) {
    order.value = JSON.parse(storedOrder);
  }
});

const orderNumber = computed(() => {
  return order.value?.orderNumber || "—";
});

const formattedDate = computed(() => {
  if (!order.value?.orderDate) return "—";
  return new Date(order.value.orderDate).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

const paymentText = computed(() => {
  if (!order.value?.paymentMethod) return "—";
  return order.value.paymentMethod === "card"
    ? "Оплата картой при доставке"
    : "Оплата наличными при доставке";
});

const deliveryText = computed(() => {
  if (!order.value?.deliveryMethod) return "—";
  switch (order.value.deliveryMethod) {
    case "pickup":
      return "Забрать со склада";
    case "cdek":
      return "Доставка с помощью службы СДЭК";
    default:
      return "—";
  }
});

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
</script>
