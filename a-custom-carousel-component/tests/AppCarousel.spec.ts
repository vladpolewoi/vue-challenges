import { describe, it, expect, beforeEach, vi, test } from "vitest";
import { nextTick } from "vue";
import { mount, type VueWrapper } from "@vue/test-utils";
import AppCarousel from "../src/components/AppCarousel.vue";

// you should write tests in order to verify the user's solution
// these test will run to verify the user's solution

let wrapper: VueWrapper;
const urls = [
  "https://picsum.photos/id/32/500/300?test=1",
  "https://picsum.photos/id/35/500/300?test=2",
  "https://picsum.photos/id/56/500/300?test=3",
  "https://picsum.photos/id/84/500/300?test=4",
];

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  wrapper = mount(AppCarousel, {
    props: {
      urls: urls,
    },
  });
});

describe("the Carousel component", () => {
  test("rotates through the images provided via the urls prop", async () => {
    // first image displays first
    let img = wrapper.find('[data-test="active-img"]');
    expect(img.attributes("src")).toBe(urls.at(0));

    // and second
    vi.advanceTimersByTime(1000);
    // next tick to refresh render
    await nextTick();
    img = wrapper.find('[data-test="active-img"]');
    expect(img.attributes("src")).toBe(urls.at(1));
  });

  test("uses the duration prop to change the time between images", async () => {
    const wrapper = mount(AppCarousel, {
      props: {
        urls,
        duration: 200,
      },
    });

    for (const url of urls) {
      const img = wrapper.find('[data-test="active-img"]');
      expect(img.attributes("src")).toBe(url);
      vi.advanceTimersByTime(200);
      await nextTick();
    }
  });
});
