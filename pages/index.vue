<template>
  <div>
    <HeaderSection />
    <main>
      <HeroSection />
      <WhatsNewSection :filters="btnFiltersForNew" :products="productsForNew" />
      <ExploreCollectionsSection :collections="ourCollections" />
      <BestSellersSection />
      <ShopNowSection />
      <AboutUsSection />
      <CommentsSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const API_BASE = "http://berkytt";

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
  ourCollections: Array<{
    id: number;
    name: string;
    title: string;
    image: string;
    link: string;
  }>;
}

const btnFiltersForNew = ref<string[]>([]);
const productsForNew = ref<MainPageData["productsForNew"]>([]);
const ourCollections = ref<MainPageData["ourCollections"]>([]);

onMounted(async () => {
  try {
    const response = await fetch("/api/mainpage");
    const data: MainPageData = await response.json();
    console.log("API Response:", data);
    btnFiltersForNew.value = data.btnFiltersForNew || [];
    // Добавляем базовый URL к путям изображений
    productsForNew.value = (data.productsForNew || []).map((product) => ({
      ...product,
      image: product.image?.startsWith("http")
        ? product.image
        : `${API_BASE}${product.image}`,
      hoverImage: product.hoverImage?.startsWith("http")
        ? product.hoverImage
        : product.hoverImage
          ? `${API_BASE}${product.hoverImage}`
          : undefined,
    }));
    // Добавляем базовый URL к изображениям коллекций
    // API возвращает путь к папке, нужно найти первое изображение
    ourCollections.value = (data.ourCollections || []).map((collection) => {
      // Если image заканчивается на '/', ищем первое изображение в папке
      const imagePath = collection.image.endsWith("/")
        ? `${collection.image}1.jpg`
        : collection.image;
      return {
        ...collection,
        image: imagePath.startsWith("http")
          ? imagePath
          : `${API_BASE}${imagePath}`,
      };
    });
    console.log("btnFiltersForNew:", btnFiltersForNew.value);
    console.log("productsForNew:", productsForNew.value);
    console.log("ourCollections:", ourCollections.value);
  } catch (error) {
    console.error("Failed to fetch mainpage data:", error);
  }
});
</script>
