<template>
  <div>
    <HeaderSection />
    <main>
      <HeroSection />
      <WhatsNewSection :filters="btnFiltersForNew" :products="productsForNew" />
      <ExploreCollectionsSection :collections="ourCollections" />
      <BestSellersSection
        :filters="btnFiltersForBest"
        :products="productsForBest"
      />
      <ShopNowSection />
      <AboutUsSection />
      <CommentsSection :comments="commentsForMain" />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useHead, useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase as string;
const apiKey = config.public.apiKey as string;
const siteUrl = config.public.siteUrl;
// Базовый хост для изображений (без /api в конце)
const IMAGE_BASE = config.public.domain as string;

interface MainPageData {
  idMianPage: number;
  btnFiltersForNew: string[];
  productsForNew: Array<{
    id: number;
    name: string;
    title: string;
    image: string;
    hoverImage?: string;
    price: number;
    fullPrice: number;
    discount: number;
    badge?: string;
    badgeType?: string;
    endDate?: string;
  }>;
  btnFiltersForBest: string[];
  productsForBest: Array<{
    id: number;
    name: string;
    title: string;
    image: string;
    hoverImage?: string;
    price: number;
    fullPrice: number;
    discount: number;
    badge?: string;
    badgeType?: string;
    endDate?: string;
  }>;
  commentsForMain: Array<{
    id: number;
    title: string;
    text: string;
    author: string;
    date: string;
  }>;
  ourCollections: Array<{
    id: number;
    name: string;
    title: string;
    image: string;
    link: string;
  }>;
  metaData: {
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
  };
  ogData: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    type: string;
    locale: string;
    siteName: string;
  };
}

const mainPageData = ref<MainPageData | null>(null);
const btnFiltersForNew = ref<MainPageData["btnFiltersForNew"]>([]);
const productsForNew = ref<MainPageData["productsForNew"]>([]);
const btnFiltersForBest = ref<MainPageData["btnFiltersForBest"]>([]);
const productsForBest = ref<MainPageData["productsForBest"]>([]);
const commentsForMain = ref<MainPageData["commentsForMain"]>([]);
const ourCollections = ref<MainPageData["ourCollections"]>([]);

onMounted(async () => {
  try {
    const response = await fetch(`${apiBase}/mainpage`, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });
    const data: MainPageData = await response.json();
    console.log("API Response:", data);

    mainPageData.value = data;

    btnFiltersForNew.value = data.btnFiltersForNew || [];
    // Добавляем базовый URL к изображениям для NewProducts
    productsForNew.value = (data.productsForNew || []).map((product) => ({
      ...product,
      image: product.image?.startsWith("http")
        ? product.image
        : `${IMAGE_BASE}${product.image}`,
      hoverImage: product.hoverImage?.startsWith("http")
        ? product.hoverImage
        : product.hoverImage
          ? `${IMAGE_BASE}${product.hoverImage}`
          : undefined,
    }));

    // Добавляем базовый URL к изображениям для OurCollections
    ourCollections.value = (data.ourCollections || []).map((collection) => {
      const imagePath = collection.image.endsWith("/")
        ? `${collection.image}1.jpg`
        : collection.image;
      return {
        ...collection,
        image: imagePath.startsWith("http")
          ? imagePath
          : `${IMAGE_BASE}${imagePath}`,
      };
    });

    // Добавляем базовый URL к изображениям для BestSellers
    btnFiltersForBest.value = data.btnFiltersForBest || [];
    productsForBest.value = (data.productsForBest || []).map((product) => ({
      ...product,
      image: product.image?.startsWith("http")
        ? product.image
        : `${IMAGE_BASE}${product.image}`,
      hoverImage: product.hoverImage?.startsWith("http")
        ? product.hoverImage
        : product.hoverImage
          ? `${IMAGE_BASE}${product.hoverImage}`
          : undefined,
    }));

    // Загружаем комментарии
    commentsForMain.value = data.commentsForMain || [];

    console.log("btnFiltersForNew:", btnFiltersForNew.value);
    console.log("productsForNew:", productsForNew.value);
    console.log("btnFiltersForBest:", btnFiltersForBest.value);
    console.log("productsForBest:", productsForBest.value);
    console.log("commentsForMain:", commentsForMain.value);
    console.log("ourCollections:", ourCollections.value);
  } catch (error) {
    console.error("Failed to fetch mainpage data:", error);
  }
});

// Динамические SEO теги на основе metaData и ogData из API
useHead(() => {
  const metaData = mainPageData.value?.metaData;
  const ogData = mainPageData.value?.ogData;

  return {
    title: metaData?.title
      ? `${metaData.title}`
      : "Berkytt — Интернет-магазин верхней одежды",
    meta: [
      {
        name: "description",
        content: metaData?.description || "",
      },
      {
        name: "keywords",
        content: metaData?.keywords || "",
      },
      {
        property: "og:type",
        content: ogData?.type || "website",
      },
      {
        property: "og:title",
        content: ogData?.title || metaData?.title || "",
      },
      {
        property: "og:description",
        content: ogData?.description || metaData?.description || "",
      },
      {
        property: "og:image",
        content: ogData?.image || "",
      },
      {
        property: "og:image:alt",
        content: ogData?.imageAlt || "",
      },
      {
        property: "og:locale",
        content: ogData?.locale || "ru_RU",
      },
      {
        property: "og:site_name",
        content: ogData?.siteName || "BERKYTT",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: metaData?.canonicalUrl || siteUrl,
      },
    ],
  };
});
</script>
