<script setup lang="ts">
import { navigateTo } from "#app";

// Редирект с /catalog на /catalog/men/coat/0/1
await navigateTo("/catalog/men/coat//1", { replace: true });
</script>
