import { computed, ref, toRef, watch, type MaybeRefOrGetter } from "vue";

export const useCycleList = <T>(items: MaybeRefOrGetter<T[]>) => {
  const reactiveItems = toRef(items);
  const currentIndex = ref(0);
  const state = computed(() => reactiveItems.value[currentIndex.value]);

  function next() {
    currentIndex.value = (currentIndex.value + 1) % reactiveItems.value.length;
  }

  function prev() {
    const nextValue = currentIndex.value - 1;

    currentIndex.value =
      nextValue < 0 ? reactiveItems.value.length - 1 : nextValue;
  }

  watch(reactiveItems, () => {
    if (!reactiveItems.value[currentIndex.value]) {
      currentIndex.value = 0;
    }
  });

  return {
    prev,
    next,
    state,
  };
};
