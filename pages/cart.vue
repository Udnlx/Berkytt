<template>
  <div>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen">
      <UpSimpleSection title="Корзина" />
      <CartSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;

// Статические SEO теги для страницы корзины
useHead({
  title: "Корзина — Berkytt",
  meta: [
    {
      name: "description",
      content:
        "Ваша корзина покупок в интернет-магазине Berkytt. Оформите заказ на верхнюю одежду с доставкой по России.",
    },
    {
      name: "keywords",
      content:
        "корзина, заказ, покупка, Berkytt, верхняя одежда, интернет-магазин",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Корзина — Berkytt",
    },
    {
      property: "og:description",
      content:
        "Ваша корзина покупок в интернет-магазине Berkytt. Оформите заказ на верхнюю одежду с доставкой по России.",
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
      href: `${siteUrl}/cart`,
    },
  ],
});
</script>
