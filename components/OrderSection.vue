<template>
  <section class="py-12 bg-white">
    <div class="max-w-[1200px] mx-auto container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Order Form -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            ОФОРМЛЕНИЕ ЗАКАЗА
          </h2>

          <!-- Cart Items Summary -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-400 mb-4 uppercase">
              Товары в заказе:
            </h3>

            <div class="space-y-3">
              <div
                v-for="item in cartProducts"
                :key="item.id + '-' + item.idSize"
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

              <div v-if="cartProducts.length === 0" class="text-center py-6">
                <p class="text-gray-500">Корзина пуста</p>
              </div>
            </div>
          </div>

          <!-- Buyer Information -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-400 mb-4 uppercase">
              Информация о покупателе:
            </h3>

            <div class="space-y-4">
              <!-- Name -->
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
                  v-model="form.name"
                  type="text"
                  placeholder="Ваше имя"
                  class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent"
                />
              </div>

              <!-- Email -->
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
                  placeholder="Электронная почта"
                  class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent"
                />
              </div>

              <!-- Phone -->
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
                  placeholder="Телефон"
                  class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-400 mb-4 uppercase">
              Способ оплаты:
            </h3>

            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="form.paymentMethod"
                  type="radio"
                  value="card"
                  class="w-4 h-4 border-2 border-gray-900 rounded-full appearance-none cursor-pointer bg-white checked:bg-[#ec018c] checked:border-[#ec018c] checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%225%22%20fill%3D%22%23ffffff%22%2F%3E%3C%2Fsvg%3E')] checked:bg-no-repeat checked:bg-center"
                />
                <span class="text-sm text-gray-700">
                  Оплата картой при доставке
                </span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="form.paymentMethod"
                  type="radio"
                  value="cash"
                  class="w-4 h-4 border-2 border-gray-900 rounded-full appearance-none cursor-pointer bg-white checked:bg-[#ec018c] checked:border-[#ec018c] checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%225%22%20fill%3D%22%23ffffff%22%2F%3E%3C%2Fsvg%3E')] checked:bg-no-repeat checked:bg-center"
                />
                <span class="text-sm text-gray-700">
                  Оплата наличными при доставке
                </span>
              </label>
            </div>
          </div>

          <!-- Delivery -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-400 mb-4 uppercase">
              Доставка:
            </h3>

            <div class="space-y-4">
              <!-- Pickup from Warehouse -->
              <label class="block cursor-pointer">
                <div class="flex items-center gap-3 mb-3">
                  <input
                    v-model="form.deliveryMethod"
                    type="radio"
                    value="pickup"
                    class="w-4 h-4 border-2 border-gray-900 rounded-full appearance-none cursor-pointer bg-white checked:bg-[#ec018c] checked:border-[#ec018c] checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%225%22%20fill%3D%22%23ffffff%22%2F%3E%3C%2Fsvg%3E')] checked:bg-no-repeat checked:bg-center"
                  />
                  <span class="text-sm font-medium text-gray-700">
                    Забрать со склада
                  </span>
                </div>

                <div
                  v-show="form.deliveryMethod === 'pickup'"
                  class="ml-7 text-xs text-gray-500 space-y-1"
                >
                  <p>Забрать заказ можно по адресу:</p>
                  <p>г.Москва, Сормовский проезд д. 11/7</p>
                  <p>с 9:00 до 17:00 Пн-Пт</p>
                  <p>Бесплатно.</p>
                </div>
              </label>

              <!-- CDEK Delivery -->
              <label class="block cursor-pointer">
                <div class="flex items-center gap-3 mb-3">
                  <input
                    v-model="form.deliveryMethod"
                    type="radio"
                    value="cdek"
                    class="w-4 h-4 border-2 border-gray-900 rounded-full appearance-none cursor-pointer bg-white checked:bg-[#ec018c] checked:border-[#ec018c] checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%225%22%20fill%3D%22%23ffffff%22%2F%3E%3C%2Fsvg%3E')] checked:bg-no-repeat checked:bg-center"
                  />
                  <span class="text-sm font-medium text-gray-700">
                    Доставка с помощью службы СДЭК
                  </span>
                </div>

                <div
                  v-show="form.deliveryMethod === 'cdek'"
                  class="ml-7 space-y-3"
                >
                  <p class="text-xs text-gray-500">
                    Можно выбрать самовывоз из пунктов выдачи/постаматов, либо
                    курьерскую доставку.
                  </p>
                  <p class="text-xs text-[#ec018c] italic">
                    * В связи с техническими неполадками, при выборе доставки в
                    пункты выдачи СДЭК, просьба уточнять окончательную стоимость
                    у менеджера.
                  </p>
                </div>
              </label>
            </div>
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
                    {{ totalItems }} шт.
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
                    {{ formatPrice(subtotal) }} ₽
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
                    {{ formatPrice(deliveryCost) }} ₽
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
                    {{ formatPrice(total) }} ₽
                  </span>
                </div>
              </div>

              <!-- Terms Agreement -->
              <div class="pt-6">
                <label class="flex items-start gap-2 cursor-pointer">
                  <input
                    v-model="form.agreeTerms"
                    type="checkbox"
                    class="min-w-4 h-4 border-2 border-gray-900 rounded appearance-none cursor-pointer bg-white checked:bg-[#ec018c] checked:border-[#ec018c] checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2013%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] checked:bg-no-repeat checked:bg-center"
                  />
                  <span class="text-xs text-gray-500 leading-relaxed">
                    Нажимая кнопку "Заказать", Вы принимаете
                    <a href="#" class="text-[#ec018c] hover:underline">
                      Пользовательское соглашение
                    </a>
                    и даете согласие на обработку персональных данных
                  </span>
                </label>
              </div>

              <!-- Submit Button -->
              <div class="mt-6">
                <button
                  @click="submitOrder"
                  :disabled="!form.agreeTerms"
                  class="w-full py-4 border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-[#ec018c] hover:text-[#ec018c] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ЗАКАЗАТЬ
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
import { reactive, computed } from "vue";
import { useCart } from "~/composables/useCart";

const { cartProducts, totalQuantity, clearCart } = useCart();

const form = reactive({
  name: "",
  email: "",
  phone: "",
  paymentMethod: "card",
  deliveryMethod: "pickup",
  agreeTerms: false,
});

const totalItems = computed(() => totalQuantity.value);

const subtotal = computed(() => {
  return cartProducts.value.reduce(
    (sum, item) => sum + item.price * item.qnt,
    0,
  );
});

const deliveryCost = computed(() => {
  return form.deliveryMethod === "pickup" ? 0 : 500;
});

const total = computed(() => {
  return subtotal.value + deliveryCost.value;
});

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const submitOrder = () => {
  if (!form.agreeTerms) {
    console.log("Необходимо принять условия соглашения");
    return;
  }

  if (cartProducts.value.length === 0) {
    console.log("Корзина пуста");
    return;
  }

  console.log("=== ОФОРМЛЕНИЕ ЗАКАЗА ===");
  console.log("Корзина:", cartProducts.value);
  console.log("Данные покупателя:", {
    name: form.name,
    email: form.email,
    phone: form.phone,
  });
  console.log("Способ оплаты:", form.paymentMethod);
  console.log("Способ доставки:", form.deliveryMethod);
  console.log("Итого:", total.value);

  // Очистка корзины после заказа
  clearCart();

  // Здесь будет логика отправки заказа на сервер
};
</script>
