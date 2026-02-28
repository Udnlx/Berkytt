<template>
  <section
    class="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
  >
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold mb-6">Готовы обновить гардероб?</h2>
      <p class="text-xl mb-8 text-purple-100">
        Более 1000 новых товаров уже ждут вас в каталоге
      </p>
      <a
        :href="`/catalog`"
        class="bg-white text-purple-600 px-10 py-4 rounded-full font-semibold hover:bg-purple-50 transition transform hover:scale-105"
        @click.stop
      >
        Перейти в каталог
      </a>
    </div>
  </section>
</template>
