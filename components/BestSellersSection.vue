<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Хиты продаж</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
          <div class="relative bg-gray-200 aspect-square flex items-center justify-center">
            <span class="text-gray-400">Изображение</span>
            <span v-if="product.badge" class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">{{ product.badge }}</span>
          </div>
          <div class="p-4">
            <h3 class="font-medium text-gray-800">{{ product.name }}</h3>
            <div class="flex items-center justify-between mt-2">
              <div>
                <span v-if="product.oldPrice" class="text-sm text-gray-400 line-through">{{ product.oldPrice }} ₽</span>
                <span class="text-lg font-bold text-gray-900">{{ product.price }} ₽</span>
              </div>
              <button class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition opacity-0 group-hover:opacity-100">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const products = [
  { id: 1, name: 'Футболка базовая', price: 1990, oldPrice: 2490, badge: '-20%' },
  { id: 2, name: 'Джинсы классические', price: 4990, oldPrice: null, badge: null },
  { id: 3, name: 'Рубашка Oxford', price: 3490, oldPrice: 4290, badge: 'Хит' },
  { id: 4, name: 'Кеды городские', price: 5990, oldPrice: null, badge: null },
]
</script>
