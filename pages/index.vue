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
    colors?: string[];
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
    productsForNew.value = data.productsForNew || [];
    console.log("btnFiltersForNew:", btnFiltersForNew.value);
    console.log("productsForNew:", productsForNew.value);
  } catch (error) {
    console.error("Failed to fetch mainpage data:", error);
  }
});
</script>
