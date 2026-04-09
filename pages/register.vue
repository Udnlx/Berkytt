<template>
  <div>
    <HeaderSection />
    <main class="min-h-screen bg-gray-50">
      <UpSimpleSection title="Регистрация нового пользователя" />
      <RegisterSection v-if="!isCheckingAuth" />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { useHead, useRuntimeConfig, navigateTo } from "#app";
import { ref, onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;
const { isAuthenticated } = useAuth();
const isCheckingAuth = ref(true);

// Если пользователь уже авторизован - сразу редиректим на профиль
onMounted(() => {
  // Небольшая задержка для инициализации auth
  setTimeout(() => {
    if (isAuthenticated.value) {
      navigateTo("/profile");
    } else {
      isCheckingAuth.value = false;
    }
  }, 100);
});

// Статические SEO теги для страницы регистрации
useHead({
  title: "Регистрация — Berkytt",
  meta: [
    {
      name: "description",
      content:
        "Регистрация нового пользователя в интернет-магазине Berkytt. Создайте аккаунт для покупок и отслеживания заказов.",
    },
    {
      name: "keywords",
      content:
        "регистрация, новый пользователь, аккаунт, Berkytt, верхняя одежда, интернет-магазин",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Регистрация — Berkytt",
    },
    {
      property: "og:description",
      content:
        "Регистрация нового пользователя в интернет-магазине Berkytt. Создайте аккаунт для покупок и отслеживания заказов.",
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
      href: `${siteUrl}/register`,
    },
  ],
});
</script>
