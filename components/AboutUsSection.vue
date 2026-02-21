<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="feature in features" :key="feature.id" class="text-center">
          <!-- Icon -->
          <div class="flex justify-center mb-4">
            <svg
              v-if="feature.icon === 'phone'"
              class="w-12 h-12 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.76 12.76 0 01-6.145-6.145c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <svg
              v-else-if="feature.icon === 'box'"
              class="w-12 h-12 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2m18 0h-6l-2-2H9L7 6H3m18 2l-4.5 4.5m0 0L12 17m4.5-4.5L21 8"
              />
            </svg>
            <svg
              v-else-if="feature.icon === 'guarantee'"
              class="w-12 h-12 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
            <svg
              v-else-if="feature.icon === 'truck'"
              class="w-12 h-12 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.124-.504 1.124-1.125V14.25m-17.25 4.5L3.75 19.5m16.5 0l.375-1.5M3.75 19.5h1.5C5.25 19.5 6 18.75 6 18V9.75m13.5 9.75h-1.5c-.75 0-1.5-.75-1.5-1.5V9.75M6 18V9.75m0-1.5h9.75m-9.75 0a1.125 1.125 0 011.125-1.125h3m5.625 1.125h-3m3 0V6.375c0-.621-.504-1.125-1.125-1.125h-3.375a1.125 1.125 0 00-1.125 1.125v3.375m9 0h1.5c.621 0 1.125.504 1.125 1.125v2.25m-9 0v2.25c0 .621.504 1.125 1.125 1.125h.75"
              />
            </svg>
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
    title: "24/7 Customer Service",
    description:
      "We're here to help you with any questions or concerns you have, 24/7.",
    icon: "phone",
  },
  {
    id: 2,
    title: "14-Day Money Back",
    description:
      "If you're not satisfied with your purchase, simply return it within 14 days for a refund.",
    icon: "box",
  },
  {
    id: 3,
    title: "Our Guarantee",
    description:
      "We stand behind our products and services and guarantee your satisfaction.",
    icon: "guarantee",
  },
  {
    id: 4,
    title: "Shipping Worldwide",
    description:
      "We ship our products worldwide, making them accessible to customers everywhere.",
    icon: "truck",
  },
];
</script>
