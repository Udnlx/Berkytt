<template>
  <div>
    <HeaderSection />
    <main class="pt-[80px] min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center px-4">
        <h1 class="text-9xl font-bold text-gray-900 mb-4">404</h1>
        <p class="text-2xl text-gray-600 mb-8">
          Страница не найдена
        </p>
        <p class="text-gray-500 mb-8 max-w-md mx-auto">
          К сожалению, страница, которую вы ищете, не существует или была перемещена.
        </p>
        <a
          href="/"
          class="inline-block px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
        >
          Вернуться на главную
        </a>
      </div>
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
// Страница 404
</script>
