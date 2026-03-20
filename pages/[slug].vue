<template>
  <div>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen">
      <UpSimpleSection :title="pageData?.title" />
      <PostSection :body="pageData?.body" />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const config = useRuntimeConfig();

const { data: pageData, error } = await useFetch(
  `${config.public.apiBase}/getpage/${slug}`,
);

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Страница не найдена",
  });
}
</script>
