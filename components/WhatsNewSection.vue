<template>
  <section
    v-if="props.products && props.products.length > 0"
    class="py-16 bg-white"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-medium text-center mb-6">Наши новинки</h2>

      <!-- Filters -->
      <div
        v-if="props.filters && props.filters.length > 0"
        class="flex justify-center mb-10"
      >
        <div class="inline-flex bg-gray-100 rounded-full px-2 py-1">
          <button
            v-for="filter in props.filters"
            :key="filter"
            @click="activeFilter = filter"
            :class="[
              'px-4 py-2 text-sm rounded-full transition-all uppercase',
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
          v-if="showArrows"
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
          v-if="showArrows"
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
              'w-[calc(100%/1)] sm:w-[calc(50%-12px)] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-18px)] xl:w-[calc(25%-18px)]',
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
                  'absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-md z-10',
                  product.badgeType === 'new'
                    ? 'bg-[#ec018c] text-[#ffffff]'
                    : 'bg-[#303030] text-[#ffffff]',
                ]"
              >
                {{ product.badge }}
              </span>

              <!-- Action Buttons (Wishlist, Compare) -->

              <!-- Main Image (default state) -->
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-full object-cover absolute inset-0 group-hover:opacity-0 transition-opacity duration-300"
              />

              <!-- Hover Image -->
              <img
                :src="product.hoverImage || product.image"
                :alt="product.title"
                class="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <!-- Quick View / Quick Shop Buttons -->
              <div
                class="absolute bottom-4 left-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              >
                <a
                  :href="`/product/${product.name}`"
                  class="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium py-2.5 px-4 rounded-full hover:bg-white transition shadow-lg text-center"
                  @click.stop
                >
                  ПРОСМОТР
                </a>
                <!--
                <a
                  :href="`/cart?add=${product.name}`"
                  class="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium py-2.5 px-4 rounded-full hover:bg-white transition shadow-lg text-center"
                  @click.stop
                >
                  В КОРЗИНУ
                </a>
                -->
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
                {{ product.title }}
              </h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-sm font-medium"
                  >₽{{ formatPrice(product.price) }}</span
                >
                <span
                  v-if="product.fullPrice && product.discount"
                  class="text-sm text-gray-400 line-through"
                >
                  ₽{{ formatPrice(product.fullPrice) }}
                </span>
                <span
                  v-if="product.discount"
                  class="px-2 py-0.5 text-xs font-medium bg-[#ec018c] text-[#ffffff] rounded-full"
                >
                  -{{ product.discount }}%
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";

interface NewProduct {
  id: number;
  name: string;
  title: string;
  image: string;
  hoverImage?: string;
  price: number;
  fullPrice: number;
  discount: number;
  badge?: string;
  badgeType?: string;
  endDate?: string;
  category?: string;
}

const props = defineProps<{
  filters: string[];
  products: NewProduct[];
}>();

const activeFilter = ref("");
const currentTime = ref(Date.now());

watch(activeFilter, () => {
  nextTick(() => {
    checkArrows();
  });
});

watch(
  () => props.filters,
  (newFilters: readonly string[]) => {
    if (newFilters && newFilters.length > 0 && !activeFilter.value) {
      activeFilter.value = newFilters[0] as string;
    }
  },
  { immediate: true },
);

// Update timer every second
let timerInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timerInterval = setInterval(() => {
    currentTime.value = Date.now();
  }, 1000);

  if (props.filters && props.filters.length > 0) {
    activeFilter.value = props.filters[0] as string;
  }
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});

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

  return `${days}Д : ${String(hours).padStart(2, "0")}Ч : ${String(minutes).padStart(2, "0")}M : ${String(seconds).padStart(2, "0")}С`;
};

const filteredProducts = computed(() => {
  if (!props.products || props.products.length === 0) {
    return [];
  }
  if (!activeFilter.value || activeFilter.value === "Все новинки") {
    return props.products;
  }
  // Если у товара нет category или она совпадает с фильтром — показываем
  return props.products.filter(
    (p) => !p.category || p.category === activeFilter.value,
  );
});

const carouselRef = ref<HTMLElement | null>(null);
const showArrows = ref(false);

const checkArrows = () => {
  if (carouselRef.value) {
    // Стрелки нужны, если контент прокручивается (scrollWidth > clientWidth)
    showArrows.value =
      carouselRef.value.scrollWidth > carouselRef.value.clientWidth;
  }
};

onMounted(() => {
  timerInterval = setInterval(() => {
    currentTime.value = Date.now();
  }, 1000);

  // Проверяем, нужны ли стрелки при загрузке и при изменении размера окна
  checkArrows();
  window.addEventListener("resize", checkArrows);
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  window.removeEventListener("resize", checkArrows);
});

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

// Форматирование цены с разделителем тысяч
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
