import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import ToggleInput from '../src/components/ToggleInput.vue'

describe('the toggle input component', () => {
  it('toggles the v-model value between true and false when clicked', async () => {
    const wrapper = mount(ToggleInput, {
      attachTo: document.body,
      props: {
        modelValue: false,
      },
    })

    // click twice
    wrapper.trigger('click')
    wrapper.trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    const valueOnFirstClick = emitted ? emitted[0][0] : null
    const valueOnSecondClick = emitted ? emitted[1][0] : null

    expect(valueOnFirstClick).toBe(true)
    expect(valueOnSecondClick).toBe(false)
  })
  it('supports a binary v-model modifier', async () => {
    const wrapper = mount(
      {
        components: { ToggleInput },
        template: `
        <ToggleInput v-model.binary="isChecked" />
      `,
        setup: () => ({ isChecked: ref(0) }),
      },
      {
        attachTo: document.body,
      }
    )

    const toggle = wrapper.findComponent({ name: 'ToggleInput' })

    toggle.trigger('click')
    expect(wrapper.vm.isChecked).toBe(1)

    toggle.trigger('click')
    expect(wrapper.vm.isChecked).toBe(0)
  })
})
