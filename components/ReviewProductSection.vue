<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-medium text-center mb-12">Отзывы</h2>

      <!-- Reviews Carousel -->
      <div class="relative">
        <!-- Navigation Arrows -->
        <button
          @click="scrollLeft"
          class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition"
        >
          <svg
            class="w-5 h-5 text-gray-700"
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
          @click="scrollRight"
          class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition"
        >
          <svg
            class="w-5 h-5 text-gray-700"
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

        <div
          ref="carouselRef"
          class="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
          style="scrollbar-width: none; -ms-overflow-style: none"
        >
          <div
            v-for="review in comments"
            :key="review.id"
            class="bg-white p-6 rounded-2xl shadow-sm flex-shrink-0 snap-start"
            :class="[
              'w-[calc(100%/1)] sm:w-[calc(50%-12px)] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-18px)]',
            ]"
          >
            <!-- Stars -->
            <div class="flex gap-1 mb-4">
              <svg
                v-for="i in 5"
                :key="i"
                class="w-5 h-5 text-amber-400 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>

            <!-- Title -->
            <h3 class="text-base font-medium text-gray-900 mb-3">
              {{ review.title }}
            </h3>

            <!-- Text -->
            <p class="text-sm text-gray-600 leading-relaxed mb-6">
              {{ review.text }}
            </p>

            <!-- Author -->
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm"
              >
                {{ review.author.charAt(0) }}
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">
                  {{ review.author }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ review.date }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Comment {
  id: number;
  title: string;
  text: string;
  author: string;
  date: string;
}

defineProps<{
  comments: Comment[];
}>();

const carouselRef = ref<HTMLElement | null>(null);

const scrollLeft = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: -300, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: 300, behavior: "smooth" });
  }
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
