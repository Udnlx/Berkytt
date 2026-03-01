<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="feature in features" :key="feature.id" class="text-center">
          <!-- Icon -->
          <div class="flex justify-center mb-4">
            <img
              :src="feature.iconSrc"
              :alt="feature.title"
              class="w-12 h-12"
            />
          </div>

          <!-- Title -->
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            {{ feature.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm text-gray-500 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    id: 1,
    title: "Круглосуточная поддержка",
    description: "Мы готовы помочь вам с любыми вопросами и проблемами 24/7.",
    iconSrc: "/images/phone.svg",
  },
  {
    id: 2,
    title: "Возврат в течение 14 дней",
    description:
      "Если вы не довольны покупкой, просто верните товар в течение 14 дней для возврата средств.",
    iconSrc: "/images/shopping-bag.svg",
  },
  {
    id: 3,
    title: "Наша гарантия",
    description:
      "Мы отвечаем за наши продукты и услуги и гарантируем ваше удовлетворение.",
    iconSrc: "/images/shield.svg",
  },
  {
    id: 4,
    title: "Доставка по всему миру",
    description:
      "Мы доставляем наши продукты по всему миру, делая их доступными для клиентов везде.",
    iconSrc: "/images/truck.svg",
  },
];
</script>
