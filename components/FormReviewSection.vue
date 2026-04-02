<template>
  <section class="py-10 bg-gray-50">
    <div class="max-w-[1200px] mx-auto container mx-auto px-4">
      <h2 class="text-2xl font-bold text-black mb-6">
        Оставьте отзыв о товаре
      </h2>

      <!-- Сообщение об успешной отправке -->
      <div
        v-if="isSent"
        class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6"
      >
        <div class="flex items-center gap-3">
          <svg
            class="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p class="text-green-700">
            Ваш отзыв принят и будет опубликован после модерации.
          </p>
        </div>
      </div>

      <form v-else @submit.prevent="submitForm" class="space-y-5">
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
            :disabled="!form.saveData"
            class="px-8 py-3 border border-black bg-white text-black text-sm font-semibold rounded hover:bg-[#ec018c] hover:text-white transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
          >
            ОТПРАВИТЬ
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const apiKey = config.public.apiKey;

const { user, token, getAuthHeaders } = useAuth();

// Получаем slug товара из родительского компонента
const props = defineProps<{
  productSlug: string;
}>();

const isSent = ref(false);
const isLoading = ref(false);

const form = reactive({
  name: "",
  email: "",
  message: "",
  saveData: false,
});

// Предзаполняем поля данными из авторизации
onMounted(() => {
  if (user.value) {
    form.name = user.value.title || user.value.name || "";
    form.email = user.value.email || "";
  }
});

const submitForm = async () => {
  // Проверка заполнения всех полей
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  // Проверка галочки согласия
  if (!form.saveData) {
    alert("Необходимо согласиться с условиями и политикой конфиденциальности");
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch(`${apiBase}/addcomment/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: props.productSlug,
        author: form.name,
        feedback: form.message,
        email: form.email,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      isSent.value = true;
    } else {
      alert(data.message || data.error || "Ошибка при отправке отзыва");
    }
  } catch (e) {
    console.error("Ошибка отправки:", e);
    alert("Не удалось отправить отзыв. Попробуйте позже.");
  } finally {
    isLoading.value = false;
  }
};
</script>
