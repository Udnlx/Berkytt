<template>
  <section class="bg-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Галерея изображений -->
        <div class="relative">
          <!-- Основное изображение -->
          <div
            class="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
          >
            <img
              :src="currentImage"
              alt="Kimono Sleeve Top"
              class="w-full h-auto object-contain"
            />
          </div>
          <!-- Миниатюры поверх изображения (слева) -->
          <div class="absolute left-3 top-3 bottom-3 flex flex-col gap-3">
            <div
              v-for="(thumb, index) in thumbnails"
              :key="index"
              class="w-20 h-30 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#ec018c] transition flex items-center justify-center flex-shrink-0"
              :class="{ 'ring-2 ring-black': currentIndex === index }"
              @click="selectImage(index)"
            >
              <img
                :src="thumb"
                :alt="`Thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Информация о продукте -->
        <div class="space-y-6">
          <!-- Заголовок и избранное -->
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 uppercase tracking-wide">
                ПАЛЬТО
              </p>
              <h1 class="text-2xl font-semibold mt-1">Kimono Sleeve Top</h1>
            </div>
            <button
              class="p-2 border border-gray-200 rounded hover:border-gray-400 transition"
            >
              <svg
                class="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <!-- Рейтинг -->
          <div class="flex items-center gap-2">
            <div class="flex text-yellow-400">
              <svg
                v-for="i in 5"
                :key="i"
                class="w-5 h-5 fill-current"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <span class="text-sm text-gray-500">(1234 reviews)</span>
          </div>

          <!-- Цена -->
          <div class="flex items-center gap-3">
            <span class="text-2xl font-medium">₽24.00</span>
            <span class="text-lg text-gray-400 line-through">₽32.00</span>
            <span
              class="bg-green-200 text-green-800 text-sm px-2 py-1 rounded-full font-medium"
              >-25%</span
            >
          </div>

          <!-- Описание -->
          <p class="text-gray-600 leading-relaxed">
            Keep your home organized, yet elegant with storage cabinets by Onita
            Patio Furniture. Traditionally designed, they are perfect to be used
            in the any place where you need to store.
          </p>

          <hr class="border-gray-100" />

          <!-- Цвета -->
          <div>
            <p class="text-sm font-medium mb-3">Colors:</p>
            <div class="flex gap-3">
              <button
                v-for="(color, index) in colors"
                :key="index"
                class="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-black transition"
                :style="{ backgroundColor: color }"
              ></button>
            </div>
          </div>

          <!-- Размер -->
          <div>
            <div class="flex justify-between items-center mb-3">
              <p class="text-sm font-medium">Size:</p>
              <a href="#" class="text-sm text-red-400 underline">Size Guide</a>
            </div>
            <div class="flex gap-3">
              <button
                v-for="size in sizes"
                :key="size"
                class="w-12 h-12 border border-gray-300 rounded-full text-sm font-medium hover:border-black hover:bg-black hover:text-white transition"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Количество и кнопки -->
          <div class="space-y-3">
            <div class="flex gap-4">
              <p class="text-sm font-medium self-center">Quantity:</p>
              <div class="flex border border-gray-300 rounded">
                <button
                  class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                  −
                </button>
                <span
                  class="w-10 h-10 flex items-center justify-center border-x border-gray-300"
                  >1</span
                >
                <button
                  class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                class="flex-1 py-3 border border-black rounded text-sm font-medium hover:bg-gray-50 transition"
              >
                ADD TO CART
              </button>
            </div>
            <button
              class="w-full py-3 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
            >
              BUY IT NOW
            </button>
          </div>

          <!-- Дополнительная информация -->
          <div class="space-y-3 text-sm">
            <div class="flex gap-4">
              <a
                href="#"
                class="flex items-center gap-1 text-gray-700 hover:underline"
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
                    stroke-width="1.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Delivery & Return
              </a>
              <a
                href="#"
                class="flex items-center gap-1 text-gray-700 hover:underline"
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
                    stroke-width="1.5"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Ask A Question
              </a>
            </div>
            <p class="flex items-center gap-1 text-gray-600">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Estimated Delivery:</span>
              <span class="text-gray-500">14 January - 18 January</span>
            </p>
            <p class="flex items-center gap-1 text-gray-600">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>38 people viewing this product right now!</span>
            </p>
          </div>

          <!-- SKU и категории -->
          <div class="text-sm space-y-2 text-gray-600">
            <p><span class="font-medium">SKU:</span> 53453412</p>
            <p><span class="font-medium">Categories:</span> fashion, women</p>
            <p><span class="font-medium">Tag:</span> t-shirt</p>
          </div>

          <!-- Get It Today -->
          <div class="pt-4 border-t border-gray-100">
            <h3 class="text-lg font-medium mb-4">Get It Today</h3>
            <div class="space-y-4">
              <div class="flex gap-3">
                <svg
                  class="w-8 h-8 text-gray-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p class="font-medium text-sm">Free Shipping</p>
                  <p class="text-sm text-gray-500">
                    Free shipping on orders over $75.
                  </p>
                </div>
              </div>
              <div class="flex gap-3">
                <svg
                  class="w-8 h-8 text-gray-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <div>
                  <p class="font-medium text-sm">Support Everyday</p>
                  <p class="text-sm text-gray-500">
                    Support from 8:30 AM to 10:00 PM everyday
                  </p>
                </div>
              </div>
              <div class="flex gap-3">
                <svg
                  class="w-8 h-8 text-gray-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <div>
                  <p class="font-medium text-sm">100 Day Returns</p>
                  <p class="text-sm text-gray-500">
                    Not impressed? Get a refund. You have 100 days to break our
                    hearts.
                  </p>
                </div>
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

// Полноразмерные изображения для галереи
const images = ref([
  "/images/forcards.jpg?w=800",
  "/images/forcardshover.jpg?w=800",
]);

// Миниатюры изображений
const thumbnails = ref([
  "/images/forcards.jpg?w=200",
  "/images/forcardshover.jpg?w=200",
]);

// Индекс текущего изображения
const currentIndex = ref(0);

// Текущее изображение (вычисляемое)
const currentImage = computed(() => images.value[currentIndex.value]);

// Выбор изображения по индексу
const selectImage = (index: number) => {
  currentIndex.value = index;
};

// Доступные цвета (hex или названия)
const colors = ref(["#FFB6C1", "#F5F5DC", "#87CEEB"]);

// Доступные размеры
const sizes = ref(["M", "L", "XL"]);
</script>
