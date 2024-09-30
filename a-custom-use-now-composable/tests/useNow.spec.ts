import { describe, it, expect, beforeEach, vi, test } from "vitest"
import { useNow } from "../src/composables/useNow"
import { isRef, ref } from "vue"

describe("useNow", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  test("should should return a reactive date object", () => {
    const now = useNow()

    expect(now.value).toBeInstanceOf(Date)
    expect(isRef(now)).toBe(true)
  })

  test("should always be accurate to the second", () => {
    const now = useNow()
    const nowDate = new Date().getSeconds

    expect(now.value.getSeconds).equals(nowDate)

    // after 3 seconds
    vi.advanceTimersByTime(3000)
    const afterThreeSeconds = new Date().getSeconds

    expect(now.value.getSeconds).equals(nowDate)
  })
})
