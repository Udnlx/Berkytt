<template>
  <div>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen">
      <UpSimpleSection :title="pageData?.title ?? ''" />
      <PostSection :body="pageData?.body ?? ''" />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRuntimeConfig, navigateTo } from "#app";

const route = useRoute();
const slug = route.params.slug as string;
const config = useRuntimeConfig();

interface PageData {
  title: string;
  body: string;
  name: string;
}

const { data: pageData, error } = await useFetch<PageData>(
  `${config.public.apiBase}/getpage/${slug}`,
);

if (error.value || !pageData.value?.name) {
  await navigateTo("/404");
}
</script>
