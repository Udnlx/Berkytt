<template>
  <section class="bg-[#ffddf1] py-12">
    <div class="container mx-auto px-4">
      <!-- Заголовок и хлебные крошки -->
      <div class="text-center mb-1">
        <h1 class="text-4xl font-semibold text-gray-900 mb-2">
          {{ title }}
        </h1>
        <nav class="text-sm text-gray-500">
          <a href="/" class="hover:text-gray-900 transition">Домой</a>
          <span class="mx-2">›</span>
          <span class="text-gray-400">{{ title }}</span>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
