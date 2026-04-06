<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/50" @click="close"></div>

        <!-- Modal -->
        <div
          class="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          <!-- Header -->
          <div
            class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg z-10"
          >
            <h2 class="text-lg font-semibold">Таблица размеров</h2>
            <button
              @click="close"
              class="text-gray-400 hover:text-gray-600 transition"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div v-if="loading" class="flex justify-center py-8">
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ec018c]"
              ></div>
            </div>
            <div v-else-if="error" class="text-center py-8 text-gray-500">
              <p>Не удалось загрузить таблицу размеров</p>
              <button
                @click="retryLoad"
                class="mt-2 text-[#ec018c] hover:underline text-sm"
              >
                Попробовать снова
              </button>
            </div>
            <div v-else v-html="content" class="size-guide-content"></div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const apiKey = config.public.apiKey;

const isOpen = ref(false);
const loading = ref(false);
const error = ref(false);
const content = ref("");

let loadedType: string | null = null;
let currentType: "sizes" | "sizes-female" | null = null;

async function loadSizeGuide(type: "sizes" | "sizes-female") {
  if (loadedType === type && content.value) {
    isOpen.value = true;
    return;
  }

  currentType = type;
  loading.value = true;
  error.value = false;

  try {
    const response = await fetch(`${apiBase}/getpage/${type}`, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });
    const data = await response.json();
    content.value = data.body || "";
    loadedType = type;
    isOpen.value = true;
  } catch (e) {
    console.error("Failed to load size guide:", e);
    error.value = true;
  } finally {
    loading.value = false;
  }
}

function retryLoad() {
  if (currentType) {
    loadSizeGuide(currentType);
  }
}

function close() {
  isOpen.value = false;
}

defineExpose({ open: loadSizeGuide });
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}

:deep(.size-guide-content table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

:deep(.size-guide-content th),
:deep(.size-guide-content td) {
  padding: 10px 12px;
  border: 1px solid #e5e5e5;
  text-align: center;
}

:deep(.size-guide-content th) {
  background-color: #f5f5f5;
  font-weight: 600;
}

:deep(.size-guide-content img) {
  max-width: 100%;
  height: auto;
}
</style>
