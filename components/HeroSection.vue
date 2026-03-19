<template>
  <section class="relative h-screen overflow-hidden bg-gray-50">
    <!-- Слайды -->
    <div class="relative h-full pt-[70px] sm:pt-[80px] md:pt-[100px]">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 top-[70px] sm:top-[80px] md:top-[100px] transition-opacity duration-700"
        :class="[
          currentSlide === index
            ? 'opacity-100 z-10'
            : 'opacity-0 z-0 pointer-events-none',
        ]"
      >
        <div class="container mx-auto px-3 sm:px-4 h-full">
          <div class="flex items-center h-full">
            <div
              class="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-8 items-center w-full h-full"
            >
              <!-- Текст слева -->
              <div class="order-2 md:order-1 text-center md:text-left">
                <p
                  class="text-[10px] sm:text-xs md:text-sm font-medium text-gray-800 mb-1 sm:mb-2 md:mb-4 uppercase tracking-wider"
                >
                  {{ slide.subtitle }}
                </p>
                <h1
                  class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-tight"
                >
                  {{ slide.title }}
                </h1>
                <NuxtLink
                  :to="slide.buttonLink"
                  class="text-white px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 rounded-md font-medium transition transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm md:text-base inline-block"
                  style="background-color: #ec018c"
                >
                  {{ slide.buttonText }}
                </NuxtLink>
              </div>

              <!-- Изображение справа -->
              <div
                class="order-1 md:order-2 flex justify-center items-end h-full"
              >
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="h-auto w-auto max-h-full object-contain md:absolute md:h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Навигация (точки) -->
    <div
      class="absolute bottom-3 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-2.5 md:space-x-3 z-50"
    >
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="currentSlide = index"
        class="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full border-2 transition-all cursor-pointer"
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
      class="absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition z-50"
      aria-label="Предыдущий слайд"
    >
      <svg
        class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-gray-900"
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
      class="absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition z-50"
      aria-label="Следующий слайд"
    >
      <svg
        class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-gray-900"
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
    buttonLink: "/catalog/men/coat/all/1",
    image: "/images/slide_men.png",
  },
  {
    subtitle: "НОВАЯ КОЛЛЕКЦИЯ 2026",
    title: "Откройте свой идеальный образ",
    buttonText: "СМОТРЕТЬ",
    buttonLink: "/catalog/women/raincoats/all/1",
    image: "/images/slide_woman.png",
  },
  {
    subtitle: "ОГРАНИЧЕННАЯ СЕРИЯ",
    title: "Эксклюзивные модели курток",
    buttonText: "ПОДРОБНЕЕ",
    buttonLink: "/catalog/men/kurtki/all/1",
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
