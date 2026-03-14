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
            <div class="size-table">
              <table>
                <tbody>
                  <tr v-for="row in sizeGrid" :key="row.size">
                    <td class="size-label">{{ row.size }}</td>
                    <td
                      v-if="row.bust"
                      @click="
                        !row.bustUnavailable &&
                        selectSize(row.size, 'bust', row.bust)
                      "
                      :class="[
                        getActiveClass(row.size, 'bust'),
                        { unavailable: row.bustUnavailable },
                      ]"
                    >
                      {{ row.bust }}
                    </td>
                    <td
                      v-if="row.waist"
                      @click="
                        !row.waistUnavailable &&
                        selectSize(row.size, 'waist', row.waist)
                      "
                      :class="[
                        getActiveClass(row.size, 'waist'),
                        { unavailable: row.waistUnavailable },
                      ]"
                    >
                      {{ row.waist }}
                    </td>
                    <td
                      v-if="row.hips"
                      @click="
                        !row.hipsUnavailable &&
                        selectSize(row.size, 'hips', row.hips)
                      "
                      :class="[
                        getActiveClass(row.size, 'hips'),
                        { unavailable: row.hipsUnavailable },
                      ]"
                    >
                      {{ row.hips }}
                    </td>
                  </tr>
                </tbody>
              </table>
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

interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  badge?: string;
  badgeType?: "new" | "sale";
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
}

interface ProductType {
  label: string;
  category: string;
  count: number;
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

const currentPage = computed(() => Number(route.query.page) || 1);

const totalPagesComputed = computed(() => props.totalPages || 1);

const changePage = (page: number) => {
  router.push({
    path: "/catalog",
    query: { ...route.query, page: String(page) },
  });
};

// Динамические категории из API
const productTypes = ref<ProductType[]>([]);
const categoriesLoading = ref(false);

// Функция загрузки категорий
const fetchCategories = async () => {
  const section = route.query.section || "men";
  categoriesLoading.value = true;
  try {
    const response = await $fetch(
      `http://berkytt/api/getcategories/${section}/`,
    );

    // Пробуем разные варианты структуры ответа
    const categories = Array.isArray(response)
      ? response
      : response.categories || [];

    productTypes.value = categories.map((cat: any) => ({
      label: cat.title || cat.name || "Без названия",
      category: cat.name || cat.slug || cat.id || "unknown",
      count: cat.count || 0,
    }));
  } catch (error) {
    console.error("Ошибка загрузки категорий:", error);
    productTypes.value = [];
  } finally {
    categoriesLoading.value = false;
  }
};

// Следим за изменением section и перезагружаем категории
watch(
  () => route.query.section,
  () => {
    fetchCategories();
    // Сбрасываем категорию на первую при смене секции
    if (productTypes.value.length > 0) {
      const currentCategory = route.query.category;
      const categoryExists = productTypes.value.find(
        (cat) => cat.category === currentCategory,
      );
      if (!categoryExists) {
        router.push({
          path: "/catalog",
          query: {
            ...route.query,
            category: productTypes.value[0].category,
            page: "1",
          },
        });
      }
    }
  },
);

const activeCategory = computed(() => route.query.category || "coat");

const selectCategory = (category: string) => {
  router.push({
    path: "/catalog",
    query: {
      ...route.query,
      category,
      page: "1",
    },
  });
};

const sizeGrid = [
  {
    size: "46",
    bust: "92/176",
    bustUnavailable: true,
    waist: "92/182",
    waistUnavailable: true,
    hips: "",
  },
  {
    size: "48",
    bust: "96/176",
    bustUnavailable: true,
    waist: "96/182",
    waistUnavailable: true,
    hips: "",
  },
  {
    size: "50",
    bust: "100/176",
    bustUnavailable: true,
    waist: "100/182",
    hips: "100/188",
    hipsUnavailable: true,
  },
  {
    size: "52",
    bust: "104/176",
    bustUnavailable: true,
    waist: "104/182",
    waistUnavailable: true,
    hips: "104/188",
    hipsUnavailable: true,
  },
  {
    size: "54",
    bust: "108/176",
    bustUnavailable: true,
    waist: "108/182",
    hips: "108/188",
    hipsUnavailable: true,
  },
  {
    size: "56",
    bust: "112/176",
    waist: "112/182",
    hips: "112/188",
  },
  {
    size: "58",
    bust: "116/176",
    waist: "116/182",
    hips: "116/188",
  },
];

const activeSize = ref<string | null>(null);
const activeSizeParam = ref<string | null>(null);
const activeValue = ref<string | null>(null);

const selectSize = (size: string, param: string, value: string) => {
  activeSize.value = size;
  activeSizeParam.value = param;
  activeValue.value = value;
};

const getActiveClass = (size: string, param: string) => {
  return activeSize.value === size && activeSizeParam.value === param
    ? "active"
    : "";
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

onMounted(() => {
  timerInterval = setInterval(() => {
    currentTime.value = Date.now();
  }, 1000);
  // Загружаем категории при монтировании
  fetchCategories();
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

<style scoped>
.size-table {
  overflow-x: auto;
}

.size-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  table-layout: fixed;
}

.size-table td {
  padding: 10px 6px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
  word-break: break-word;
}

.size-table td:first-child {
  width: 50px;
}

.size-table .size-label {
  background-color: #f5f5f5;
  color: #666;
  font-weight: 500;
  border-right: 1px solid #d0d0d0;
}

.size-table td:not(.size-label) {
  color: #ec018c;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.size-table td:not(.size-label):hover {
  background-color: #fff0f6;
}

.size-table td.unavailable {
  color: #ccc;
  text-decoration: line-through;
  cursor: not-allowed;
  background-color: #fafafa;
}

.size-table td.unavailable:hover {
  background-color: #fafafa;
}

.size-table td.active {
  background-color: #fce7f3;
  color: #ec018c;
  font-weight: 600;
}

.size-table td:empty {
  background-color: #fafafa;
  cursor: default;
}
</style>
