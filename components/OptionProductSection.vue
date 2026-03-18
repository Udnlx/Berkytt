<template>
  <section class="max-w-[1200px] mx-auto px-5 py-10">
    <!-- Tabs Header -->
    <div class="flex justify-center gap-10 mb-10 border-b border-gray-200">
      <button
        :class="[
          'text-xl font-bold pb-3 cursor-pointer transition-colors duration-300 relative',
          activeTab === 'description'
            ? 'text-[#ec018c]'
            : 'text-gray-400 hover:text-gray-600',
        ]"
        @click="activeTab = 'description'"
      >
        Описание
        <span
          v-if="activeTab === 'description'"
          class="absolute bottom-0 left-0 w-full h-0.5 bg-[#ec018c]"
        ></span>
      </button>
      <button
        :class="[
          'text-xl font-bold pb-3 cursor-pointer transition-colors duration-300 relative',
          activeTab === 'specifications'
            ? 'text-[#ec018c]'
            : 'text-gray-400 hover:text-gray-600',
        ]"
        @click="activeTab = 'specifications'"
      >
        Спецификации
        <span
          v-if="activeTab === 'specifications'"
          class="absolute bottom-0 left-0 w-full h-0.5 bg-[#ec018c]"
        ></span>
      </button>
    </div>

    <!-- Description Tab -->
    <div v-if="activeTab === 'description'" class="tab-content animate-fadeIn">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Description Main -->
        <div>
          <h3 class="text-lg font-semibold text-black mb-4">Описание</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ product?.description || "Описание продукта" }}
          </p>
        </div>

        <!-- Specifications List -->
        <div>
          <h4 class="text-lg font-semibold text-black mb-4">О продукте</h4>
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ product?.aboutProduct || "О продукте" }}
          </p>
        </div>
      </div>

      <!-- Features Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 pt-10 border-t border-gray-200"
      >
        <div class="text-center">
          <div class="flex justify-center items-center mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <h4 class="text-base font-semibold text-black mb-2">
            Быстрая доставка
          </h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            Оперативно доставим ваш заказ в любую точку страны. Надёжная
            упаковка и отслеживание отправки.
          </p>
        </div>

        <div class="text-center">
          <div class="flex justify-center items-center mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h4 class="text-base font-semibold text-black mb-2">
            Натуральные материалы
          </h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            Используем только качественные и экологичные ткани, которые приятны
            к телу и долговечны в носке.
          </p>
        </div>

        <div class="text-center">
          <div class="flex justify-center items-center mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
          <h4 class="text-base font-semibold text-black mb-2">
            Высокое качество
          </h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            Контроль качества на каждом этапе производства. Гарантия на все
            изделия и внимательное отношение к деталям.
          </p>
        </div>

        <div class="text-center">
          <div class="flex justify-center items-center mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 2C6.5 2 2 6.5 2 12c0 4.4 3.6 8 8 8 2.5 0 4.8-1.2 6.3-3"
              ></path>
              <path
                d="M12 22c5.5 0 10-4.5 10-10 0-4.4-3.6-8-8-8-2.5 0-4.8 1.2-6.3 3"
              ></path>
            </svg>
          </div>
          <h4 class="text-base font-semibold text-black mb-2">
            Универсальность
          </h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            Лёгкая сочетаемость с другими вещами гардероба. Подходит для разных
            образов и ситуаций.
          </p>
        </div>
      </div>
    </div>

    <!-- Specifications Tab -->
    <div
      v-if="activeTab === 'specifications'"
      class="tab-content animate-fadeIn"
    >
      <table class="w-full max-w-[800px] mx-auto border-collapse">
        <tbody>
          <tr
            v-for="(spec, index) in product?.specifications ||
            defaultSpecifications"
            :key="index"
            class="odd:bg-[#ffddf1]"
          >
            <th class="py-4 px-5 text-left font-medium text-black rounded">
              {{ spec.name }}
            </th>
            <td class="py-4 px-5 text-left text-gray-600 rounded">
              {{ spec.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface ProductData {
  name: string;
  title: string;
  category: string;
  description: string;
  aboutProduct: string;
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
  colors: { name: string; code: string }[];
  sizes: {
    scancode: string;
    storage: boolean;
    russianSize: string;
    size: string;
    quantity: number | string;
    price: string;
  }[];
  specifications: { name: string; value: string }[];
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

defineProps<{
  product?: ProductData | null;
}>();

const activeTab = ref<"description" | "specifications">("description");

const defaultSpecifications = [
  { name: "Внешняя оболочка", value: "100% полиэстер" },
  { name: "Подкладка", value: "100% полиуретан" },
];
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease;
}
</style>
