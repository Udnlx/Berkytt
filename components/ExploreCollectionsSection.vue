<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-medium text-center mb-10">
        Explore Collections
      </h2>

      <!-- Carousel Container -->
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

        <!-- Collections Carousel -->
        <div
          ref="carouselRef"
          class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style="scrollbar-width: none; -ms-overflow-style: none"
        >
          <div
            v-for="collection in collections"
            :key="collection.id"
            class="group cursor-pointer relative overflow-hidden rounded-xl flex-shrink-0 w-[320px]"
            @click="onCollectionClick(collection)"
          >
            <!-- Image -->
            <div class="aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                :src="collection.image"
                :alt="collection.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <!-- Label & Button -->
            <div
              class="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2"
            >
              <span
                class="px-6 py-2 bg-white text-gray-900 text-sm font-medium rounded-lg shadow-sm"
              >
                {{ collection.name }}
              </span>
              <button
                class="px-6 py-2 bg-[#ec018c] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#ff43b2] transition"
                @click.stop="onCollectionClick(collection)"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const carouselRef = ref<HTMLElement | null>(null);

const collections = [
  {
    id: 1,
    name: "Swimwear",
    image: "/images/forcards.jpg",
  },
  {
    id: 2,
    name: "Top",
    image: "/images/forcards.jpg",
  },
  {
    id: 3,
    name: "Sets",
    image: "/images/forcards.jpg",
  },
  {
    id: 4,
    name: "Outerwear",
    image: "/images/forcards.jpg",
  },
  {
    id: 5,
    name: "OuterwearNew",
    image: "/images/forcards.jpg",
  },
  {
    id: 6,
    name: "OuterwearNew2",
    image: "/images/forcards.jpg",
  },
];

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

const onCollectionClick = (collection: (typeof collections)[number]) => {
  navigateTo(`/collections/${collection.name.toLowerCase()}`);
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
