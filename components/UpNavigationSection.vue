<template>
  <section class="bg-[#ffddf1] py-12">
    <div class="container mx-auto px-4">
      <!-- Заголовок и хлебные крошки -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-semibold text-gray-900 mb-2">
          Название раздела
        </h1>
        <nav class="text-sm text-gray-500">
          <a href="/" class="hover:text-gray-900 transition">Домой</a>
          <span class="mx-2">›</span>
          <span class="text-gray-400">Название раздела</span>
        </nav>
      </div>

      <!-- Навигация по категориям -->
      <div class="flex justify-center flex-wrap gap-6">
        <a
          v-for="item in categories"
          :key="item.label"
          :href="item.href"
          class="text-sm font-medium text-gray-700 hover:text-gray-900 transition uppercase tracking-wide"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  { label: "ПАЛЬТО", href: "#" },
  { label: "ПОЛУПАЛЬТО", href: "#" },
  { label: "ПЛАЩИ", href: "#" },
  { label: "КУРТКИ", href: "#" },
];
</script>
