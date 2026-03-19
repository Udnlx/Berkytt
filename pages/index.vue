<template>
  <div>
    <HeaderSection />
    <main>
      <HeroSection />
      <WhatsNewSection :filters="btnFiltersForNew" :products="productsForNew" />
      <ExploreCollectionsSection />
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
}

const btnFiltersForNew = ref<string[]>([]);
const productsForNew = ref<MainPageData["productsForNew"]>([]);

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
    console.log("btnFiltersForNew:", btnFiltersForNew.value);
    console.log("productsForNew:", productsForNew.value);
  } catch (error) {
    console.error("Failed to fetch mainpage data:", error);
  }
});
</script>
