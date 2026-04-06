interface ProductType {
  label: string;
  category: string;
  count: number;
}

interface SizeData {
  value: number | string;
  label: string;
  id: number | string;
  russianSize: string;
}

interface CacheEntry {
  categories: ProductType[];
  sizes: SizeData[];
}

// Кеш на уровне модуля — не перезагружается при навигации
const cache: Record<string, CacheEntry | undefined> = {};

export function useCategoriesCache() {
  const productTypes = ref<ProductType[]>([]);
  const availableSizes = ref<SizeData[]>([]);
  const categoriesLoading = ref(false);

  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const apiKey = config.public.apiKey;
  const route = useRoute();

  async function fetchCategories(section?: string) {
    const sec = section || String(route.params.section || "men");

    // Проверяем кеш
    if (cache[sec]?.categories && cache[sec]?.sizes) {
      productTypes.value = cache[sec]!.categories;
      availableSizes.value = cache[sec]!.sizes;
      categoriesLoading.value = false;
      return;
    }

    categoriesLoading.value = true;
    try {
      const response = await $fetch(`${apiBase}/getcategories/${sec}/`, {
        headers: {
          "X-API-KEY": apiKey,
        },
      });

      const categories = Array.isArray(response)
        ? response
        : (response as any).categories || [];

      const mappedCategories = categories.map((cat: any) => ({
        label: (cat.title || cat.name || "Без названия").toUpperCase(),
        category: cat.name || cat.slug || String(cat.id) || "unknown",
        count: cat.count || 0,
      }));

      // Загружаем размеры
      const sizesResponse = await $fetch(`${apiBase}/getcategories/${sec}/`, {
        headers: {
          "X-API-KEY": apiKey,
        },
      });

      let mappedSizes: SizeData[] = [];
      if (sizesResponse && "sizes" in sizesResponse) {
        mappedSizes = [
          { value: "all", label: "Все размеры", id: "all", russianSize: "" },
          ...sizesResponse.sizes.map((size: any) => ({
            value: size.id,
            label: `${size.russianSize} - ${size.title}`,
            id: size.id,
            russianSize: size.russianSize,
          })),
        ];
      }

      // Сохраняем в кеш
      cache[sec] = {
        categories: mappedCategories,
        sizes: mappedSizes,
      };

      productTypes.value = mappedCategories;
      availableSizes.value = mappedSizes;
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
      productTypes.value = [];
      availableSizes.value = [];
    } finally {
      categoriesLoading.value = false;
    }
  }

  return {
    productTypes,
    availableSizes,
    categoriesLoading,
    fetchCategories,
  };
}
