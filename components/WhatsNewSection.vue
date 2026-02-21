<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-medium text-center mb-6">What's New</h2>

      <!-- Filters -->
      <div class="flex justify-center mb-10">
        <div class="inline-flex bg-gray-100 rounded-full px-2 py-1">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            :class="[
              'px-4 py-2 text-sm rounded-full transition-all',
              activeFilter === filter
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Products Carousel -->
      <div class="relative">
        <!-- Navigation Arrows -->
        <button
          @click="scrollLeft"
          class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition"
        >
          <svg
            class="w-5 h-5 text-gray-700"
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
        </button>

        <button
          @click="scrollRight"
          class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition"
        >
          <svg
            class="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div
          ref="carouselRef"
          class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
          style="scrollbar-width: none; -ms-overflow-style: none"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="group cursor-pointer flex-shrink-0 snap-start"
            :class="[
              'w-[calc(100%/1)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]',
            ]"
          >
            <!-- Image Container -->
            <div
              class="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]"
            >
              <!-- Badge -->
              <span
                v-if="product.badge"
                :class="[
                  'absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-md',
                  product.badgeType === 'new'
                    ? 'bg-lime-200 text-gray-900'
                    : 'bg-red-400 text-white',
                ]"
              >
                {{ product.badge }}
              </span>

              <!-- Image -->
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <!-- Sale Timer (for sale items) -->
              <div
                v-if="product.timer"
                class="absolute bottom-0 left-0 right-0 bg-white/90 px-3 py-2 text-center"
              >
                <span class="text-xs text-red-500 font-medium">{{
                  product.timer
                }}</span>
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
                  class="px-2 py-0.5 text-xs font-medium bg-lime-200 text-gray-900 rounded-full"
                >
                  {{ product.discount }}
                </span>
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

const filters = ["TOP", "T-SHIRT", "DRESS", "SETS", "SHIRT"];
const activeFilter = ref("T-SHIRT");

const products = [
  {
    id: 1,
    name: "Raglan Sleeve T-Shirt",
    price: 28.0,
    oldPrice: 36.0,
    discount: "-22%",
    badge: "NEW",
    badgeType: "new" as const,
    category: "T-SHIRT",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
  },
  {
    id: 2,
    name: "Kimono Sleeve Top",
    price: 24.0,
    oldPrice: 32.0,
    discount: "-25%",
    badge: "SALE",
    badgeType: "sale" as const,
    category: "T-SHIRT",
    timer: "0-480 D : 0-16 H : 0-35 M : 0-3 S",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    name: "Mesh Shirt",
    price: 35.0,
    oldPrice: 45.0,
    discount: "-22%",
    badge: "NEW",
    badgeType: "new" as const,
    category: "SHIRT",
    image:
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&h=800&fit=crop",
  },
  {
    id: 4,
    name: "Raglan Sleeve T-Shirt",
    price: 28.0,
    oldPrice: 36.0,
    discount: "-22%",
    badge: "NEW",
    badgeType: "new" as const,
    category: "T-SHIRT",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
  },
  {
    id: 5,
    name: "Raglan Sleeve T-Shirt",
    price: 28.0,
    oldPrice: 36.0,
    discount: "-22%",
    badge: "NEW",
    badgeType: "new" as const,
    category: "T-SHIRT",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
  },
];

const filteredProducts = computed(() => {
  if (activeFilter.value === "TOP") {
    return products;
  }
  return products.filter((p) => p.category === activeFilter.value);
});

const carouselRef = ref<HTMLElement | null>(null);

const scrollLeft = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: -300, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: 300, behavior: "smooth" });
  }
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
