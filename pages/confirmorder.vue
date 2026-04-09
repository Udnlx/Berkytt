<template>
  <div>
    <HeaderSection />
    <main class="min-h-screen">
      <UpSimpleSection title="Подтверждение заказа" />
      <ConfirmOrderSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;

// Статические SEO теги для страницы подтверждения заказа
useHead({
  title: "Подтверждение заказа — Berkytt",
  meta: [
    {
      name: "description",
      content:
        "Подтверждение заказа в интернет-магазине Berkytt. Ваш заказ успешно оформлен. Информация о заказе и доставке.",
    },
    {
      name: "keywords",
      content:
        "подтверждение заказа, заказ оформлен, Berkytt, верхняя одежда, интернет-магазин, статус заказа",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Подтверждение заказа — Berkytt",
    },
    {
      property: "og:description",
      content:
        "Подтверждение заказа в интернет-магазине Berkytt. Ваш заказ успешно оформлен. Информация о заказе и доставке.",
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
      href: `${siteUrl}/confirmorder`,
    },
  ],
});
</script>
