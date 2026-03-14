<template>
  <div>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen">
      <UpNavigationSection />
      <ProductsSection
        :products="products"
        :loading="loading"
        :total-items="totalItems"
        @update:filters="handleFilterUpdate"
      />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

interface Product {
  id: number;
  name: string;
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
  total?: number;
}

const route = useRoute();
const products = ref<Product[]>([]);
const loading = ref(false);
const totalItems = ref(0);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const params = route.query;
    const queryString = new URLSearchParams(
      params as Record<string, string>,
    ).toString();
    const response = await $fetch<ProductsResponse>(
      `http://berkytt/api/getproducts/?${queryString}`,
    );
    products.value = response.products || [];
    totalItems.value = response.total || products.value.length;
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
    products.value = [];
    totalItems.value = 0;
  } finally {
    loading.value = false;
  }
};

const handleFilterUpdate = (filters: {
  section?: string;
  category?: string;
}) => {
  const query = { ...route.query, ...filters };
  navigateTo({ path: "/catalog", query });
};

watch(
  () => route.query,
  () => {
    fetchProducts();
  },
  { deep: true },
);

onMounted(() => {
  fetchProducts();
});
</script>
