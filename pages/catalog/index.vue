<script setup lang="ts">
import { navigateTo } from "#app";

// Редирект с /catalog на /catalog/men/coat/all/1
await navigateTo("/catalog/men/coat/all/1", { replace: true });
</script>
