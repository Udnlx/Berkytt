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
import { ref, onMounted } from "vue";

const config = useRuntimeConfig();
const API_BASE = config.public.apiBase as string;
// Базовый хост для изображений (без /api в конце)
const IMAGE_BASE = API_BASE.replace("/api", "");

interface MainPageData {
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
}

const btnFiltersForNew = ref<MainPageData["btnFiltersForNew"]>([]);
const productsForNew = ref<MainPageData["productsForNew"]>([]);
const btnFiltersForBest = ref<MainPageData["btnFiltersForBest"]>([]);
const productsForBest = ref<MainPageData["productsForBest"]>([]);
const commentsForMain = ref<MainPageData["commentsForMain"]>([]);
const ourCollections = ref<MainPageData["ourCollections"]>([]);

onMounted(async () => {
  try {
    const response = await fetch("/api/mainpage");
    const data: MainPageData = await response.json();
    console.log("API Response:", data);

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
</script>
