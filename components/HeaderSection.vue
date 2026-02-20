<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold text-gray-800">Berkytt</div>
        <nav class="hidden md:flex space-x-8">
          <a href="#" class="text-gray-600 hover:text-gray-900 transition">Главная</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 transition">Каталог</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 transition">О нас</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 transition">Контакты</a>
        </nav>
        <div class="flex items-center space-x-4">
          <button class="text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
          <button class="text-gray-600 hover:text-gray-900 relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
