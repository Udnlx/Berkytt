<template>
  <section class="bg-[#ffddf1] py-12">
    <div class="container mx-auto px-4">
      <!-- Заголовок и хлебные крошки -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-semibold text-gray-900 mb-2">Каталог</h1>
        <nav class="text-sm text-gray-500">
          <a href="/" class="hover:text-gray-900 transition">Домой</a>
          <span class="mx-2">›</span>
          <span class="text-gray-400">Каталог</span>
        </nav>
      </div>

      <!-- Навигация по категориям -->
      <div class="flex justify-center flex-wrap gap-6">
        <button
          v-for="item in categories"
          :key="item.label"
          @click="selectCategory(item.label)"
          class="text-sm font-medium transition uppercase tracking-wide"
          :class="
            activeCategory === item.label
              ? 'text-[#ec018c]'
              : 'text-gray-700 hover:text-gray-900'
          "
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeCategory = ref<string | null>("ДЛЯ МУЖЧИН");

const categories = [
  { label: "ДЛЯ МУЖЧИН", href: "" },
  { label: "ДЛЯ ЖЕНЩИН", href: "" },
];

const selectCategory = (label: string) => {
  if (activeCategory.value === label) {
    activeCategory.value = null;
  } else {
    activeCategory.value = label;
  }
};
</script>
