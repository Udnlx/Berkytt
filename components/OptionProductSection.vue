<template>
  <section class="max-w-[1200px] mx-auto px-5 py-10">
    <!-- Tabs Header -->
    <div class="flex justify-center gap-10 mb-10 border-b border-gray-200">
      <button
        :class="[
          'text-base font-bold pb-3 cursor-pointer transition-colors duration-300',
          activeTab === 'description'
            ? 'text-black'
            : 'text-gray-400 hover:text-gray-600',
        ]"
        @click="activeTab = 'description'"
      >
        Description
      </button>
      <button
        :class="[
          'text-base font-bold pb-3 cursor-pointer transition-colors duration-300',
          activeTab === 'specifications'
            ? 'text-black'
            : 'text-gray-400 hover:text-gray-600',
        ]"
        @click="activeTab = 'specifications'"
      >
        Specifications
      </button>
    </div>

    <!-- Description Tab -->
    <div v-if="activeTab === 'description'" class="tab-content animate-fadeIn">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Description Main -->
        <div>
          <h3 class="text-lg font-semibold text-black mb-4">Description</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Keep your home organized, yet elegant with storage cabinets by Onita
            Patio Furniture. These cabinets not only make a great storage units,
            but also bring a great decorative accent to your decor.
            Traditionally designed, they are perfect to be used in the hallway,
            living room, bedroom, office or any place where you need to store or
            display things. Made of high quality materials, they are sturdy and
            durable for years. Bring one-of-a-kind look to your interior with
            furniture from Onita Furniture!
          </p>
        </div>

        <!-- Specifications List -->
        <div>
          <h4 class="text-lg font-semibold text-black mb-4">
            About This Products
          </h4>
          <ul class="space-y-1.5">
            <li
              class="text-sm text-gray-600 leading-relaxed before:content-['·'] before:absolute before:left-0 pl-4 relative"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </li>
            <li
              class="text-sm text-gray-600 leading-relaxed before:content-['·'] before:absolute before:left-0 pl-4 relative"
            >
              Nulla luctus libero quis mauris vestibulum dapibus.
            </li>
            <li
              class="text-sm text-gray-600 leading-relaxed before:content-['·'] before:absolute before:left-0 pl-4 relative"
            >
              Maecenas ullamcorper erat mi, vel consequat enim suscipit at.
            </li>
            <li
              class="text-sm text-gray-600 leading-relaxed before:content-['·'] before:absolute before:left-0 pl-4 relative"
            >
              Quisque consectetur nibh ac urna molestie scelerisque.
            </li>
            <li
              class="text-sm text-gray-600 leading-relaxed before:content-['·'] before:absolute before:left-0 pl-4 relative"
            >
              Mauris in nisl scelerisque massa consectetur pretium sed et
              mauris.
            </li>
          </ul>
        </div>
      </div>

      <!-- Features Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 pt-10 border-t border-gray-200"
      >
        <div class="text-center">
          <div class="flex justify-center items-center mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <h4 class="text-base font-semibold text-black mb-2">
            Shipping Faster
          </h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            Use on walls, furniture, doors and many more surfaces. The
            possibilities are endless.
          </p>
        </div>

        <div class="text-center">
          <div class="flex justify-center items-center mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h4 class="text-base font-semibold text-black mb-2">
            Cotton Material
          </h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            Use on walls, furniture, doors and many more surfaces. The
            possibilities are endless.
          </p>
        </div>

        <div class="text-center">
          <div class="flex justify-center items-center mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
          <h4 class="text-base font-semibold text-black mb-2">High Quality</h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            Use on walls, furniture, doors and many more surfaces. The
            possibilities are endless.
          </p>
        </div>

        <div class="text-center">
          <div class="flex justify-center items-center mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 2C6.5 2 2 6.5 2 12c0 4.4 3.6 8 8 8 2.5 0 4.8-1.2 6.3-3"
              ></path>
              <path
                d="M12 22c5.5 0 10-4.5 10-10 0-4.4-3.6-8-8-8-2.5 0-4.8 1.2-6.3 3"
              ></path>
            </svg>
          </div>
          <h4 class="text-base font-semibold text-black mb-2">
            Highly Compatible
          </h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            Use on walls, furniture, doors and many more surfaces. The
            possibilities are endless.
          </p>
        </div>
      </div>
    </div>

    <!-- Specifications Tab -->
    <div
      v-if="activeTab === 'specifications'"
      class="tab-content animate-fadeIn"
    >
      <table class="w-full max-w-[800px] mx-auto border-collapse">
        <tbody>
          <tr class="odd:bg-gray-50">
            <th
              class="py-4 px-5 text-left font-medium text-black w-[30%] rounded"
            >
              Rating
            </th>
            <td class="py-4 px-5 text-left text-gray-600 rounded">
              <span class="text-yellow-400 text-base">★★★★★</span>
              <span class="text-gray-400 text-xs ml-2">(1,234)</span>
            </td>
          </tr>
          <tr class="odd:bg-gray-50">
            <th class="py-4 px-5 text-left font-medium text-black rounded">
              Outer Shell
            </th>
            <td class="py-4 px-5 text-left text-gray-600 rounded">
              100% polyester
            </td>
          </tr>
          <tr class="odd:bg-gray-50">
            <th class="py-4 px-5 text-left font-medium text-black rounded">
              Lining
            </th>
            <td class="py-4 px-5 text-left text-gray-600 rounded">
              100% polyurethane
            </td>
          </tr>
          <tr class="odd:bg-gray-50">
            <th class="py-4 px-5 text-left font-medium text-black rounded">
              Size
            </th>
            <td class="py-4 px-5 text-left text-gray-600 rounded">
              S, M, L, XL
            </td>
          </tr>
          <tr class="odd:bg-gray-50">
            <th class="py-4 px-5 text-left font-medium text-black rounded">
              Colors
            </th>
            <td class="py-4 px-5 text-left text-gray-600 rounded">
              Grey, Red, Blue, Black
            </td>
          </tr>
          <tr class="odd:bg-gray-50">
            <th class="py-4 px-5 text-left font-medium text-black rounded">
              Care
            </th>
            <td class="py-4 px-5 text-left text-gray-600 rounded">
              <div class="flex gap-3">
                <span class="text-xl cursor-help" title="Do not bleach"
                  >🚫</span
                >
                <span class="text-xl cursor-help" title="Iron low">⚡</span>
                <span class="text-xl cursor-help" title="Do not tumble dry"
                  >❌</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref<"description" | "specifications">("description");
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease;
}
</style>
