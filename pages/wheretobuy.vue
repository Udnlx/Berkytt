<template>
  <div>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen bg-gray-50">
      <UpSimpleSection :title="pageTitle" />

      <!-- Контент страницы -->
      <section class="py-12 bg-white">
        <div class="max-w-[1200px] mx-auto container mx-auto px-4">
          <div v-if="loading" class="text-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ec018c] mx-auto"
            ></div>
            <p class="mt-4 text-gray-600">Загрузка...</p>
          </div>

          <div v-else-if="error" class="text-center py-12 text-red-500">
            {{ error }}
          </div>

          <div v-else class="space-y-12">
            <!-- Города -->
            <div v-for="(city, index) in points" :key="index">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">
                {{ city.title }}
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="(shop, shopIndex) in city.points"
                  :key="shopIndex"
                  class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3
                    class="text-lg font-medium text-gray-800 mb-3"
                    v-html="shop.title"
                  ></h3>
                  <div class="space-y-2 text-sm text-gray-600">
                    <p v-if="shop.address" v-html="shop.address"></p>
                    <a
                      v-if="shop.link"
                      :href="shop.link"
                      target="_blank"
                      class="text-[#ec018c] hover:text-[#d4007c] transition-colors inline-block mt-2"
                    >
                      Посетить сайт →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useHead, useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;
const apiBase = config.public.apiBase;
const apiKey = config.public.apiKey;

interface ShopPoint {
  title: string;
  address?: string;
  link?: string;
}

interface CityPoints {
  title: string;
  points: ShopPoint[];
}

interface WhereToBuyData {
  pageid: number;
  name: string;
  title: string;
  points: CityPoints[];
  metaData?: {
    title?: string;
    description?: string;
    keywords?: string;
    canonicalUrl?: string;
  };
  ogData?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    type?: string;
    locale?: string;
    siteName?: string;
  };
}

const points = ref<CityPoints[]>([]);
const pageTitle = ref("Где купить?");
const loading = ref(true);
const error = ref<string | null>(null);

// Функция для декодирования HTML-сущностей
const decodeHtml = (html: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const seoData = ref({
  title: "Где купить?",
  description:
    "Партнеры и магазины в которых можно приобрести верхнюю одежду торговой марки Berkytt.",
  keywords:
    "интернет-магазин, Berkytt, верхняя одежда, ПЛАЩИ, ПАЛЬТО, ПОЛУПАЛЬТО, пиджаки, куртки, брюки",
  canonicalUrl: "",
  ogTitle: "Где купить?",
  ogDescription:
    "Партнеры и магазины в которых можно приобрести верхнюю одежду торговой марки Berkytt.",
  ogImage: "",
});

onMounted(async () => {
  try {
    const url = `${apiBase}/wheretobuy`;
    console.log("Запрос к API:", url);

    const response = await fetch(url, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });

    console.log("Status:", response.status);
    console.log("OK:", response.ok);

    const data: WhereToBuyData = await response.json();
    console.log("API Response wheretobuy:", data);

    points.value = data.points || [];
    pageTitle.value = data.title || "Где купить?";

    // Обновляем SEO данные из API
    if (data.metaData) {
      seoData.value = {
        title: data.metaData.title || seoData.value.title,
        description: data.metaData.description || seoData.value.description,
        keywords: data.metaData.keywords || seoData.value.keywords,
        canonicalUrl: data.metaData.canonicalUrl || seoData.value.canonicalUrl,
        ogTitle: data.ogData?.title || seoData.value.ogTitle,
        ogDescription: data.ogData?.description || seoData.value.ogDescription,
        ogImage: data.ogData?.image || seoData.value.ogImage,
      };
    }

    if (data.ogData) {
      seoData.value.ogTitle = data.ogData.title || seoData.value.ogTitle;
      seoData.value.ogDescription =
        data.ogData.description || seoData.value.ogDescription;
      seoData.value.ogImage = data.ogData.image || seoData.value.ogImage;
    }
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    error.value = "Не удалось загрузить данные: " + e;
  } finally {
    loading.value = false;
  }
});

// SEO теги для страницы
useHead(() => ({
  title: seoData.value.title
    ? `${seoData.value.title} — BERKYTT`
    : "Где купить — BERKYTT",
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
      content: seoData.value.ogTitle,
    },
    {
      property: "og:description",
      content: seoData.value.ogDescription,
    },
    {
      property: "og:image",
      content: seoData.value.ogImage,
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
      href: seoData.value.canonicalUrl || `${siteUrl}/wheretobuy`,
    },
  ],
}));
</script>
