<template>
  <header>
    <!-- Верхняя полоса -->
    <div
      ref="topBarRef"
      class="text-white py-2"
      style="background-color: #ec018c"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <p
            class="text-xs sm:text-sm font-medium max-[400px]:hidden"
            style="text-transform: uppercase"
          >
            Berkytt - Интернет магазин
          </p>
          <div class="flex items-center space-x-4">
            <!-- Адрес -->
            <img
              src="/images/map.svg"
              alt="Email"
              class="w-5 h-5"
              style="filter: brightness(1) invert(1)"
            />
            <span class="text-sm hidden lg:inline">
              {{ mainInfo.address || "г. Москва, Сормовский проезд, д.11с1" }}
            </span>
            <!-- Конверт (Email) -->
            <a
              :href="mainInfo.email ? 'mailto:' + mainInfo.email : '#'"
              class="transition opacity-100 hover:opacity-70"
            >
              <img
                src="/images/mail.svg"
                alt="Email"
                class="w-5 h-5"
                style="filter: brightness(1) invert(1)"
              />
            </a>
            <!-- Телефонная трубка -->
            <a
              :href="mainInfo.phone ? 'tel:' + mainInfo.phone : '#'"
              class="transition opacity-100 hover:opacity-70"
            >
              <img
                src="/images/phone.svg"
                alt="Phone"
                class="w-5 h-5"
                style="filter: brightness(0) invert(1)"
              />
            </a>
            <!-- Мобильный телефон -->
            <a
              :href="mainInfo.mobilePhone ? 'tel:' + mainInfo.mobilePhone : '#'"
              class="transition opacity-100 hover:opacity-70"
            >
              <img
                src="/images/mobile.svg"
                alt="Mobile"
                class="w-5 h-5"
                style="filter: brightness(0) invert(1)"
              />
            </a>
            <!-- WhatsApp -->
            <a
              :href="
                mainInfo.whatsapp
                  ? 'https://wa.me/' + mainInfo.whatsapp.replace(/[^\d]/g, '')
                  : '#'
              "
              target="_blank"
              class="transition opacity-100 hover:opacity-70"
            >
              <img
                src="/images/whatsapp.svg"
                alt="WhatsApp"
                class="w-5 h-5"
                style="filter: brightness(0) invert(1)"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Основная навигация -->
    <div
      ref="navRef"
      :class="[
        'bg-[#1f1f1f] border-b border-gray-800 transition-all duration-300',
        isSticky
          ? 'fixed top-0 left-0 right-0 z-50 shadow-md'
          : 'relative z-50',
      ]"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Логотип и кнопка меню -->
          <div class="flex items-center">
            <!-- Кнопка бургер для мобильных и планшетов -->
            <button
              @click="toggleMobileMenu"
              class="lg:hidden text-white hover:text-gray-300 transition mr-4"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="!isMobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <!-- Логотип -->
            <a href="/">
              <img
                src="/images/logo_white.png"
                alt="Berkytt"
                class="h-8 lg:h-10 w-auto"
              />
            </a>

            <!-- Меню для десктопа (от lg и выше) -->
            <nav class="hidden lg:flex items-center space-x-6 ml-6">
              <template v-for="(item, index) in menuItems" :key="index">
                <!-- Обычная ссылка -->
                <a
                  v-if="!item.type"
                  :href="item.href"
                  class="text-sm font-medium text-white hover:text-gray-300 transition"
                >
                  {{ item.label }}
                </a>
                <!-- Выпадающее меню -->
                <div v-else class="relative group">
                  <a
                    :href="item.href || '#'"
                    class="text-sm font-medium text-white hover:text-gray-300 transition flex items-center"
                  >
                    {{ item.label }}
                    <svg
                      class="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>
                  <div
                    class="absolute left-0 mt-2 w-56 bg-[#1f1f1f] border border-gray-700 shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  >
                    <a
                      v-for="(subItem, subIndex) in item.items || []"
                      :key="subIndex"
                      :href="subItem?.href || '#'"
                      class="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white transition whitespace-normal break-words"
                    >
                      {{ subItem?.label || "" }}
                    </a>
                  </div>
                </div>
              </template>
            </nav>
          </div>

          <!-- Иконки справа -->
          <div class="flex items-center space-x-4 lg:space-x-6">
            <!-- Кнопка поиска -->
            <!--
            <button
              @click="toggleSearch"
              class="text-gray-700 hover:text-gray-900 transition"
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
                  stroke-width="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            -->

            <!-- Поисковая панель -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-if="isSearchOpen"
                class="absolute top-full right-0 bg-[#1f1f1f] border border-gray-700 shadow-lg py-3 px-4 z-40"
                style="width: 320px"
              >
                <form
                  @submit.prevent="handleSearch"
                  class="flex gap-2 items-center"
                >
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Поиск товаров..."
                    class="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    class="px-4 py-1.5 bg-[#ec018c] text-white text-sm font-medium rounded hover:bg-[#d4007c] transition-colors"
                  >
                    НАЙТИ
                  </button>
                </form>
              </div>
            </transition>

            <NuxtLink
              :to="isAuthenticated ? '/profile' : '/login'"
              class="text-white hover:text-gray-300 transition"
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
                  stroke-width="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </NuxtLink>

            <a
              href="/cart"
              class="text-white hover:text-gray-300 transition relative"
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
                  stroke-width="1.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span
                v-if="totalQuantity > 0"
                class="absolute -top-1 -right-1 bg-white text-gray-900 text-xs w-4 h-4 rounded-full flex items-center justify-center"
              >
                {{ totalQuantity }}
              </span>
            </a>
          </div>
        </div>

        <!-- Мобильное меню (для экранов меньше lg) -->
        <div
          v-if="isMobileMenuOpen"
          class="lg:hidden absolute left-0 right-0 bg-[#1f1f1f] border-t border-gray-700 z-50 shadow-lg"
        >
          <nav class="flex flex-col space-y-3 px-4 py-4">
            <template v-for="(item, index) in menuItems" :key="index">
              <!-- Обычная ссылка -->
              <a
                v-if="!item.type"
                :href="item.href"
                class="text-sm font-medium text-white hover:text-gray-300 transition py-2"
              >
                {{ item.label }}
              </a>
              <!-- Выпадающее меню для мобильных -->
              <div v-else>
                <button
                  @click="toggleDropdown(index)"
                  class="text-sm font-medium text-white hover:text-gray-300 transition flex items-center justify-between w-full py-2"
                >
                  {{ item.label }}
                  <svg
                    class="w-4 h-4 ml-1 transition-transform duration-200"
                    :class="{ 'rotate-180': openDropdown === index }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  v-show="openDropdown === index"
                  class="pl-4 mt-2 space-y-2"
                >
                  <a
                    v-for="(subItem, subIndex) in item.items || []"
                    :key="subIndex"
                    :href="subItem?.href || '#'"
                    class="block text-sm text-white hover:text-gray-400 transition py-1"
                  >
                    {{ subItem?.label || "" }}
                  </a>
                </div>
              </div>
            </template>
          </nav>
        </div>
      </div>
    </div>

    <!-- Placeholder для компенсации высоты навигации при fixed -->
    <div
      v-if="isSticky"
      ref="placeholderRef"
      class="bg-[#1f1f1f] border-b border-gray-800"
      aria-hidden="true"
    ></div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import { useCart } from "~/composables/useCart";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";
import { useMainInfo } from "~/composables/useMainInfo";

const router = useRouter();
const isMobileMenuOpen = ref(false);
const openDropdown = ref<number | null>(null);
const isSearchOpen = ref(false);
const searchQuery = ref("");
const isSticky = ref(false);
const navRef = ref<HTMLElement | null>(null);
const topBarRef = ref<HTMLElement | null>(null);
const placeholderRef = ref<HTMLElement | null>(null);

const handleScroll = () => {
  if (topBarRef.value) {
    const topBarRect = topBarRef.value.getBoundingClientRect();
    const shouldBeSticky = topBarRect.bottom <= 0;

    if (shouldBeSticky && !isSticky.value) {
      isSticky.value = true;
      nextTick(() => {
        if (navRef.value && placeholderRef.value) {
          const navHeight = navRef.value.offsetHeight;
          placeholderRef.value.style.height = navHeight + "px";
        }
      });
    } else if (!shouldBeSticky && isSticky.value) {
      isSticky.value = false;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Используем composable корзины
const { totalQuantity } = useCart();

// Используем composable авторизации
const { isAuthenticated } = useAuth();

// Используем composable mainInfo
const { mainInfo, load: loadMainInfo } = useMainInfo();

interface MenuItem {
  id: number;
  section: string;
  title: string;
  name: string;
}

interface MenuData {
  menuMan: MenuItem[];
  menuWoman: MenuItem[];
}

const menuData = ref<MenuData>({
  menuMan: [],
  menuWoman: [],
});

onMounted(async () => {
  const data = await loadMainInfo();

  if (data) {
    // Получаем меню для мужчин (приходит в корне data)
    if (data.menuMan && Array.isArray(data.menuMan)) {
      menuData.value.menuMan = data.menuMan;
    }

    // Получаем меню для женщин (приходит в корне data)
    if (data.menuWoman && Array.isArray(data.menuWoman)) {
      menuData.value.menuWoman = data.menuWoman;
    }
  }
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleDropdown = (menuIndex: number) => {
  openDropdown.value = openDropdown.value === menuIndex ? null : menuIndex;
};

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  if (isSearchOpen.value) {
    setTimeout(() => {
      (
        document.querySelector(
          'input[placeholder="Поиск товаров..."]',
        ) as HTMLInputElement
      )?.focus();
    }, 100);
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
    isSearchOpen.value = false;
    searchQuery.value = "";
  }
};

// Формируем URL вида /catalog/{section}/{name}/all/1
const buildMenuUrl = (section: string, name: string) => {
  return `/catalog/${section}/${name}/all/1`;
};

// Вычисляемые свойства для меню
const manMenuItems = computed(() => {
  return (menuData.value.menuMan || []).map((item) => ({
    label: item.title.toUpperCase(),
    href: buildMenuUrl(item.section, item.name),
  }));
});

const womanMenuItems = computed(() => {
  return (menuData.value.menuWoman || []).map((item) => ({
    label: item.title.toUpperCase(),
    href: buildMenuUrl(item.section, item.name),
  }));
});

// Единый массив пунктов меню (вычисляемое свойство)
const menuItems = computed(() => [
  {
    label: "ДЛЯ МУЖЧИН",
    href: "http://localhost:3000/catalog/men/all/all/1",
    type: "dropdown",
    items: manMenuItems.value,
  },
  {
    label: "ДЛЯ ЖЕНЩИН",
    href: "http://localhost:3000/catalog/women/all/all/1",
    type: "dropdown",
    items: womanMenuItems.value,
  },
  {
    label: "ИНФОРМАЦИЯ",
    type: "dropdown",
    items: [
      { label: "ГДЕ КУПИТЬ", href: "/wheretobuy" },
      { label: "УХОД-ХРАНЕНИЕ", href: "/ukhod-khranenie" },
      { label: "ДОСТАВКА", href: "/delivery" },
      { label: "ВОЗВРАТ", href: "/vozvrat" },
      {
        label: "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ",
        href: "/politika-konfidentcial-nosti",
      },
      {
        label: "ПОЛЬЗОВАТЕЛСКОЕ СОГЛАШЕНИЕ",
        href: "/pol-zovatel-skoe-soglashenie",
      },
      {
        label: "СОГЛАШЕНИЕ НА ИСПОЛЬЗОВАНИЕ КУКИ",
        href: "/soglashenie-na-ispol-zovanie-kuki",
      },
    ],
  },
  { label: "КОНТАКТЫ", href: "/contact" },
]);
</script>
