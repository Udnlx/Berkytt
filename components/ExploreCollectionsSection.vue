<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Коллекции</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="collection in collections" :key="collection.id" class="group cursor-pointer">
          <div class="relative overflow-hidden rounded-lg bg-gray-200 aspect-square flex items-center justify-center">
            <span class="text-gray-400">Изображение</span>
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
              <span class="text-white opacity-0 group-hover:opacity-100 transition font-semibold">{{ collection.name }}</span>
            </div>
          </div>
          <h3 class="mt-4 text-lg font-medium text-center">{{ collection.name }}</h3>
          <p class="text-gray-500 text-center text-sm">{{ collection.count }} товаров</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const collections = [
  { id: 1, name: 'Женщинам', count: 245 },
  { id: 2, name: 'Мужчинам', count: 189 },
  { id: 3, name: 'Детям', count: 156 },
  { id: 4, name: 'Аксессуары', count: 78 },
]
</script>
