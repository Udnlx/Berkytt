<template>
  <div>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen">
      <UpNavigationSection />
      <ProductsSection
        :products="products"
        :loading="loading"
        :total-pages="totalPages"
        @update:filters="handleFilterUpdate"
      />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHead, navigateTo } from "#app";

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

interface ProductsResponse {
  products: Product[];
  totalPage?: number;
}

// Функция для нормализации данных продукта
const normalizeProduct = (product: any): Product => {
  const API_BASE = "http://berkytt";

  // Получаем изображение
  let image =
    product.image || product.img || product.imageUrl || product.image_url || "";

  // Если путь относительный (начинается с /), добавляем базовый URL API
  if (image && image.startsWith("/")) {
    image = API_BASE + image;
  } else if (image && !image.startsWith("http")) {
    image = API_BASE + "/images/" + image;
  }

  if (!image) {
    image = "/images/forcards.jpg";
  }

  // Получаем hover-изображение
  let hoverImage =
    product.hoverImage || product.hover_image || product.image2 || "";

  if (hoverImage && hoverImage.startsWith("/")) {
    hoverImage = API_BASE + hoverImage;
  } else if (hoverImage && !hoverImage.startsWith("http")) {
    hoverImage = API_BASE + "/images/" + hoverImage;
  }

  return {
    id: product.id,
    name: product.name || "",
    title: product.title || "",
    price: product.price || 0,
    oldPrice: product.fullPrice,
    discount: product.discount,
    badge: product.badge,
    badgeType: product.badgeType,
    image: image,
    hoverImage: hoverImage || undefined,
    colors: product.colors,
    category: product.category,
    endDate: product.endDate,
  };
};

const route = useRoute();

// Создаём реактивный ключ для useFetch — при изменении query запрос обновится автоматически
const queryKey = computed(() => JSON.stringify(route.query));

const { data, pending } = await useFetch<ProductsResponse>(
  () => {
    const params = route.query;
    const queryString = new URLSearchParams(
      params as Record<string, string>,
    ).toString();
    return `http://berkytt/api/getproducts/?${queryString}`;
  },
  {
    key: () => queryKey.value,
    default: () => ({ products: [], totalPage: 1 }),
  },
);

const products = computed<Product[]>(() => {
  return (data.value?.products || []).map(normalizeProduct);
});

const loading = computed(() => pending.value);

const totalPages = computed(() => data.value?.totalPage || 1);

const handleFilterUpdate = (filters: {
  section?: string;
  category?: string;
}) => {
  const query = { ...route.query, ...filters, page: "1" };
  navigateTo({ path: "/catalog", query });
};

// SEO-метатеги для страницы каталога
const siteUrl = "http://localhost:3000";

useHead({
  title: "Каталог товаров — BERKYTT",
  meta: [
    {
      name: "description",
      content:
        "Широкий ассортимент товаров в интернет-магазине BERKYTT. Одежда и аксессуары по доступным ценам.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Каталог товаров — BERKYTT",
    },
    {
      property: "og:description",
      content:
        "Широкий ассортимент товаров в интернет-магазине BERKYTT. Одежда и аксессуары по доступным ценам.",
    },
    {
      property: "og:image",
      content: "/images/forcards.jpg",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteUrl}/catalog`,
    },
  ],
});
</script>
