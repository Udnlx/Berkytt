<template>
  <section>
    <div v-html="body"></div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  body?: string;
}>();
</script>

<style scoped>
section {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
  text-align: justify;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e5e5;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  color: #262626;
  margin-top: 32px;
  margin-bottom: 16px;
}

h2:first-of-type {
  margin-top: 0;
}

p {
  font-size: 15px;
  line-height: 1.7;
  color: #404040;
  margin-bottom: 16px;
  text-align: justify;
}

p:last-child {
  margin-bottom: 0;
}

p.attention {
  font-weight: 600;
  color: #262626;
}

strong {
  font-weight: 700;
}

a {
  color: #db2777;
  text-decoration: underline;
}

a:hover {
  color: #9d174d;
}

/* Стили для таблиц */
:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
  font-size: 14px;
}

:deep(th),
:deep(td) {
  padding: 12px 16px;
  border: 1px solid #e5e5e5;
  text-align: center;
}

:deep(th) {
  background-color: #f9fafb;
  font-weight: 600;
  color: #1a1a1a;
}

:deep(tr:nth-child(even)) {
  background-color: #fafafa;
}

:deep(tr:hover) {
  background-color: #fff0f6;
}

/* Первый столбец - заголовки строк */
:deep(td:first-child),
:deep(th:first-child) {
  background-color: #f3f4f6;
  font-weight: 500;
  color: #4b5563;
  min-width: 120px;
}
</style>
