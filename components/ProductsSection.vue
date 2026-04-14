<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <!-- Filters Bar -->
      <div class="flex flex-wrap gap-4 mb-8">
        <!-- Categories -->
        <div class="w-full sm:w-64">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Категории</h3>
          <div class="relative">
            <select
              v-model="selectedCategory"
              class="appearance-none w-full text-sm border-2 border-gray-900 rounded px-4 py-2 pr-8 text-gray-900 font-medium focus:outline-none focus:border-[#ec018c] cursor-pointer bg-white"
              @change="onCategoryChange"
            >
              <option value="" disabled>Выберите категорию</option>
              <option
                v-for="item in productTypes"
                :key="item.category"
                :value="item.category"
              >
                {{ item.label }} ({{ item.count }})
              </option>
            </select>
            <div
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Sizes -->
        <div class="w-full sm:w-64">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Размеры</h3>
          <div class="relative">
            <select
              v-model="selectedSize"
              class="appearance-none w-full text-sm border-2 border-gray-900 rounded px-4 py-2 pr-8 text-gray-900 font-medium focus:outline-none focus:border-[#ec018c] cursor-pointer bg-white"
              @change="onSizeChange"
            >
              <option value="" disabled>Выберите размер</option>
              <option
                v-for="size in availableSizes"
                :key="size.value"
                :value="size.value"
              >
                {{ size.label }}
              </option>
            </select>
            <div
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <!-- Loading state -->
          <div
            v-if="loading"
            class="col-span-full flex justify-center items-center py-20"
          >
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ec018c]"
            ></div>
          </div>

          <!-- Empty state -->
          <div
            v-else-if="props.products.length === 0"
            class="col-span-full text-center py-20"
          >
            <p class="text-gray-500 text-lg">Товары не найдены</p>
          </div>

          <!-- Products -->
          <NuxtLink
            v-else
            v-for="product in props.products"
            :key="product.id"
            :to="`/product/${product.name}`"
            class="group cursor-pointer"
          >
            <!-- Image Container -->
            <div
              class="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]"
            >
              <!-- Badges -->
              <div
                v-if="product.badge && product.badge.length > 0"
                class="absolute top-3 left-3 flex flex-col gap-1 z-10"
              >
                <span
                  v-for="(badgeItem, badgeIndex) in product.badge"
                  :key="badgeIndex"
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-md w-fit',
                    getBadgeTypeClass(badgeItem.title),
                  ]"
                >
                  {{ badgeItem.title }}
                </span>
                <!-- Бейдж скидки под РАСПРОДАЖА -->
                <span
                  v-if="product.discount && hasSaleBadgeForProduct(product)"
                  class="px-2 py-1 text-xs font-medium rounded-md w-fit bg-[#ec018c] text-[#ffffff]"
                >
                  -{{ product.discount }}%
                </span>
              </div>

              <!-- Main Image (default state) -->
              <img
                :src="
                  product.image.startsWith('http')
                    ? product.image
                    : `${baseUrl}${product.image}`
                "
                :alt="product.title"
                class="w-full h-full object-cover absolute inset-0 group-hover:opacity-0 transition-opacity duration-300"
              />

              <!-- Hover Image -->
              <img
                :src="
                  (product.hoverImage || product.image).startsWith('http')
                    ? product.hoverImage || product.image
                    : `${baseUrl}${product.hoverImage || product.image}`
                "
                :alt="product.title"
                class="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <!-- Quick View / Quick Shop Buttons -->
              <div
                class="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              >
                <!-- Миниатюры sameModels -->
                <div
                  v-if="product.sameModels && product.sameModels.length > 0"
                  class="flex gap-2 justify-start"
                >
                  <div
                    v-for="(model, idx) in product.sameModels"
                    :key="idx"
                    class="w-14 h-16 rounded-md overflow-hidden border border-white/50 flex-shrink-0"
                  >
                    <img
                      :src="
                        model.image.startsWith('http')
                          ? model.image
                          : `${baseUrl}${model.image}`
                      "
                      :alt="model.title"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span
                  class="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium py-2.5 px-4 rounded-full hover:bg-white transition shadow-lg text-center"
                >
                  ПРОСМОТР
                </span>
              </div>

              <!-- Sale Timer (for sale items) -->
              <div
                v-if="
                  product.endDate &&
                  formatTimeLeft(product.endDate) !== 'РАСПРОДАЖА ЗАКОНЧЕНА'
                "
                class="absolute bottom-0 left-0 right-0 bg-black/30 px-3 py-2 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300"
              >
                <span class="text-xs text-white font-medium">
                  {{ formatTimeLeft(product.endDate) }}
                </span>
              </div>
            </div>

            <!-- Product Info -->
            <div class="mt-1">
              <h3 class="text-lg font-medium text-gray-900">
                {{ product.title }}
              </h3>
              <div class="flex items-center gap-2">
                <span class="text-lg font-medium"
                  >{{ formatPrice(product.price) }} ₽</span
                >
                <span
                  v-if="product.fullPrice && product.discount"
                  class="text-base text-gray-400 line-through"
                >
                  {{ formatPrice(product.fullPrice) }} ₽
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-12">
          <div class="flex items-center gap-2">
            <button
              v-for="pageNum in totalPagesComputed"
              :key="pageNum"
              @click="changePage(pageNum)"
              :class="[
                'w-10 h-10 rounded flex items-center justify-center text-sm font-medium transition',
                currentPage === pageNum
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
              ]"
            >
              {{ pageNum }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter, useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const baseUrl = config.public.domain as string;

interface Badge {
  id: number;
  title: string;
}

interface SameModel {
  id: number;
  title: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  fullPrice?: number;
  discount?: number;
  badge?: Badge[];
  image: string;
  hoverImage?: string;
  colors?: string[];
  category?: string;
  endDate?: string;
  sameModels?: SameModel[];
}

const props = defineProps<{
  products: Product[];
  loading?: boolean;
  totalPages?: number;
}>();

const emit = defineEmits<{
  (e: "update:filters", filters: { section?: string; category?: string }): void;
}>();

const route = useRoute();
const router = useRouter();

const currentPage = computed(() => Number(route.params.page) || 1);

const totalPagesComputed = computed(() => props.totalPages || 1);

const changePage = (page: number) => {
  const section = route.params.section || "men";
  const category = route.params.category || "coat";
  const size = route.params.size || "all";
  router.push({
    path: `/catalog/${section}/${category}/${size}/${page}`,
  });
};

// Используем composable с кешированием категорий
const { productTypes, availableSizes, categoriesLoading, fetchCategories } =
  useCategoriesCache();

const selectedSize = ref<number | string>("all");
const selectedCategory = ref<string>("");

// Следим за изменением section и перезагружаем категории
watch(
  () => route.params.section,
  async (newSection, oldSection) => {
    if (newSection && newSection !== oldSection) {
      await fetchCategories();
      selectedSize.value = "all";
      selectedCategory.value = "";
    }
  },
);

// Следим за изменением size в URL и устанавливаем выбранный размер
watch(
  () => route.params.size,
  (newSize) => {
    if (newSize && !Array.isArray(newSize)) {
      selectedSize.value = newSize;
    } else {
      selectedSize.value = "all";
    }
  },
  { immediate: true },
);

// Следим за изменением category в URL и устанавливаем выбранную категорию
watch(
  () => route.params.category,
  (newCategory) => {
    if (newCategory && !Array.isArray(newCategory)) {
      selectedCategory.value = newCategory;
    }
  },
  { immediate: true },
);

const onCategoryChange = () => {
  if (selectedCategory.value) {
    const section = route.params.section || "men";
    const size = route.params.size || "all";
    router.push({
      path: `/catalog/${section}/${selectedCategory.value}/${size}/1`,
    });
  }
};

const onSizeChange = () => {
  // Обработка выбора размера
  const selectedSizeData = availableSizes.value.find(
    (size) => size.value === selectedSize.value,
  );
  if (selectedSizeData) {
    // Добавляем параметр size в URL или убираем его если выбрано "Все размеры"
    const section = route.params.section || "men";
    const category = route.params.category || "coat";
    const newSize = selectedSizeData.id ? String(selectedSizeData.id) : "all";
    router.push({
      path: `/catalog/${section}/${category}/${newSize}/1`,
    });
  }
};

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

onMounted(async () => {
  timerInterval = setInterval(() => {
    currentTime.value = Date.now();
  }, 1000);
  // Загружаем категории при монтировании
  await fetchCategories();
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});

// Форматирование цены с разделителем тысяч
const formatPrice = (price: number | undefined | null) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Проверка наличия бейджа РАСПРОДАЖА у конкретного товара
const hasSaleBadgeForProduct = (product: Product) => {
  return product.badge?.some((b) => b.title === "РАСПРОДАЖА") ?? false;
};

// Определение стиля бейджа по его названию
const getBadgeTypeClass = (title: string) => {
  if (title === "НОВИНКА") {
    return "bg-[#ec018c] text-[#ffffff]";
  }
  if (title === "РАСПРОДАЖА") {
    return "bg-[#303030] text-[#ffffff]";
  }
  return "bg-[#f59e0b] text-[#ffffff]";
};
</script>
