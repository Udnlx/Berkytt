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
              <img
                v-for="i in 5"
                :key="i"
                src="/images/star.svg"
                alt="Rating Star"
                class="w-5 h-5 fill-current"
              />
            </div>
            <span class="text-sm text-gray-500">(1234 reviews)</span>
          </div>

          <!-- Цена -->
          <div class="flex items-center gap-3">
            <span class="text-2xl font-medium">₽24.00</span>
            <span class="text-lg text-gray-400 line-through">₽32.00</span>
            <span
              class="bg-[#ec018c] text-white text-sm px-2 py-1 rounded-full font-medium"
              >-25%</span
            >
          </div>

          <!-- Описание -->
          <p class="text-gray-600 leading-relaxed">
            Женское пальто, которое легко впишется в любой гардероб и будет
            уместно и в городе, и в поездках. Лаконичный крой подчёркивает
            силуэт, а продуманные детали делают образ собранным и элегантным.
            Пальто хорошо держит форму, комфортно садится по фигуре и подходит
            как для деловых комплектов, так и для повседневных. Практичные
            карманы, аккуратная линия плеч и универсальная длина позволяют
            сочетать его с джинсами, платьями и классическими брюками. Добавьте
            шарф и ботильоны — и получите готовый стильный образ на прохладный
            сезон.
          </p>

          <hr class="border-gray-100" />

          <!-- Цвета -->
          <div>
            <p class="text-sm font-medium mb-3">Цвета:</p>
            <div class="flex gap-3">
              <button
                v-for="color in colors"
                :key="color"
                class="w-10 h-10 rounded-full border-2 transition"
                :class="
                  selectedColor === color
                    ? 'border-black'
                    : 'border-gray-200 hover:border-gray-400'
                "
                :style="{ backgroundColor: color }"
                @click="selectColor(color)"
              ></button>
            </div>
          </div>

          <!-- Размер -->
          <div>
            <div class="flex justify-between items-center mb-3">
              <p class="text-sm font-medium">Размер:</p>
              <a href="#" class="text-sm text-black underline">О размерах</a>
            </div>
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
            <p class="flex items-center gap-1 text-gray-600">
              <img
                src="/images/calendar.svg"
                alt="Rating Star"
                class="w-5 h-5 fill-current"
              />
              <span>Предполагаемая доставка:</span>
              <span class="text-gray-500">14 января - 18 января</span>
            </p>
          </div>

          <!-- SKU и категории -->
          <div class="text-sm space-y-2 text-gray-600">
            <p><span class="font-medium">SKU:</span> 53453412</p>
            <p><span class="font-medium">Категории:</span> пальто, женское</p>
            <p><span class="font-medium">Тэг:</span> ПАЛЬТО</p>
          </div>

          <!-- Get It Today -->
          <div class="pt-4 border-t border-gray-100">
            <h3 class="text-lg font-medium mb-4">Получите это сегодня</h3>
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
                  <p class="font-medium text-sm">Бесплатная доставка</p>
                  <p class="text-sm text-gray-500">
                    Бесплатная доставка для заказов от ₽7500.00.
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
                    Поддержка с 8:30 до 22:00 каждый день
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
                  <p class="font-medium text-sm">Возврат в течение 100 дней</p>
                  <p class="text-sm text-gray-500">
                    Не понравилось? Вернём деньги. У вас есть 100 дней.
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

// Выбранный цвет
const selectedColor = ref("#FFB6C1");

// Доступные цвета (hex коды)
const colors = ref(["#FFB6C1", "#F5F5DC", "#87CEEB"]);

// Выбор цвета
const selectColor = (color: string) => {
  selectedColor.value = color;
};

// Размерная сетка
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
    waistUnavailable: true,
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

// Выбранный размер и параметр
const selectedSize = ref<string | null>(null);
const selectedSizeParam = ref<string | null>(null);
const selectedSizeValue = ref<string | null>(null);

// Выбор размера
const selectSize = (size: string, param: string, value: string) => {
  selectedSize.value = size;
  selectedSizeParam.value = param;
  selectedSizeValue.value = value;
};

// Получить класс для активной ячейки
const getActiveClass = (size: string, param: string) => {
  return selectedSize.value === size && selectedSizeParam.value === param
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
