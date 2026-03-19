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
    v-else-if="error || !mappedProduct"
    class="pt-[80px] min-h-screen flex items-center justify-center"
  >
    <div class="text-center max-w-md mx-auto px-4">
      <!-- Иконка ошибки -->
      <div class="mb-6">
        <svg
          class="w-24 h-24 mx-auto text-[#ec018c] opacity-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>

      <!-- Заголовок -->
      <h1 class="text-3xl font-semibold text-gray-900 mb-3">Товар не найден</h1>

      <!-- Описание -->
      <p class="text-gray-600 mb-8">
        К сожалению, товар с таким артикулом не существует или был удален из
        каталога.
      </p>

      <!-- Кнопка -->
      <a
        href="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-[#ec018c] text-white font-medium rounded hover:bg-[#d4007c] transition"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Вернуться на главную
      </a>

      <!-- Дополнительные ссылки -->
      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-sm text-gray-500 mb-4">
          Или посмотрите другие категории:
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <a
            href="/category/for-men"
            class="text-sm text-[#ec018c] hover:underline"
          >
            Для мужчин
          </a>
          <span class="text-gray-300">•</span>
          <a
            href="/category/for-women"
            class="text-sm text-[#ec018c] hover:underline"
          >
            Для женщин
          </a>
          <span class="text-gray-300">•</span>
          <a
            href="/category/new"
            class="text-sm text-[#ec018c] hover:underline"
          >
            Новинки
          </a>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen">
      <TitlePageSection :product="mappedProduct" />
      <SingleProductSection :product="mappedProduct" />
      <OptionProductSection :product="mappedProduct" />
      <ReviewProductSection :comments="mappedProduct.comments" />
      <FormReviewSection />
      <YouLikeItSection :products="mappedProduct.likeit" />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useRuntimeConfig, useHead } from "#app";

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
  aboutProduct: string;
  specifications: { name: string; value: string | number }[];
  totalComments: number;
  comments: {
    id: number;
    title: string;
    text: string;
    author: string;
    date: string;
  }[];
  likeit: {
    id: number;
    name: string;
    title: string;
    image: string;
    hoverImage: string;
    price: number;
    fullPrice: number;
    discount: number;
    badge?: string;
    badgeType?: "sale" | "new" | "top";
    endDate?: string;
  }[];
}

// Интерфейс для компонентов
interface ProductData {
  name: string;
  title: string;
  category: string;
  productSection: string;
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
  slug?: string;
  comments: {
    id: number;
    title: string;
    text: string;
    author: string;
    date: string;
  }[];
  likeit: {
    id: number;
    name: string;
    title: string;
    image: string;
    hoverImage: string;
    price: number;
    fullPrice: number;
    discount: number;
    badge?: string;
    badgeType?: "sale" | "new" | "top";
    endDate?: string;
  }[];
}

const route = useRoute();
const config = useRuntimeConfig();
const productSlug = computed(() => route.params.slug as string);

const apiBase = config.public.apiBase || "http://berkytt/api";
const apiHost = apiBase.replace("/api", ""); // Базовый хост для изображений и видео
const siteUrl = "http://localhost:3000"; // URL сайта для canonical

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

  // Находим цвет текущего товара из спецификации
  const currentColorSpec = data.specifications.find(
    (spec) => spec.name === "Цвет",
  );
  const currentColor = currentColorSpec
    ? String(currentColorSpec.value)
    : "черный";

  // Создаем цвета из sameModels + текущий товар
  const colors = [
    { name: currentColor, code: "", slug: productSlug.value }, // текущий товар
    ...data.sameModels.map((m) => ({ name: m.color, code: "", slug: m.name })),
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
    productSection: data.productSection,
    description: data.description,
    aboutProduct: data.aboutProduct || "",
    price: data.price,
    oldPrice: data.fullPrice,
    discount: data.discount,
    rating: 5,
    reviewsCount: data.totalComments || 0,
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
    slug: productSlug.value,
    comments: data.comments || [],
    likeit: (data.likeit || []).map((item) => ({
      ...item,
      image: `${apiHost}${item.image}`,
      hoverImage: `${apiHost}${item.hoverImage}`,
    })),
  };
});

// Динамические SEO теги
useHead(() => ({
  title: mappedProduct.value?.title
    ? `${mappedProduct.value.title} — BERKYTT`
    : "Товар не найден — BERKYTT",
  meta: [
    {
      name: "description",
      content: mappedProduct.value?.description || "",
    },
    {
      property: "og:type",
      content: "product",
    },
    {
      property: "og:title",
      content: mappedProduct.value?.title || "",
    },
    {
      property: "og:description",
      content: mappedProduct.value?.description || "",
    },
    {
      property: "og:image",
      content: mappedProduct.value?.images?.[0] || "",
    },
    {
      property: "product:price:amount",
      content: mappedProduct.value?.price?.toString() || "",
    },
    {
      property: "product:price:currency",
      content: "RUB",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteUrl}/product/${productSlug.value}`,
    },
  ],
}));
</script>
