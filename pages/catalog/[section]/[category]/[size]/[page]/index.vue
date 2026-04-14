<template>
  <div>
    <HeaderSection />
    <main class="min-h-screen">
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
import { useRoute, navigateTo, useHead, useRuntimeConfig } from "#app";

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
  image: string;
  hoverImage?: string;
  price: number;
  fullPrice: number;
  discount: number;
  badge?: Badge[];
  badgeType?: string;
  endDate?: string;
  category?: string;
  sameModels?: SameModel[];
}

interface ProductsResponse {
  products: Product[];
  totalPage?: number;
}

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const apiKey = config.public.apiKey;
// Базовый хост для изображений (без /api)
const apiHost = config.public.domain;

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
    image: image,
    hoverImage: hoverImage || undefined,
    price: product.price || 0,
    fullPrice: product.fullPrice || product.price || 0,
    discount: product.discount || 0,
    badge: product.badge,
    badgeType: product.badgeType,
    category: product.category,
    endDate: product.endDate,
    sameModels: (product.sameModels || []).map((m: any) => ({
      id: m.id,
      title: m.title || "",
      image:
        m.image && m.image.startsWith("/") ? apiHost + m.image : m.image || "",
    })),
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
    const url = `${apiBase}/getproducts/${section.value}/${category.value}/${sizeParam}/${pageParam}`;

    const response = await $fetch<ProductsResponse>(url, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });

    products.value = (response.products || []).map(normalizeProduct);
    totalPages.value = response.totalPage || 1;
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
  async () => {
    // При смене секции проверяем, существует ли категория в новой секции
    const currentSection = section.value;
    const currentCategory = category.value;

    try {
      const categoriesResponse = await $fetch<any>(
        `${apiBase}/getcategories/${currentSection}/`,
        {
          headers: { "X-API-KEY": apiKey },
        },
      );

      const categories = Array.isArray(categoriesResponse)
        ? categoriesResponse
        : categoriesResponse.categories || [];

      const availableCategories = categories.map(
        (c: any) => c.name || c.slug || String(c.id),
      );

      if (
        currentCategory &&
        !availableCategories.includes(currentCategory) &&
        categories.length > 0
      ) {
        // Категория не существует в этой секции — переключаемся на первую
        const firstCategory =
          categories[0].name || categories[0].slug || String(categories[0].id);
        await navigateTo(`/catalog/${currentSection}/${firstCategory}/all/1`, {
          replace: true,
        });
        return;
      }
    } catch (e) {
      console.error("Ошибка проверки категорий:", e);
    }

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

// SEO данные в зависимости от раздела
const seoData = computed(() => {
  const sectionVal = section.value;

  const seoConfig = {
    men: {
      title: "Мужская верхняя одежда",
      description:
        "Мужская верхняя одежда от BERKYTT. Пальто, полупальто, плащи и куртки по доступным ценам. Широкий ассортимент и качественные материалы.",
      keywords:
        "мужская верхняя одежда, мужское пальто, мужские плащи, мужские куртки, BERKYTT",
    },
    women: {
      title: "Женская верхняя одежда",
      description:
        "Женская верхняя одежда от BERKYTT. Пальто, полупальто, плащи и куртки по доступным ценам. Стильные модели и качественная посадка.",
      keywords:
        "женская верхняя одежда, женское пальто, женские плащи, женские куртки, BERKYTT",
    },
  };

  return seoConfig[sectionVal as keyof typeof seoConfig] || seoConfig.men;
});

// SEO-метатеги для страницы каталога
const siteUrl = config.public.siteUrl;

useHead(() => ({
  title: `${seoData.value.title} — BERKYTT`,
  meta: [
    {
      name: "description",
      content: seoData.value.description,
    },
    {
      name: "keywords",
      content: seoData.value.keywords,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: `${seoData.value.title} — BERKYTT`,
    },
    {
      property: "og:description",
      content: seoData.value.description,
    },
    {
      property: "og:image",
      content: "/images/logo.jpg",
    },
    {
      property: "og:locale",
      content: "ru_RU",
    },
    {
      property: "og:site_name",
      content: "BERKYTT",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteUrl}/catalog/${section.value}/coat/all/1`,
    },
  ],
}));
</script>
