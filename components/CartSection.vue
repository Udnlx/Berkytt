<template>
  <section class="py-12 bg-white">
    <div class="max-w-[1200px] mx-auto container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            ТОВАРЫ В КОРЗИНЕ
          </h2>

          <!-- Cart Header - скрыт на мобильных -->
          <div
            class="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm text-gray-400 font-medium"
          >
            <div class="col-span-5">ТОВАР</div>
            <div class="col-span-2 text-center">ЦЕНА</div>
            <div class="col-span-3 text-center">КОЛИЧЕСТВО</div>
            <div class="col-span-2 text-center">СТОИМОСТЬ</div>
          </div>

          <!-- Cart Item -->
          <div
            v-for="item in cartProducts"
            :key="item.product + '-' + item.size"
            class="py-6 border-b border-gray-200"
          >
            <!-- Mobile Layout -->
            <div class="md:hidden">
              <!-- Product Row -->
              <div class="flex gap-4 mb-4">
                <div
                  class="w-20 h-28 flex-shrink-0 bg-gray-100 flex items-center justify-center"
                >
                  <span class="text-xs text-gray-400">Нет фото</span>
                </div>
                <div class="flex flex-col justify-center flex-1">
                  <h3 class="text-sm font-medium text-[#ec018c] mb-1">
                    {{ item.product }}
                  </h3>
                  <p class="text-xs text-gray-400">РАЗМЕР: {{ item.size }}</p>
                </div>
              </div>

              <!-- Price, Quantity, Total Row -->
              <div class="flex items-center justify-between gap-3">
                <!-- Price -->
                <div class="flex flex-col items-center">
                  <span class="text-xs text-gray-500 mb-1">Цена</span>
                  <span class="text-sm text-gray-800 whitespace-nowrap">
                    {{ formatPrice(item.price) }} ₽
                  </span>
                </div>

                <!-- Quantity Controls -->
                <div class="inline-flex items-center border border-gray-300">
                  <button
                    @click="decreaseQuantity(item.product, item.size, item.qnt)"
                    class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#ec018c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="item.qnt <= 1"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span
                    class="w-10 h-8 flex items-center justify-center text-sm text-gray-800 border-x border-gray-300"
                  >
                    {{ item.qnt }}
                  </span>
                  <button
                    @click="increaseQuantity(item.product, item.size, item.qnt)"
                    class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#ec018c] transition-colors"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>

                <!-- Total & Remove -->
                <div class="flex items-center gap-2">
                  <div class="flex flex-col items-center">
                    <span class="text-xs text-gray-500 mb-1">Итого</span>
                    <span
                      class="text-sm font-medium text-gray-800 whitespace-nowrap"
                    >
                      {{ formatPrice(item.price * item.qnt) }} ₽
                    </span>
                  </div>
                  <button
                    @click="removeItem(item.product, item.size)"
                    class="text-gray-400 hover:text-[#ec018c] transition-colors"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Desktop Layout -->
            <div class="hidden md:grid grid-cols-12 gap-4 items-center">
              <!-- Product Info -->
              <div class="col-span-5 flex gap-4">
                <!--
                <div
                  class="w-20 h-28 flex-shrink-0 bg-gray-100 flex items-center justify-center"
                >
                  <span class="text-xs text-gray-400">Нет фото</span>
                </div>
                -->
                <div class="flex flex-col justify-center">
                  <h3 class="text-sm font-medium text-[#ec018c] mb-1">
                    {{ item.product }}
                  </h3>
                  <p class="text-xs text-gray-400">РАЗМЕР: {{ item.size }}</p>
                </div>
              </div>

              <!-- Price -->
              <div class="col-span-2 text-center">
                <span class="text-sm text-gray-800">
                  {{ formatPrice(item.price) }} ₽
                </span>
              </div>

              <!-- Quantity Controls -->
              <div class="col-span-3 flex justify-center">
                <div class="inline-flex items-center border border-gray-300">
                  <button
                    @click="decreaseQuantity(item.product, item.size, item.qnt)"
                    class="w-10 h-9 flex items-center justify-center text-gray-600 hover:text-[#ec018c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="item.qnt <= 1"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span
                    class="w-12 h-9 flex items-center justify-center text-sm text-gray-800 border-x border-gray-300"
                  >
                    {{ item.qnt }}
                  </span>
                  <button
                    @click="increaseQuantity(item.product, item.size, item.qnt)"
                    class="w-10 h-9 flex items-center justify-center text-gray-600 hover:text-[#ec018c] transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Total & Remove -->
              <div class="col-span-2 flex items-center justify-center gap-3">
                <span class="text-sm font-medium text-gray-800">
                  {{ formatPrice(item.price * item.qnt) }} ₽
                </span>
                <button
                  @click="removeItem(item.product, item.size)"
                  class="text-gray-400 hover:text-[#ec018c] transition-colors"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Empty Cart Message -->
          <div v-if="cartProducts.length === 0" class="py-12 text-center">
            <p class="text-gray-500 text-lg">Корзина пуста</p>
          </div>

          <!-- Back to Catalog Button -->
          <div class="mt-8">
            <a
              href="/catalog/men/coat/all/1"
              class="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 text-sm font-medium hover:border-[#ec018c] hover:text-[#ec018c] transition-colors"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              В КАТАЛОГ
            </a>
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

              <!-- Checkout Button -->
              <div class="mt-8">
                <button
                  @click="checkout"
                  class="w-full py-4 bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#ec018c] transition-colors duration-300"
                >
                  ОФОРМИТЬ ЗАКАЗ
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
import { computed } from "vue";
import { useCart } from "~/composables/useCart";

const {
  cartProducts,
  totalQuantity,
  removeFromCart,
  updateQuantity,
  clearCart,
} = useCart();

const totalItems = computed(() => totalQuantity.value);

const subtotal = computed(() => {
  return cartProducts.value.reduce(
    (sum, item) => sum + item.price * item.qnt,
    0,
  );
});

const total = computed(() => {
  return subtotal.value;
});

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const increaseQuantity = (
  product: string,
  size: string,
  currentQnt: number,
) => {
  updateQuantity(product, size, currentQnt + 1);
};

const decreaseQuantity = (
  product: string,
  size: string,
  currentQnt: number,
) => {
  if (currentQnt > 1) {
    updateQuantity(product, size, currentQnt - 1);
  }
};

const removeItem = (product: string, size: string) => {
  removeFromCart(product, size);
};

const checkout = () => {
  console.log("Checkout:", cartProducts.value);
  // Здесь будет логика оформления заказа
};
</script>
