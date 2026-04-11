<template>
  <footer>
    <div class="container mx-auto px-4 py-12 border-t border-gray-200 pt-6">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Brand & Contact Info -->
        <div>
          <img
            src="/images/logo.png"
            alt="Berkytt"
            class="h-8 lg:h-10 w-auto mb-4"
          />
          <div class="space-y-3">
            <div class="flex">
              <span class="text-sm font-medium text-gray-900 w-20">Почта:</span>
              <span class="text-sm text-gray-600">
                <a
                  :href="mainInfo.email ? 'mailto:' + mainInfo.email : '#'"
                  class="transition opacity-100 hover:opacity-70"
                >
                  {{ mainInfo.email || "berkytt@yandex.ru" }}
                </a>
              </span>
            </div>
            <div class="flex">
              <span class="text-sm font-medium text-gray-900 w-20"
                >Телефон:</span
              >
              <span class="text-sm text-gray-600">
                <a
                  :href="mainInfo.phone ? 'tel:' + mainInfo.phone : '#'"
                  class="transition opacity-100 hover:opacity-70"
                >
                  {{ mainInfo.phone || "+7 (495) 788-88-67" }}
                </a>
              </span>
            </div>
            <div class="flex">
              <span class="text-sm font-medium text-gray-900 w-20">Адрес:</span>
              <span class="text-sm text-gray-600">{{
                mainInfo.address || "г. Москва, Сормовский проезд, д.11с1"
              }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Shop -->
        <div class="text-center">
          <h3 class="text-sm font-medium text-gray-900 mb-4">КАТАЛОГ</h3>
          <ul class="space-y-3">
            <li>
              <a
                href="/catalog/men/coat/all/1"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                ДЛЯ МУЖЧИН
              </a>
            </li>
            <li>
              <a
                href="/catalog/women/raincoats/all/1"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                ДЛЯ ЖЕНЩИН
              </a>
            </li>
          </ul>
        </div>

        <!-- Customer Services -->
        <div class="text-center">
          <h3 class="text-sm font-medium text-gray-900 mb-4">ОБСЛУЖИВАНИЕ</h3>
          <ul class="space-y-3">
            <li>
              <a
                href="/o-brende"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                О БРЕНДЕ
              </a>
            </li>
            <li>
              <a
                href="/politika-konfidentcial-nosti"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
              </a>
            </li>
            <li>
              <a
                href="/pol-zovatel-skoe-soglashenie"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                ПОЛЬЗОВАТЕЛСКОЕ СОГЛАШЕНИЕ
              </a>
            </li>
            <li>
              <a
                href="/soglashenie-na-ispol-zovanie-kuki"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                СОГЛАШЕНИЕ НА ИСПОЛЬЗОВАНИЕ КУКИ
              </a>
            </li>
          </ul>
        </div>

        <!-- Information -->
        <div class="text-center">
          <h3 class="text-sm font-medium text-gray-900 mb-4">ИНФОРМАЦИЯ</h3>
          <ul class="space-y-3">
            <li>
              <a
                href="/wheretobuy"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                ГДЕ КУПИТЬ
              </a>
            </li>
            <li>
              <a
                href="/ukhod-khranenie"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                УХОД-ХРАНЕНИЕ
              </a>
            </li>
            <li>
              <a
                href="/delivery"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                ДОСТАВКА
              </a>
            </li>
            <li>
              <a
                href="/vozvrat"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                ВОЗВРАТ
              </a>
            </li>
            <li>
              <a
                href="/contact"
                class="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                КОНТАКТЫ
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-200 pt-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div class="text-sm text-gray-500">
            ©2026 Berkytt. Все права защищены.
          </div>

          <!-- Payment Methods -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500 mr-2">Оплата:</span>
            <img
              src="https://img.icons8.com/color/48/mir.png"
              alt="UnionPay"
              class="h-10 w-auto"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll to Top Button -->
    <button
      @click="scrollToTop"
      class="fixed bottom-6 right-6 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow-lg"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMainInfo } from "~/composables/useMainInfo";

const { mainInfo, load: loadMainInfo } = useMainInfo();

onMounted(async () => {
  await loadMainInfo();
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>
