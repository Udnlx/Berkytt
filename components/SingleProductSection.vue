<template>
  <section class="bg-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Галерея изображений -->
        <div class="relative">
          <!-- Основное изображение или видео -->
          <div
            class="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
          >
            <video
              v-if="currentMediaType === 'video' && product?.video"
              :src="product.video"
              controls
              class="w-full h-auto object-contain"
            ></video>
            <img
              v-else
              :src="currentMedia"
              :alt="product?.name || 'Product image'"
              class="w-full h-auto object-contain"
            />
          </div>
          <!-- Миниатюры поверх изображения (слева) -->
          <div class="absolute left-3 top-3 bottom-3 flex flex-col gap-3">
            <!-- Миниатюры изображений -->
            <div
              v-for="(thumb, index) in product?.thumbnails || thumbnails"
              :key="index"
              class="w-12 h-30 sm:w-20 sm:h-30 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#ec018c] transition flex items-center justify-center flex-shrink-0"
              :class="{ 'ring-2 ring-black': currentIndex === index }"
              @click="selectImage(index)"
            >
              <img
                :src="thumb"
                :alt="`Thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Миниатюра видео (последняя) -->
            <div
              v-if="product?.video"
              class="w-12 h-30 sm:w-20 sm:h-30 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#ec018c] transition flex items-center justify-center flex-shrink-0 relative"
              :class="{
                'ring-2 ring-black':
                  currentIndex ===
                  (product?.thumbnails?.length || thumbnails.length),
              }"
              @click="selectVideo"
            >
              <video
                :src="product.video"
                class="w-full h-full object-cover"
              ></video>
              <div
                class="absolute inset-0 flex items-center justify-center bg-black/30"
              >
                <div
                  class="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-[#ec018c] ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Информация о продукте -->
        <div class="space-y-6">
          <!-- Заголовок и избранное -->
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 uppercase tracking-wide">
                {{ (product?.tags && product.tags[0]) || "ПРОДУКТ" }}
              </p>
              <h1 class="text-2xl font-semibold mt-1">
                {{ product?.name || "Название продукта" }}
              </h1>
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
              <img
                v-for="i in 5"
                :key="i"
                src="/images/star.svg"
                alt="Rating Star"
                class="w-5 h-5 fill-current"
              />
            </div>
            <span class="text-sm text-gray-500"
              >({{ product?.reviewsCount || 1234 }} reviews)</span
            >
          </div>

          <!-- Цена -->
          <div class="flex items-center gap-3">
            <span class="text-2xl font-medium"
              >₽{{ formatPrice(product?.price) }}</span
            >
            <span
              v-if="product?.oldPrice"
              class="text-lg text-gray-400 line-through"
              >₽{{ formatPrice(product.oldPrice) }}</span
            >
            <span
              v-if="product?.discount"
              class="bg-[#ec018c] text-white text-sm px-2 py-1 rounded-full font-medium"
              >-{{ product.discount }}%</span
            >
          </div>

          <!-- Описание -->
          <p class="text-gray-600 leading-relaxed">
            {{ product?.description || "Описание продукта" }}
          </p>

          <hr class="border-gray-100" />

          <!-- Цвета -->
          <div v-if="product?.colors && product.colors.length > 0">
            <p class="text-sm font-medium mb-3">Цвета:</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="item in product.colors"
                :key="item.code + item.name"
                class="px-4 py-2 border-2 rounded transition text-sm"
                :class="
                  selectedColorName === item.name
                    ? 'border-[#ec018c] bg-[#ec018c] text-white'
                    : 'border-gray-200 hover:border-gray-400 text-gray-700'
                "
                @click="selectColor(item.name, item.slug)"
              >
                {{ item.name }}
              </button>
            </div>
          </div>

          <!-- Размер -->
          <div v-if="product?.sizes && product.sizes.length > 0">
            <div class="flex justify-between items-center mb-3">
              <p class="text-sm font-medium">Размер:</p>
              <a href="#" class="text-sm text-black underline">О размерах</a>
            </div>
            <div class="size-table">
              <table>
                <tbody>
                  <tr v-for="row in sizeGrid" :key="row.russianSize">
                    <td class="size-label">{{ row.russianSize }}</td>
                    <td
                      v-for="(cell, index) in row.cells"
                      :key="index"
                      @click="
                        !cell.unavailable &&
                        selectSize(row.russianSize, cell.size)
                      "
                      :class="[
                        getActiveClass(row.russianSize, cell.size),
                        { unavailable: cell.unavailable },
                      ]"
                      :title="
                        cell.unavailable ? '' : `Количество: ${cell.quantity}`
                      "
                    >
                      {{ cell.size }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Количество и кнопки -->
          <div class="space-y-3">
            <div class="flex flex-col sm:flex-row gap-4">
              <p class="text-sm font-medium self-center">Колличество:</p>
              <div
                class="flex border-2 border-gray-300 rounded max-[640px]:mx-auto max-[640px]:w-fit"
              >
                <button
                  class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                  @click="decrementQuantity"
                >
                  −
                </button>
                <span
                  class="w-10 h-10 flex items-center justify-center border-x border-gray-300"
                >
                  {{ quantity }}
                </span>
                <button
                  class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                  @click="incrementQuantity"
                >
                  +
                </button>
              </div>
              <button
                class="flex-1 py-3 border border-black rounded text-sm font-medium hover:bg-[#ec018c] hover:text-white transition"
              >
                ДОБАВИТЬ В КОРЗИНУ
              </button>
            </div>
            <button
              class="w-full py-3 bg-black text-white text-sm font-medium rounded hover:bg-[#ec018c] hover:text-white transition"
            >
              КУПИТЬ В ОДИН КЛИК
            </button>
          </div>

          <!-- Дополнительная информация -->
          <div class="space-y-3 text-sm">
            <div class="flex gap-4">
              <a
                href="#"
                class="flex items-center gap-1 text-gray-700 hover:underline"
              >
                <img
                  src="/images/check.svg"
                  alt="Rating Star"
                  class="w-5 h-5 fill-current"
                />
                При доставке и возврате
              </a>
              <a
                href="#"
                class="flex items-center gap-1 text-gray-700 hover:underline"
              >
                <img
                  src="/images/info.svg"
                  alt="Rating Star"
                  class="w-5 h-5 fill-current"
                />
                Задать вопрос
              </a>
            </div>
            <p
              v-if="product?.estimatedDelivery"
              class="flex items-center gap-1 text-gray-600"
            >
              <img
                src="/images/calendar.svg"
                alt="Rating Star"
                class="w-5 h-5 fill-current"
              />
              <span>Предполагаемая доставка:</span>
              <span class="text-gray-500"
                >{{ product.estimatedDelivery.from }} -
                {{ product.estimatedDelivery.to }}</span
              >
            </p>
          </div>

          <!-- SKU и категории -->
          <div class="text-sm space-y-2 text-gray-600">
            <p>
              <span class="font-medium">SKU:</span> {{ product?.sku || "N/A" }}
            </p>
            <p>
              <span class="font-medium">Категории:</span>
              {{ product?.categories?.join(", ") || "N/A" }}
            </p>
            <p>
              <span class="font-medium">Тэг:</span>
              {{ product?.tags?.join(", ") || "N/A" }}
            </p>
          </div>

          <!-- Get It Today -->
          <div class="pt-4 border-t border-gray-100">
            <h3 class="text-lg font-medium mb-4">Получите это сегодня</h3>
            <div class="space-y-4">
              <div
                v-if="product?.deliveryInfo?.freeShipping"
                class="flex gap-3"
              >
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
                  <p class="font-medium text-sm">Бесплатная доставка</p>
                  <p class="text-sm text-gray-500">
                    Бесплатная доставка для заказов от ₽{{
                      product.deliveryInfo.freeShippingThreshold
                    }}.
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
                  <p class="font-medium text-sm">Поддержка каждый день</p>
                  <p class="text-sm text-gray-500">
                    {{
                      product?.deliveryInfo?.supportHours ||
                      "Поддержка с 8:30 до 22:00 каждый день"
                    }}
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
                  <p class="font-medium text-sm">
                    Возврат в течение
                    {{ product?.deliveryInfo?.returnDays || 100 }} дней
                  </p>
                  <p class="text-sm text-gray-500">
                    Не понравилось? Вернём деньги. У вас есть
                    {{ product?.deliveryInfo?.returnDays || 100 }} дней.
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
import { useRouter } from "vue-router";

interface ProductData {
  name: string;
  title: string;
  category: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  sku: string;
  tags: string[];
  categories: string[];
  images: string[];
  thumbnails: string[];
  video?: string;
  colors: { name: string; code: string; slug?: string }[];
  sizes: {
    scancode: string;
    storage: boolean;
    russianSize: string;
    size: string;
    quantity: number | string;
    price: string;
  }[];
  specifications: { name: string; value: string }[];
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  deliveryInfo: {
    freeShipping: boolean;
    freeShippingThreshold: number;
    supportHours: string;
    returnDays: number;
  };
  estimatedDelivery: {
    from: string;
    to: string;
  };
}

const props = defineProps<{
  product?: (ProductData & { slug?: string }) | null;
}>();

const productSlug = computed(() => props.product?.slug || "");

// Видео для галереи
const video = ref("/images/video.mp4");

// Миниатюры изображений (дефолтные)
const thumbnails = ref([
  "/images/forcards.jpg?w=200",
  "/images/forcardshover.jpg?w=200",
]);

// Индекс текущего изображения (-1 для видео, которое в конце)
const currentIndex = ref(0);

// Тип текущего медиа (video или image)
const currentMediaType = ref<"video" | "image">("image");

// Текущее медиа (вычисляемое)
const currentMedia = computed(() => {
  if (currentMediaType.value === "video") {
    return props.product?.video || video.value;
  }
  return (
    (props.product?.images && props.product.images[currentIndex.value]) ||
    thumbnails.value[currentIndex.value] ||
    "/images/forcards.jpg?w=800"
  );
});

// Выбор видео
const selectVideo = () => {
  currentMediaType.value = "video";
  currentIndex.value =
    props.product?.thumbnails?.length || thumbnails.value.length;
};

// Выбор изображения по индексу
const selectImage = (index: number) => {
  currentMediaType.value = "image";
  currentIndex.value = index;
};

// Выбранный цвет - по умолчанию первый цвет (черный для текущего товара)
const selectedColorName = ref("черный");

// Выбор цвета с переходом на страницу товара
const router = useRouter();

const selectColor = (color: string, slug?: string) => {
  if (slug && slug !== productSlug.value) {
    // Переход на другую страницу товара
    router.push(`/product/${slug}`);
  } else {
    // Оставляем текущий цвет
    selectedColorName.value = color;
  }
};

// Массив размеров с сервера
const sizesData = computed(() => {
  return props.product?.sizes || [];
});

// Размерная сетка - группируем по russianSize и сортируем
const sizeGrid = computed(() => {
  const grouped = sizesData.value.reduce(
    (acc, item) => {
      if (!acc[item.russianSize]) {
        acc[item.russianSize] = [];
      }
      acc[item.russianSize]!.push({
        size: item.size,
        quantity: item.quantity,
        unavailable: item.quantity === "" || item.quantity === 0,
      });
      return acc;
    },
    {} as Record<
      string,
      { size: string; quantity: number | string; unavailable: boolean }[]
    >,
  );

  // Сортируем russianSize по возрастанию
  const sortedSizes = Object.keys(grouped).sort(
    (a, b) => Number(a) - Number(b),
  );

  // Преобразуем в массив строк таблицы
  const result = [];
  for (const russianSize of sortedSizes) {
    // Сортируем размеры внутри группы
    grouped[russianSize]!.sort((a, b) => a.size.localeCompare(b.size));
    result.push({
      russianSize,
      cells: grouped[russianSize],
    });
  }
  return result;
});

// Выбранный размер
const selectedSize = ref<string | null>(null);
const selectedSizeValue = ref<string | null>(null);

// Выбор размера
const selectSize = (russianSize: string, size: string) => {
  selectedSize.value = russianSize;
  selectedSizeValue.value = size;
};

// Получить класс для активной ячейки
const getActiveClass = (russianSize: string, size: string) => {
  return selectedSize.value === russianSize && selectedSizeValue.value === size
    ? "active"
    : "";
};

// Количество
const quantity = ref(1);

// Увеличить количество
const incrementQuantity = () => {
  quantity.value++;
};

// Уменьшить количество
const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

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
