<template>
  <div>
    <HeaderSection />
    <main class="min-h-screen bg-gray-50">
      <UpSimpleSection title="Восстановление пароля" />
      <ForgotPasswordSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;

useHead({
  title: "Восстановление пароля — Berkytt",
  meta: [
    {
      name: "description",
      content:
        "Восстановление пароля для доступа к личному кабинету интернет-магазина Berkytt.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "Восстановление пароля — Berkytt",
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
      href: `${siteUrl}/passremind`,
    },
  ],
});
</script>
