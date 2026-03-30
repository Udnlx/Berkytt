<template>
  <div>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen bg-gray-50">
      <UpSimpleSection title="Вход в личный кабинет" />
      <LoginSection v-if="!isAuthenticated" />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { useHead, useRuntimeConfig, navigateTo } from "#app";
import { onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;
const { isAuthenticated } = useAuth();

// Если пользователь уже авторизован - сразу редиректим на профиль
onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo("/profile");
  }
});

// Статические SEO теги для страницы авторизации
useHead({
  title: "Вход в личный кабинет — Berkytt",
  meta: [
    {
      name: "description",
      content:
        "Вход в личный кабинет покупателя в интернет-магазине Berkytt. Авторизация для просмотра истории заказов и управления профилем.",
    },
    {
      name: "keywords",
      content:
        "вход, авторизация, личный кабинет, Berkytt, верхняя одежда, интернет-магазин",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Вход в личный кабинет — Berkytt",
    },
    {
      property: "og:description",
      content:
        "Вход в личный кабинет покупателя в интернет-магазине Berkytt. Авторизация для просмотра истории заказов и управления профилем.",
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
      href: `${siteUrl}/login`,
    },
  ],
});
</script>
