<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Что нового</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="item in newsItems" :key="item.id" class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
          <div class="h-48 bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400">Изображение</span>
          </div>
          <div class="p-6">
            <span class="text-sm text-blue-600 font-medium">{{ item.category }}</span>
            <h3 class="text-xl font-semibold mt-2 mb-3">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const newsItems = [
  { id: 1, category: 'Новинка', title: 'Весенняя коллекция', description: 'Свежие цвета и легкие ткани для теплых дней' },
  { id: 2, category: 'Акция', title: 'Скидки до 50%', description: 'Успейте купить любимые вещи по выгодной цене' },
  { id: 3, category: 'Тренд', title: 'Эко-материалы', description: 'Одежда из переработанных материалов' },
]
</script>
