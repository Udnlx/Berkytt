import { ref, computed } from "vue";

interface CartProduct {
  id: number; // ID товара
  product: string; // nameProduct
  size: string; // nameSize
  qnt: number; // Количество
  price: number; // Цена
}

// Используем localStorage для сохранения корзины (только на клиенте)
const useCartStorage = () => {
  if (import.meta.client) {
    const saved = localStorage.getItem("cart_products");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

// Глобальное состояние корзины
const cartProducts = ref<CartProduct[]>(useCartStorage());

// Сохраняем в localStorage при изменении (только на клиенте)
const saveToStorage = () => {
  if (import.meta.client) {
    localStorage.setItem("cart_products", JSON.stringify(cartProducts.value));
  }
};

// Общее количество товаров в корзине
const totalQuantity = computed(() => {
  return cartProducts.value.reduce((sum, item) => sum + item.qnt, 0);
});

// Добавление товара в корзину
const addToCart = (
  id: number,
  product: string,
  size: string,
  qnt: number,
  price: number,
) => {
  const existingIndex = cartProducts.value.findIndex(
    (item) => item.id === id && item.product === product && item.size === size,
  );

  if (existingIndex !== -1) {
    // Товар уже есть - увеличиваем количество
    cartProducts.value[existingIndex].qnt += qnt;
  } else {
    // Добавляем новый товар
    cartProducts.value.push({ id, product, size, qnt, price });
  }

  saveToStorage();
  console.log("Корзина обновлена:", cartProducts.value);
};

// Удаление товара из корзины
const removeFromCart = (id: number, product: string, size: string) => {
  cartProducts.value = cartProducts.value.filter(
    (item) =>
      !(item.id === id && item.product === product && item.size === size),
  );
  saveToStorage();
  console.log("Товар удалён из корзины:", cartProducts.value);
};

// Очистка корзины
const clearCart = () => {
  cartProducts.value = [];
  saveToStorage();
  console.log("Корзина очищена");
};

// Обновление количества товара
const updateQuantity = (
  id: number,
  product: string,
  size: string,
  qnt: number,
) => {
  const item = cartProducts.value.find(
    (item) => item.id === id && item.product === product && item.size === size,
  );
  if (item) {
    item.qnt = qnt;
    saveToStorage();
    console.log("Количество обновлено:", cartProducts.value);
  }
};

export function useCart() {
  return {
    cartProducts,
    totalQuantity,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  };
}
