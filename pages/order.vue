<template>
  <div>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen">
      <UpSimpleSection title="Оформление заказа" />
      <OrderSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;

// Статические SEO теги для страницы оформления заказа
useHead({
  title: "Оформление заказа — Berkytt",
  meta: [
    {
      name: "description",
      content:
        "Оформление заказа в интернет-магазине Berkytt. Быстрое оформление покупки верхней одежды с доставкой по России.",
    },
    {
      name: "keywords",
      content:
        "оформление заказа, заказ, покупка, Berkytt, верхняя одежда, интернет-магазин, доставка",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Оформление заказа — Berkytt",
    },
    {
      property: "og:description",
      content:
        "Оформление заказа в интернет-магазине Berkytt. Быстрое оформление покупки верхней одежды с доставкой по России.",
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
      href: `${siteUrl}/order`,
    },
  ],
  script: [
    {
      type: "text/javascript",
      src: "https://cdn.jsdelivr.net/npm/@cdek-it/widget@3",
    },
  ],
});
</script>
