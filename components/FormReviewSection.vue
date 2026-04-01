<template>
  <section class="py-10 bg-gray-50">
    <div class="max-w-[1200px] mx-auto container mx-auto px-4">
      <h2 class="text-2xl font-bold text-black mb-6">
        Оставьте отзыв о товаре
      </h2>

      <form @submit.prevent="submitForm" class="space-y-5">
        <!-- Name and Email Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <input
              v-model="form.name"
              type="text"
              placeholder="Ваше имя *"
              required
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent"
            />
          </div>
          <div>
            <input
              v-model="form.email"
              type="email"
              placeholder="Ваш Email *"
              required
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent"
            />
          </div>
        </div>

        <!-- Message Field -->
        <div>
          <textarea
            v-model="form.message"
            placeholder="Ваш комментарий *"
            required
            rows="5"
            class="w-full px-4 py-3 bg-white border border-gray-200 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent resize-none"
          ></textarea>
        </div>

        <!-- Checkbox -->
        <div>
          <label
            class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
          >
            <input
              v-model="form.saveData"
              type="checkbox"
              class="min-w-4 w-4 h-4 border-2 border-gray-900 rounded appearance-none cursor-pointer bg-white checked:bg-[#ec018c] checked:border-[#ec018c] checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2013%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] checked:bg-no-repeat checked:bg-center"
            />
            <span>
              Нажимая кнопку, вы соглашаетесь с нашими условиями и политикой
              конфиденциальности.
            </span>
          </label>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="px-8 py-3 border border-black bg-white text-black text-sm font-semibold rounded hover:bg-[#ec018c] hover:text-white transition-colors duration-300 cursor-pointer"
          >
            ОТПРАВИТЬ
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const form = reactive({
  name: "",
  email: "",
  message: "",
  saveData: false,
});

const submitForm = () => {
  // console.log("Form submitted:", form);
  // Здесь будет логика отправки формы
};
</script>
