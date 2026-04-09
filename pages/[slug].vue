<template>
  <div>
    <HeaderSection />
    <main class="min-h-screen">
      <UpSimpleSection :title="pageData?.title ?? ''" />
      <PostSection :body="pageData?.body ?? ''" />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRuntimeConfig, navigateTo, useHead } from "#app";

const route = useRoute();
const slug = route.params.slug as string;
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const apiKey = config.public.apiKey;
const siteUrl = config.public.siteUrl;

interface PageData {
  pageid: number;
  name: string;
  title: string;
  body: string;
  metaData: {
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
  };
  ogData: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    type: string;
    locale: string;
    siteName: string;
  };
}

const { data: pageData, error } = await useFetch<PageData>(
  `${apiBase}/getpage/${slug}`,
  {
    headers: {
      "X-API-KEY": apiKey,
    },
  },
);

if (error.value || !pageData.value?.name) {
  await navigateTo("/404");
}

// Динамические SEO теги на основе metaData и ogData из API
useHead(() => {
  const metaData = pageData.value?.metaData;
  const ogData = pageData.value?.ogData;

  return {
    title: metaData?.title
      ? `${metaData.title} — BERKYTT`
      : pageData.value?.title
        ? `${pageData.value.title} — BERKYTT`
        : "Страница не найдена — BERKYTT",
    meta: [
      {
        name: "description",
        content: metaData?.description || "",
      },
      {
        name: "keywords",
        content: metaData?.keywords || "",
      },
      {
        property: "og:type",
        content: ogData?.type || "website",
      },
      {
        property: "og:title",
        content: ogData?.title || metaData?.title || "",
      },
      {
        property: "og:description",
        content: ogData?.description || metaData?.description || "",
      },
      {
        property: "og:image",
        content: ogData?.image || "",
      },
      {
        property: "og:image:alt",
        content: ogData?.imageAlt || "",
      },
      {
        property: "og:locale",
        content: ogData?.locale || "ru_RU",
      },
      {
        property: "og:site_name",
        content: ogData?.siteName || "BERKYTT",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: `${siteUrl}/${slug}`,
      },
    ],
  };
});
</script>
