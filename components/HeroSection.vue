<template>
  <section class="relative h-screen overflow-hidden bg-gray-50">
    <!-- Слайды -->
    <div class="relative h-full pt-[100px]">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 top-[100px] transition-opacity duration-700"
        :class="[
          currentSlide === index
            ? 'opacity-100 z-10'
            : 'opacity-0 z-0 pointer-events-none',
        ]"
      >
        <div class="container mx-auto px-4 h-full">
          <div class="flex items-center h-full">
            <div class="grid md:grid-cols-2 gap-8 items-center w-full h-full">
              <!-- Текст слева -->
              <div class="order-2 md:order-1">
                <p
                  class="text-sm font-medium text-gray-800 mb-4 uppercase tracking-wider"
                >
                  {{ slide.subtitle }}
                </p>
                <h1
                  class="text-5xl md:text-7xl font-semibold text-gray-900 mb-8 leading-tight"
                >
                  {{ slide.title }}
                </h1>
                <button
                  class="text-white px-8 py-3 rounded-md font-medium transition transform hover:scale-105 hover:shadow-lg"
                  style="background-color: #ec018c"
                >
                  {{ slide.buttonText }}
                </button>
              </div>

              <!-- Изображение справа -->
              <div
                class="order-1 md:order-2 flex justify-start items-start h-full"
              >
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="h-full w-full object-cover object-top rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Навигация (точки) -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50"
    >
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="currentSlide = index"
        class="w-3 h-3 rounded-full border-2 transition-all cursor-pointer"
        :class="
          currentSlide === index
            ? 'bg-[#ec018c] border-[#000000]'
            : 'bg-transparent border-gray-900 hover:border-[#ec018c]'
        "
        :aria-label="'Перейти к слайду ' + (index + 1)"
      />
    </div>

    <!-- Кнопки навигации -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition z-50"
      aria-label="Предыдущий слайд"
    >
      <svg
        class="w-5 h-5 text-gray-900"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition z-50"
      aria-label="Следующий слайд"
    >
      <svg
        class="w-5 h-5 text-gray-900"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const currentSlide = ref(0);
let autoplayInterval: ReturnType<typeof setInterval> | null = null;

const slides = [
  {
    subtitle: "СКИДКИ ДО 50%!",
    title: "Стильная верхняя одежда для вас",
    buttonText: "В КАТАЛОГ",
    image: "/images/slide_men.png",
  },
  {
    subtitle: "НОВАЯ КОЛЛЕКЦИЯ 2026",
    title: "Откройте свой идеальный образ",
    buttonText: "СМОТРЕТЬ",
    image: "/images/slide_woman.png",
  },
  {
    subtitle: "ОГРАНИЧЕННАЯ СЕРИЯ",
    title: "Эксклюзивные модели курток",
    buttonText: "ПОДРОБНЕЕ",
    image: "/images/slide_men2.png",
  },
];

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>
