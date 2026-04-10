<template>
  <section
    v-if="props.products && props.products.length > 0"
    class="py-16 bg-white"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-medium text-center mb-6">Новинки</h2>

      <!-- Filters -->
      <div
        v-if="props.filters && props.filters.length > 0"
        class="flex justify-center mb-10"
      >
        <div
          class="inline-flex bg-gray-100 rounded-full px-2 py-1 overflow-x-auto scrollbar-hide"
          style="
            scrollbar-width: none;
            -ms-overflow-style: none;
            max-width: 100%;
          "
        >
          <button
            v-for="filter in props.filters"
            :key="filter"
            @click="activeFilter = filter"
            :class="[
              'px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-full transition-all uppercase whitespace-nowrap flex-shrink-0',
              activeFilter === filter
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="flex flex-wrap justify-center gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group cursor-pointer w-[calc(100%/1)] sm:w-[calc(50%-12px)] md:w-[calc(25%-18px)]"
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
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

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
  // Можно добавить логику при смене фильтра
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

// Форматирование цены с разделителем тысяч
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
