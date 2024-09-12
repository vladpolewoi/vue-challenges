import { useRefHistory } from '@/composables'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'

describe('useRefHistory', () => {
  it('stores the history of the source value', async () => {
    const data = ref('initial')
    const { history } = useRefHistory(data, 5)

    // The history should be empty initially
    expect(history.value).toHaveLength(0)

    // Update the data
    data.value = 'updated'
    await nextTick()

    // The history should have one record
    expect(history.value.at(0)?.value).toBe('initial')

    // Update the data again
    data.value = 'changed'
    await nextTick()

    // The history should have two records
    expect(history.value.at(0)?.value).toBe('updated')
    expect(history.value.at(1)?.value).toBe('initial')
  })

  it('does NOT include the current value in history', async () => {
    const data = ref('initial')
    const { history } = useRefHistory(data, 5)

    // Update the data
    data.value = 'updated'
    await nextTick()

    expect(history.value.at(0)?.value).toBe('initial')
  })

  it('stores the history ordered from newest to oldest', async () => {
    const data = ref('initial')
    const { history } = useRefHistory(data, 5)

    // Update the data
    data.value = 'updated'
    await nextTick()

    // Update the data again
    data.value = 'changed'
    await nextTick()

    // The history should have two records
    expect(history.value.at(0)?.value).toBe('updated')
    expect(history.value.at(1)?.value).toBe('initial')
  })

  it('removes the oldest record(s) when the history reaches the capacity', async () => {})

  it('allows capacity as a getter (callback function) and dynamically update history when capacity changes', async () => {})

  it('allows capacity as a ref and dynamically update history when capacity changes', async () => {})

  it('sets the data source back to the previous value on undo', async () => {})

  it('sets the data source to one record forward in history on redo', async () => {})
})
