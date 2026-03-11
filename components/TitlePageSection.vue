<template>
  <section class="bg-[#ffddf1] py-12">
    <div class="container mx-auto px-4">
      <!-- Заголовок и хлебные крошки -->
      <div class="text-center">
        <h1 class="text-4xl font-semibold text-gray-900 mb-2">
          {{ product?.name || "Название страницы" }}
        </h1>
        <nav class="text-sm text-gray-500">
          <a href="/" class="hover:text-gray-900 transition"> Домой </a>
          <span class="mx-2">›</span>
          <a href="/category" class="hover:text-gray-900 transition">
            {{ product?.productSection || "Раздел" }}
          </a>
          <span class="mx-2">›</span>
          <a href="/category" class="hover:text-gray-900 transition">
            {{ product?.category || "Категория" }}
          </a>
          <span class="mx-2">›</span>
          <span class="text-gray-400">{{
            product?.name || "Название страницы"
          }}</span>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ProductData {
  name: string;
  title: string;
  category: string;
  productSection: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  sku: string;
  tags: string[];
  categories: string[];
  images: string[];
  thumbnails: string[];
  video?: string;
  colors: { name: string; code: string; slug?: string }[];
  sizes: {
    scancode: string;
    storage: boolean;
    russianSize: string;
    size: string;
    quantity: number | string;
    price: string;
  }[];
  specifications: { name: string; value: string }[];
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  deliveryInfo: {
    freeShipping: boolean;
    freeShippingThreshold: number;
    supportHours: string;
    returnDays: number;
  };
  estimatedDelivery: {
    from: string;
    to: string;
  };
}

defineProps<{
  product?: ProductData | null;
}>();
</script>
