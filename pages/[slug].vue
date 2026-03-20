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
interface PageData {
  title: string;
  body: string;
  name: string;
}

const route = useRoute();
const slug = route.params.slug as string;
const config = useRuntimeConfig();

const { data: pageData, error } = await useFetch<PageData>(
  `${config.public.apiBase}/getpage/${slug}`,
);

if (error.value || !pageData.value?.name) {
  await navigateTo("/404");
}
</script>
