<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-medium text-center mb-10">Часто задаваемые вопросы</h2>

      <div class="max-w-3xl mx-auto">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="border-b border-gray-200"
        >
          <button
            @click="toggleItem(index)"
            class="w-full flex items-center justify-between py-5 text-left"
          >
            <span class="text-lg text-gray-800">{{ item.question }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ml-4"
              :class="{ 'rotate-90': openIndex === index }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            class="overflow-hidden transition-all duration-300"
            :style="{
              maxHeight: openIndex === index ? contentHeights[index] + 'px' : '0',
            }"
          >
            <p class="pb-5 text-base text-gray-600 leading-relaxed">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Теперь делать покупки еще проще",
    answer:
      "Мы упростили процесс оформления заказа до нескольких кликов. Выберите товар, укажите адрес доставки и способ оплаты — всё готово. Также вы можете сохранить товары в избранное и вернуться к ним позже.",
  },
  {
    question: "Широкий выбор элитных брендов",
    answer:
      "В нашем каталоге представлены коллекции от ведущих мировых и российских дизайнеров. Мы тщательно отбираем каждый бренд, чтобы предложить вам только лучшие материалы и безупречный крой.",
  },
  {
    question: "Быстрая доставка в любой регион России",
    answer:
      "Мы сотрудничаем с надёжными транспортными компаниями, включая СДЭК. Доставка по Москве занимает 1–2 дня, в регионы — от 3 до 7 рабочих дней. Также доступен самовывоз из нашего шоурума.",
  },
  {
    question: "Как сделать заказ?",
    answer:
      "Добавьте понравившийся товар в корзину, перейдите к оформлению, заполните данные для доставки и выберите удобный способ оплаты. После подтверждения заказа вы получите уведомление на электронную почту.",
  },
];

const openIndex = ref<number | null>(null);
const contentHeights = ref<number[]>([]);

onMounted(async () => {
  await nextTick();
  // Вычисляем высоту контента для каждого элемента
  contentHeights.value = faqItems.map(() => 200); // примерная высота, можно уточнить динамически
});

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>
