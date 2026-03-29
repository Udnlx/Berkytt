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
useHead({
  script: [
    {
      type: "text/javascript",
      src: "https://cdn.jsdelivr.net/npm/@cdek-it/widget@3",
    },
  ],
});

// Логика страницы раздела
</script>
