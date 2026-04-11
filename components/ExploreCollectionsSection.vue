<template>
  <section
    v-if="props.collections && props.collections.length > 0"
    class="py-16 bg-white"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-medium text-center mb-10">
        Популярные категории
      </h2>

      <!-- Categories Grid -->
      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink
          v-for="collection in props.collections"
          :key="collection.id"
          :to="`/${collection.link}`"
          class="group flex items-center gap-5 border border-gray-200 rounded-2xl px-6 py-5 hover:border-gray-300 hover:shadow-sm transition cursor-pointer w-[280px]"
        >
          <!-- Image -->
          <div
            class="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0"
          >
            <img
              :src="collection.image"
              :alt="collection.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <!-- Title -->
          <span
            class="text-lg font-medium text-gray-900 group-hover:text-[#ec018c] transition break-words"
          >
            {{ collection.title }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Collection {
  id: number;
  name: string;
  title: string;
  image: string;
  link: string;
}

const props = defineProps<{
  collections: Collection[];
}>();
</script>
