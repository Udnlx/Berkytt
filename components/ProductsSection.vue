<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-64 flex-shrink-0">
          <!-- Products Type -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-4">Товары</h3>
            <ul class="space-y-2">
              <li
                v-for="item in productTypes"
                :key="item.label"
                class="flex justify-between items-center"
              >
                <a
                  :href="item.href"
                  class="text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  {{ item.label }}
                </a>
                <span class="text-xs text-gray-400">{{ item.count }}</span>
              </li>
            </ul>
          </div>

          <!-- Size Filter -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-4">Размеры</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in sizes"
                :key="size"
                class="w-10 h-10 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition"
              >
                {{ size }}
              </button>
            </div>
          </div>
        </aside>

        <!-- Products Grid -->
        <div class="flex-1">
          <!-- Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
            <!-- View Mode & Sale Filter -->
            <div class="flex items-center gap-4">
              <!-- <div class="flex items-center gap-2">
                <button
                  class="w-8 h-8 bg-gray-900 text-white rounded flex items-center justify-center"
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
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  class="w-8 h-8 bg-gray-100 text-gray-400 rounded flex items-center justify-center hover:bg-gray-200 transition"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div> -->
              <label class="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  class="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900"
                />
                Показать только товары распродаж
              </label>
            </div>

            <!-- Sort Dropdown -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">Сортировка</span>
              <select
                class="text-sm border border-gray-200 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option>По умолчанию</option>
                <option>Цена: от низкой к высокой</option>
                <option>Цена: от высокой к низкой</option>
                <option>Новинки</option>
              </select>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="product in products"
              :key="product.id"
              class="group cursor-pointer"
            >
              <!-- Image Container -->
              <div
                class="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]"
              >
                <!-- Badge -->
                <span
                  v-if="product.badge"
                  :class="[
                    'absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-md z-10',
                    product.badgeType === 'new'
                      ? 'bg-[#ec018c] text-[#ffffff]'
                      : 'bg-[#303030] text-[#ffffff]',
                  ]"
                >
                  {{ product.badge }}
                </span>

                <!-- Action Buttons (Wishlist, Compare) -->
                <div class="absolute top-3 right-3 z-10 flex flex-col gap-2">
                  <button
                    class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                    @click.prevent
                  >
                    <svg
                      class="w-4 h-4 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <button
                    class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 delay-75"
                    @click.prevent
                  >
                    <svg
                      class="w-4 h-4 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>

                <!-- Main Image (default state) -->
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover absolute inset-0 group-hover:opacity-0 transition-opacity duration-300"
                />

                <!-- Hover Image -->
                <img
                  :src="product.hoverImage || product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <!-- Quick View / Quick Shop Buttons -->
                <div
                  class="absolute bottom-4 left-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  <a
                    :href="`/product/${product.id}`"
                    class="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium py-2.5 px-4 rounded-full hover:bg-white transition shadow-lg text-center"
                    @click.stop
                  >
                    ПРОСМОТР
                  </a>
                  <a
                    :href="`/cart?add=${product.id}`"
                    class="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium py-2.5 px-4 rounded-full hover:bg-white transition shadow-lg text-center"
                    @click.stop
                  >
                    В КОРЗИНУ
                  </a>
                </div>

                <!-- Color Swatches -->
                <div
                  class="absolute bottom-4 left-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-16 group-hover:-translate-y-11 transition-all duration-300 delay-75"
                >
                  <div
                    v-for="color in product.colors || [
                      'bg-gray-200',
                      'bg-pink-200',
                      'bg-blue-100',
                    ]"
                    :key="color"
                    :class="[
                      'w-8 h-8 rounded-full cursor-pointer border-2 border-white shadow-md hover:scale-110 transition',
                      color,
                    ]"
                  ></div>
                </div>

                <!-- Sale Timer (for sale items) -->
                <div
                  v-if="product.endDate"
                  class="absolute bottom-0 left-0 right-0 bg-black/30 px-3 py-2 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                >
                  <span class="text-xs text-white font-medium">
                    {{ formatTimeLeft(product.endDate) }}
                  </span>
                </div>
              </div>

              <!-- Product Info -->
              <div class="mt-4">
                <h3 class="text-sm font-medium text-gray-900">
                  {{ product.name }}
                </h3>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-sm font-medium">${{ product.price }}</span>
                  <span
                    v-if="product.oldPrice"
                    class="text-sm text-gray-400 line-through"
                  >
                    ${{ product.oldPrice }}
                  </span>
                  <span
                    v-if="product.discount"
                    class="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full"
                  >
                    {{ product.discount }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex justify-center mt-12">
            <div class="flex items-center gap-2">
              <button
                class="w-10 h-10 bg-gray-900 text-white rounded flex items-center justify-center text-sm font-medium"
              >
                1
              </button>
              <button
                class="w-10 h-10 bg-white border border-gray-200 text-gray-700 rounded flex items-center justify-center text-sm font-medium hover:bg-gray-50 transition"
              >
                2
              </button>
              <button
                class="w-10 h-10 bg-white border border-gray-200 text-gray-700 rounded flex items-center justify-center text-sm font-medium hover:bg-gray-50 transition"
              >
                3
              </button>
              <button
                class="w-10 h-10 bg-white border border-gray-200 text-gray-700 rounded flex items-center justify-center text-sm font-medium hover:bg-gray-50 transition"
              >
                ›
              </button>
              <button
                class="w-10 h-10 bg-white border border-gray-200 text-gray-700 rounded flex items-center justify-center text-sm font-medium hover:bg-gray-50 transition"
              >
                ››
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const productTypes = [
  { label: "ПАЛЬТО", count: 12, href: "#" },
  { label: "ПОЛУПАЛЬТО", count: 4, href: "#" },
  { label: "ПЛАЩИ", count: 4, href: "#" },
  { label: "КУРТКИ", count: 8, href: "#" },
  { label: "ПИДЖАКИ", count: 5, href: "#" },
  { label: "БРЮКИ", count: 4, href: "#" },
  { label: "ЖИЛЕТЫ", count: 4, href: "#" },
  { label: "ИЗДЕЛИЯ С МЕХОМ", count: 6, href: "#" },
  { label: "БЕЙСБОЛКИ И КЕПКИ", count: 6, href: "#" },
];

const sizes = ["XS", "S", "M", "L", "XL", "2XL", "FSize"];

const currentTime = ref(Date.now());

// Update timer every second
let timerInterval: ReturnType<typeof setInterval> | null = null;

// Format time left until endDate
const formatTimeLeft = (endDate: string) => {
  const end = new Date(endDate).getTime();
  const now = currentTime.value;
  const diff = end - now;

  if (diff <= 0) {
    return "РАСПРОДАЖА ЗАКОНЧЕНА";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days}Д : ${String(hours).padStart(2, "0")}Ч : ${String(minutes).padStart(2, "0")}М : ${String(seconds).padStart(2, "0")}С`;
};

const products = [
  {
    id: 1,
    name: "Raglan Sleeve T-Shirt",
    price: 28.0,
    oldPrice: 36.0,
    discount: "-22%",
    badge: "НОВИНКА",
    badgeType: "new" as const,
    image: "/images/forcards.jpg",
    hoverImage: "/images/forcardshover.jpg",
    colors: ["bg-gray-200", "bg-pink-200", "bg-blue-100"],
  },
  {
    id: 2,
    name: "Raglan Sleeve T-Shirt",
    price: 28.0,
    oldPrice: 36.0,
    discount: "-22%",
    badge: "НОВИНКА",
    badgeType: "new" as const,
    image: "/images/forcards.jpg",
    hoverImage: "/images/forcardshover.jpg",
    colors: ["bg-gray-200", "bg-pink-200", "bg-blue-100"],
  },
  {
    id: 3,
    name: "Kimono Sleeve Top",
    price: 24.0,
    oldPrice: 32.0,
    discount: "-25%",
    badge: "РАСПРОДАЖА",
    badgeType: "sale" as const,
    category: "ПАЛЬТО",
    endDate: "2026-03-15T23:59:59",
    image: "/images/forcards.jpg",
    hoverImage: "/images/forcardshover.jpg",
    colors: ["bg-gray-200", "bg-pink-200", "bg-blue-100"],
  },
  {
    id: 4,
    name: "Kimono Sleeve Top",
    price: 24.0,
    oldPrice: 32.0,
    discount: "-25%",
    badge: "РАСПРОДАЖА",
    badgeType: "sale" as const,
    category: "ПАЛЬТО",
    endDate: "2026-03-15T23:59:59",
    image: "/images/forcards.jpg",
    hoverImage: "/images/forcardshover.jpg",
    colors: ["bg-gray-200", "bg-pink-200", "bg-blue-100"],
  },
  {
    id: 5,
    name: "Kimono Sleeve Top",
    price: 24.0,
    oldPrice: 32.0,
    discount: "-25%",
    badge: "РАСПРОДАЖА",
    badgeType: "sale" as const,
    category: "ПАЛЬТО",
    endDate: "2026-03-15T23:59:59",
    image: "/images/forcards.jpg",
    hoverImage: "/images/forcardshover.jpg",
    colors: ["bg-gray-200", "bg-pink-200", "bg-blue-100"],
  },
  {
    id: 6,
    name: "Raglan Sleeve T-Shirt",
    price: 28.0,
    oldPrice: 36.0,
    discount: "-22%",
    badge: "НОВИНКА",
    badgeType: "new" as const,
    image: "/images/forcards.jpg",
    hoverImage: "/images/forcardshover.jpg",
    colors: ["bg-gray-200", "bg-pink-200", "bg-blue-100"],
  },
  {
    id: 7,
    name: "Kimono Sleeve Top",
    price: 24.0,
    oldPrice: 32.0,
    discount: "-25%",
    badge: "РАСПРОДАЖА",
    badgeType: "sale" as const,
    category: "ПАЛЬТО",
    endDate: "2026-03-15T23:59:59",
    image: "/images/forcards.jpg",
    hoverImage: "/images/forcardshover.jpg",
    colors: ["bg-gray-200", "bg-pink-200", "bg-blue-100"],
  },
  {
    id: 8,
    name: "Kimono Sleeve Top",
    price: 24.0,
    oldPrice: 32.0,
    discount: "-25%",
    badge: "РАСПРОДАЖА",
    badgeType: "sale" as const,
    category: "ПАЛЬТО",
    endDate: "2026-03-15T23:59:59",
    image: "/images/forcards.jpg",
    hoverImage: "/images/forcardshover.jpg",
    colors: ["bg-gray-200", "bg-pink-200", "bg-blue-100"],
  },
  {
    id: 9,
    name: "Raglan Sleeve T-Shirt",
    price: 28.0,
    oldPrice: 36.0,
    discount: "-22%",
    badge: "НОВИНКА",
    badgeType: "new" as const,
    image: "/images/forcards.jpg",
    hoverImage: "/images/forcardshover.jpg",
    colors: ["bg-gray-200", "bg-pink-200", "bg-blue-100"],
  },
];

onMounted(() => {
  timerInterval = setInterval(() => {
    currentTime.value = Date.now();
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});
</script>
