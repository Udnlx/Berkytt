<template>
  <div
    v-if="pending"
    class="pt-[80px] min-h-screen flex items-center justify-center"
  >
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ec018c] mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">Загрузка продукта...</p>
    </div>
  </div>
  <div
    v-else-if="error"
    class="pt-[80px] min-h-screen flex items-center justify-center"
  >
    <div class="text-center">
      <p class="text-red-600">Ошибка: {{ error }}</p>
      <a href="/" class="mt-4 inline-block text-[#ec018c] hover:underline"
        >Вернуться на главную</a
      >
    </div>
  </div>
  <div v-else>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen">
      <TitlePageSection :product="mappedProduct" />
      <SingleProductSection :product="mappedProduct" />
      <OptionProductSection :product="mappedProduct" />
      <ReviewProductSection />
      <FormReviewSection />
      <YouLikeItSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useRuntimeConfig } from "#app";

// Интерфейс ответа от API
interface ApiProductData {
  id: number;
  name: string;
  productCategory: string;
  productSection: string;
  title: string;
  price: number;
  fullPrice: number;
  discount: number;
  images: string[];
  video: string[];
  description: string;
  sameModels: { title: string; name: string; color: string }[];
  sizes: {
    scancode: string;
    storage: boolean;
    russianSize: string;
    size: string;
    quantity: number | string;
    price: string;
  }[];
  delivery: string;
  sku: string;
  category: string;
  tag: string;
  about: string;
  specifications: { name: string; value: string | number }[];
}

// Интерфейс для компонентов
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

const route = useRoute();
const config = useRuntimeConfig();
const productSlug = computed(() => route.params.slug as string);

const apiBase = config.public.apiBase || "http://berkytt/api";
const apiHost = "http://berkytt"; // Базовый хост для изображений и видео

const apiUrl = computed(
  () => `${apiBase}/getproductname/${productSlug.value}/`,
);

const {
  data: apiProductData,
  pending,
  error,
} = await useFetch<ApiProductData>(apiUrl, {
  lazy: false,
  server: true,
  default: () => null,
});

// Маппинг данных из API в формат компонентов
const mappedProduct = computed<ProductData | null>(() => {
  if (!apiProductData.value) return null;

  const data = apiProductData.value;

  // Парсим доставку "16 марта - 18 марта"
  const deliveryParts = data.delivery.split(" - ");
  const estimatedDelivery = {
    from: deliveryParts[0] || "",
    to: deliveryParts[1] || "",
  };

  // Создаем thumbnails и full images с полным URL
  const thumbnails = data.images.map((img) => `${apiHost}${img}`);
  const fullImages = data.images.map((img) => `${apiHost}${img}`);

  // Видео с полным URL
  const video =
    data.video && data.video.length > 0
      ? `${apiHost}${data.video[0]}`
      : undefined;

  // Создаем цвета из sameModels + текущий товар
  const colors = [
    { name: "черный", code: "#000000" }, // текущий товар
    ...data.sameModels.map((m) => ({ name: m.color, code: "" })),
  ];

  // Маппинг спецификаций
  const specifications = data.specifications.map((spec) => ({
    name: spec.name,
    value: String(spec.value),
  }));

  // Создаем features из описания (дефолтные)
  const features = [
    {
      icon: "",
      title: "Универсальность",
      description:
        "Универсальное пальто на каждый день и для более формальных образов",
    },
    {
      icon: "",
      title: "Лаконичный крой",
      description:
        "Лаконичный крой: аккуратно подчёркивает силуэт, не сковывает движения",
    },
    {
      icon: "",
      title: "Качественный материал",
      description:
        "Материал хорошо держит форму и выглядит опрятно в течение дня",
    },
    {
      icon: "",
      title: "Комфортная посадка",
      description: "Комфортная посадка по плечам и в зоне талии",
    },
    {
      icon: "",
      title: "Практичность",
      description: "Практичные боковые карманы для мелочей и тепла рук",
    },
  ];

  return {
    name: data.title,
    title: data.title,
    category: data.productCategory,
    description: data.description,
    price: data.price,
    oldPrice: data.fullPrice,
    discount: data.discount,
    rating: 5,
    reviewsCount: 0,
    sku: data.sku,
    tags: [data.tag],
    categories: data.category.split(", ").map((c) => c.trim()),
    images: fullImages,
    thumbnails,
    video,
    colors,
    sizes: data.sizes,
    specifications,
    features,
    deliveryInfo: {
      freeShipping: true,
      freeShippingThreshold: 7500,
      supportHours: "Поддержка с 8:30 до 22:00 каждый день",
      returnDays: 100,
    },
    estimatedDelivery,
  };
});
</script>
