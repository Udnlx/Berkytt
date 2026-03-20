<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-64 flex-shrink-0">
          <!-- Products Type -->
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-4">Категории</h3>
            <ul class="space-y-2">
              <!-- Loading state -->
              <li v-if="categoriesLoading" class="text-sm text-gray-500 py-4">
                Загрузка категорий...
              </li>
              <!-- Categories -->
              <li
                v-else
                v-for="item in productTypes"
                :key="item.category"
                class="flex justify-between items-center"
              >
                <a
                  href="#"
                  @click.prevent="selectCategory(item.category)"
                  :class="[
                    'text-sm transition',
                    activeCategory === item.category
                      ? 'text-[#ec018c] font-medium'
                      : 'text-gray-600 hover:text-gray-900',
                  ]"
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
              <label
                class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer text-sm text-gray-900 font-medium"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 border-2 border-gray-900 rounded appearance-none cursor-pointer bg-white checked:bg-[#ec018c] checked:border-[#ec018c] checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2013%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] checked:bg-no-repeat checked:bg-center"
                />
                Показать только товары распродаж
              </label>
            </div>

            <!-- Sort Dropdown -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-900 font-medium">Сортировка</span>
              <div class="relative">
                <select
                  class="appearance-none text-sm border-2 border-gray-900 rounded px-4 py-2 pr-8 text-gray-900 font-medium focus:outline-none focus:border-[#ec018c] cursor-pointer bg-white"
                >
                  <option>По умолчанию</option>
                  <option>Цена: от низкой к высокой</option>
                  <option>Цена: от высокой к низкой</option>
                  <option>Новинки</option>
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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div
              v-else
              v-for="product in props.products"
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
                    product.badgeType === 'top' || product.badgeType === 'new'
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
                    :href="`/product/${product.name}`"
                    class="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium py-2.5 px-4 rounded-full hover:bg-white transition shadow-lg text-center"
                    @click.stop
                  >
                    ПРОСМОТР
                  </a>
                  <a
                    :href="`/cart?add=${product.name}`"
                    class="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-medium py-2.5 px-4 rounded-full hover:bg-white transition shadow-lg text-center"
                    @click.stop
                  >
                    В КОРЗИНУ
                  </a>
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
              <div class="mt-4">
                <h3 class="text-sm font-medium text-gray-900">
                  {{ product.title }}
                </h3>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-sm font-medium"
                    >₽{{ formatPrice(product.price) }}</span
                  >
                  <span
                    v-if="product.discount"
                    class="text-sm text-gray-400 line-through"
                  >
                    ₽{{ formatPrice(product.oldPrice) }}
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRuntimeConfig } from "#app";

interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  badge?: string;
  badgeType?: string;
  image: string;
  hoverImage?: string;
  colors?: string[];
  category?: string;
  endDate?: string;
}

interface Category {
  name: string;
  title: string;
  count: number;
  slug?: string;
  id?: string | number;
}

interface CategoriesResponse {
  categories: Category[];
}

interface ProductType {
  label: string;
  category: string;
  count: number;
}

interface Size {
  id: number | string;
  russianSize: string;
  title: string;
}

interface SizesResponse {
  sizes: Size[];
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
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

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

// Динамические категории из API
const productTypes = ref<ProductType[]>([]);
const categoriesLoading = ref(false);

// Динамические размеры из API
const availableSizes = ref<
  {
    value: number | string;
    label: string;
    id: number | string;
    russianSize: string;
  }[]
>([]);

// Функция загрузки категорий
const fetchCategories = async () => {
  const section = route.params.section || "men";
  categoriesLoading.value = true;
  try {
    const response = await $fetch<Category[] | CategoriesResponse>(
      `${apiBase}/getcategories/${section}/`,
    );

    // Пробуем разные варианты структуры ответа
    const categories: Category[] = Array.isArray(response)
      ? response
      : (response as CategoriesResponse).categories || [];

    productTypes.value = categories.map((cat: Category) => ({
      label: (cat.title || cat.name || "Без названия").toUpperCase(),
      category: cat.name || cat.slug || String(cat.id) || "unknown",
      count: cat.count || 0,
    }));

    // Загружаем размеры для текущей секции
    const sizesResponse = await $fetch<SizesResponse>(
      `${apiBase}/getcategories/${section}/`,
    );

    if (sizesResponse && "sizes" in sizesResponse) {
      availableSizes.value = [
        { value: "all", label: "Все размеры", id: "all", russianSize: "" },
        ...sizesResponse.sizes.map((size: Size) => ({
          value: size.id,
          label: `${size.russianSize} - ${size.title}`,
          id: size.id,
          russianSize: size.russianSize,
        })),
      ];
    }
  } catch (error) {
    console.error("Ошибка загрузки категорий:", error);
    productTypes.value = [];
    availableSizes.value = [];
  } finally {
    categoriesLoading.value = false;
  }
};

const selectedSize = ref<number | string>("all");

// Следим за изменением section и перезагружаем категории
watch(
  () => route.params.section,
  async () => {
    await fetchCategories();
    // Сбрасываем размер при смене секции
    selectedSize.value = "";
    // Сбрасываем категорию на первую при смене секции
    if (productTypes.value.length > 0) {
      const firstCategory = productTypes.value[0];
      if (firstCategory) {
        router.push({
          path: `/catalog/${route.params.section}/${firstCategory.category}/all/1`,
        });
      }
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

const activeCategory = computed(() => route.params.category || "coat");

const selectCategory = (category: string) => {
  const section = route.params.section || "men";
  const size = route.params.size || "all";
  router.push({
    path: `/catalog/${section}/${category}/${size}/1`,
  });
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
</script>
