<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Отзывы покупателей</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="comment in comments" :key="comment.id" class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-medium">
              {{ comment.author.charAt(0) }}
            </div>
            <div class="ml-4">
              <div class="font-medium">{{ comment.author }}</div>
              <div class="flex text-yellow-400">
                <span v-for="i in 5" :key="i">★</span>
              </div>
            </div>
          </div>
          <p class="text-gray-600">{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const comments = [
  { id: 1, author: 'Анна К.', text: 'Отличное качество! Заказала уже третий раз, всё нравится. Доставка быстрая, упаковка аккуратная.' },
  { id: 2, author: 'Михаил Д.', text: 'Брал джинсы и рубашку. Размер подошёл идеально, ткань приятная. Рекомендую!' },
  { id: 3, author: 'Елена С.', text: 'Очень довольна покупкой! Стильные вещи по адекватной цене. Обязательно вернусь ещё.' },
]
</script>
