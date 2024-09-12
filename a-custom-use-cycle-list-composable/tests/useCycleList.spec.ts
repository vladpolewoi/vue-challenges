import { describe, it, expect, beforeEach, test } from "vitest";

import { useCycleList } from "../src/composables/useCycleList";
import { ref, nextTick } from "vue";

const items = [1, 2, 3, 4];

describe("useCycleList", () => {
  test("returns the first item in the array as the state before prev or next", () => {
    const { state } = useCycleList(items);
    expect(state.value).toEqual(items[0]);
  });
  test("sets state to the next item in the array on next()", () => {
    const { state, next } = useCycleList(items);

    next();

    expect(state.value).toEqual(items[1]);
  });

  test("sets state to the previous item in the array on prev()", () => {
    const { state, prev, next } = useCycleList(items);

    next();
    next();
    prev();

    expect(state.value).toEqual(items[1]);
  });

  test("cycles to the end on prev if at beginning", () => {
    const { state, next } = useCycleList(items);

    items.forEach(() => {
      next();
    });

    expect(state.value).toEqual(items[0]);
  });

  test("cycles to the beginning on next if at the end", () => {
    const { state, prev } = useCycleList(items);

    prev();

    expect(state.value).toEqual(items[items.length - 1]);
  });

  test("Bonus: works with refs", () => {
    const itemsRef = ref([1, 2]);
    const { state } = useCycleList(items);

    expect(state.value).toEqual(itemsRef.value[0]);
  });

  test("Bonus: works when the provided ref changes value", () => {
    const itemsRef = ref([1, 2]);
    const { state } = useCycleList(itemsRef);

    expect(state.value).toEqual(itemsRef.value[0]);

    itemsRef.value = [3, 4];

    expect(state.value).toEqual(3);
  });

  test("Bonus: resets index to 0 if updated ref doesn't include the activeIndex", async () => {
    const itemsRef = ref([1, 2, 3, 4]);
    const { state, next } = useCycleList(itemsRef);

    expect(state.value).toEqual(itemsRef.value[0]);

    next();
    next();
    next();

    itemsRef.value = [5, 6];
    await nextTick();

    expect(state.value).toEqual(5);
  });
});
