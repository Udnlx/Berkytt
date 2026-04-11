<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="card in cards"
          :key="card.id"
          class="bg-gray-50 rounded-2xl p-8"
        >
          <!-- Icon -->
          <div
            class="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-5"
          >
            <img :src="card.icon" :alt="card.title" class="w-11 h-11" />
          </div>

          <!-- Title -->
          <h3
            class="text-2xl font-medium text-gray-900 mb-4"
            v-html="card.title"
          />

          <!-- Description -->
          <p class="text-base text-gray-600 leading-relaxed">
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    id: 1,
    icon: "/images/aboutus01.png",
    title: "Персональный<br>консультант",
    description:
      "Поможет с выбором, соберёт корзину, предложит скидки и отправит заказ на нужный адрес.",
  },
  {
    id: 2,
    icon: "/images/aboutus02.png",
    title: "Реальный стиль,<br>а не подиум",
    description:
      "Наши стилисты подберут для вас практичные образы — для работы, встреч и повседневной жизни.",
  },
  {
    id: 3,
    icon: "/images/aboutus03.png",
    title: "Индивидуальная<br>подгонка",
    description:
      "После примерки отправим в наше ателье — бесплатно скорректируем длину, объемы и посадку.",
  },
];
</script>
