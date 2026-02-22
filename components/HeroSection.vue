<template>
  <section class="relative h-screen overflow-hidden bg-gray-50 pt-[100px]">
    <!-- Слайды -->
    <div class="relative" style="height: calc(100vh - 100px)">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 transition-opacity duration-700"
        :class="currentSlide === index ? 'opacity-100' : 'opacity-0'"
      >
        <div class="container mx-auto px-4" style="height: calc(100vh - 100px)">
          <div class="flex items-center" style="height: calc(100vh - 100px)">
            <div class="grid md:grid-cols-2 gap-8 items-center w-full">
              <!-- Текст слева -->
              <div class="order-2 md:order-1">
                <p
                  class="text-sm font-medium text-gray-800 mb-4 uppercase tracking-wider"
                >
                  {{ slide.subtitle }}
                </p>
                <h1
                  class="text-5xl md:text-6xl font-semibold text-gray-900 mb-8 leading-tight"
                >
                  {{ slide.title }}
                </h1>
                <button
                  class="bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition"
                >
                  {{ slide.buttonText }}
                </button>
              </div>

              <!-- Изображение справа -->
              <div class="order-1 md:order-2 flex justify-center">
                <div class="relative w-full max-w-lg">
                  <div
                    class="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center"
                  >
                    <span class="text-gray-400"
                      >Изображение {{ index + 1 }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Навигация (точки) -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3"
    >
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="currentSlide = index"
        class="w-3 h-3 rounded-full border-2 border-gray-900 transition-all"
        :class="currentSlide === index ? 'bg-gray-900' : 'bg-transparent'"
        :aria-label="'Перейти к слайду ' + (index + 1)"
      />
    </div>

    <!-- Кнопки навигации -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition"
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
      class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition"
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
    subtitle: "SALE! UP TO 50% OFF!",
    title: "Fashion For Every Occasion",
    buttonText: "SHOP NOW",
  },
  {
    subtitle: "NEW COLLECTION 2026",
    title: "Discover Your Style",
    buttonText: "EXPLORE",
  },
  {
    subtitle: "LIMITED EDITION",
    title: "Exclusive Designs",
    buttonText: "VIEW MORE",
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
