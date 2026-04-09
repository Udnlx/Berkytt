<template>
  <div>
    <HeaderSection />
    <main class="min-h-screen bg-gray-50">
      <UpSimpleSection title="Личный кабинет" />
      <ProfileSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;

// Статические SEO теги для страницы профиля
useHead({
  title: "Личный кабинет — Berkytt",
  meta: [
    {
      name: "description",
      content:
        "Личный кабинет покупателя в интернет-магазине Berkytt. История заказов, персональные данные, настройки.",
    },
    {
      name: "keywords",
      content:
        "личный кабинет, профиль, история заказов, Berkytt, верхняя одежда, интернет-магазин",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Личный кабинет — Berkytt",
    },
    {
      property: "og:description",
      content:
        "Личный кабинет покупателя в интернет-магазине Berkytt. История заказов, персональные данные, настройки.",
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
      href: `${siteUrl}/profile`,
    },
  ],
});
</script>
