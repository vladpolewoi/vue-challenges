import { onMounted, onUnmounted, ref, watch } from "vue";

export function useLocalStorage(key: string, defaultValue: string) {
  const value = ref(localStorage.getItem(key) || defaultValue);

  watch(value, (newValue) => {
    localStorage.setItem(key, newValue);
  });

  function onLocalStorageChange() {
    console.log("ON");
  }

  // onMounted(() => {
  window.addEventListener("storage", onLocalStorageChange);
  // });

  onUnmounted(() => {
    console.log("UN");
    window.removeEventListener("storage", onLocalStorageChange);
  });

  return value;
}
