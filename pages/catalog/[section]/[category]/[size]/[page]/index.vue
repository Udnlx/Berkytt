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
import { computed, ref, watch } from "vue";
import { useRoute, navigateTo } from "#app";
import { useHead, useRuntimeConfig } from "#app";

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

const config = useRuntimeConfig();
const apiBase = config.public.apiBase || "http://berkytt/api";
// Базовый хост для изображений (без /api)
const apiHost = apiBase.replace("/api", "");

// Для запросов используем относительный путь, чтобы работал прокси через Nuxt
const fetchApiBase = "/api";

// Функция для нормализации данных продукта
const normalizeProduct = (product: any): Product => {
  let image =
    product.image || product.img || product.imageUrl || product.image_url || "";

  if (image && image.startsWith("/")) {
    image = apiHost + image;
  } else if (image && !image.startsWith("http")) {
    image = apiHost + "/images/" + image;
  }

  if (!image) {
    image = "/images/forcards.jpg";
  }

  let hoverImage =
    product.hoverImage || product.hover_image || product.image2 || "";

  if (hoverImage && hoverImage.startsWith("/")) {
    hoverImage = apiHost + hoverImage;
  } else if (hoverImage && !image.startsWith("http")) {
    hoverImage = apiHost + "/images/" + hoverImage;
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

// Реактивные данные
const products = ref<Product[]>([]);
const loading = ref(false);
const totalPages = ref(1);

// Получаем параметры из route.params
const section = computed(() => String(route.params.section || "men"));
const category = computed(() => String(route.params.category || "coat"));
const size = computed(() => String(route.params.size || "all"));
const page = computed(() => String(route.params.page || "1"));

// Если параметры не заданы, перенаправляем на значения по умолчанию
if (!section.value || !category.value) {
  await navigateTo({
    path: "/catalog/men/coat/all/1",
    replace: true,
  });
}

// Функция загрузки товаров
const fetchProducts = async () => {
  loading.value = true;
  try {
    const sizeParam = size.value || "all";
    const pageParam = page.value || "1";
    const url = `${fetchApiBase}/getproducts/${section.value}/${category.value}/${sizeParam}/${pageParam}`;

    console.log("Загрузка товаров:", url);

    const response = await $fetch<ProductsResponse>(url);
    console.log("Ответ API:", response);

    products.value = (response.products || []).map(normalizeProduct);
    totalPages.value = response.totalPage || 1;
    console.log("Товары загружены:", products.value.length);
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
    products.value = [];
    totalPages.value = 1;
  } finally {
    loading.value = false;
  }
};

// Загружаем товары при изменении параметров маршрута
watch(
  () => route.fullPath,
  () => {
    fetchProducts();
  },
  { immediate: true },
);

const handleFilterUpdate = (filters: {
  section?: string;
  category?: string;
}) => {
  const newSection = filters.section || section.value;
  const newCategory = filters.category || category.value;
  navigateTo({
    path: `/catalog/${newSection}/${newCategory}/all/1`,
  });
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
      href: `${siteUrl}/catalog/${section.value}/${category.value}`,
    },
  ],
});
</script>
