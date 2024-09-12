import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import vTabPanel from '../src/components/vTabPanel.vue'
import vTabs from '../src/components/vTabs.vue'

const tabs = ['Tab 1', 'Tab 2', 'Tab 3']
const TabsWrapper = [
  {
    template: `
      <vTabs>
        <vTabPanel v-for="tab in tabs" :key="tab" :title="tab">
          <p>{{ tab }}</p>
        </vTabPanel>
      </vTabs>
    `,
    components: {
      vTabs,
      vTabPanel,
    },
    setup: () => ({ tabs }),
  },
  {
    attachTo: document.body,
    props: {
      tabs,
    },
  },
]
describe('the use of vTabsPanel with vTabs', () => {
  it('renders the tab titles', async () => {
    const wrapper = mount(TabsWrapper[0], TabsWrapper[1])

    await wrapper.vm.$nextTick()

    const tabTitles = wrapper.findAll('[data-test="tab-title"]')

    expect(tabTitles).toHaveLength(tabs.length)

    tabs.forEach((tab, index) => {
      expect(tabTitles[index].text()).toBe(tab)
    })
  })

  it('renders the tab panel content', async () => {
    const wrapper = mount(TabsWrapper[0], TabsWrapper[1])

    await wrapper.vm.$nextTick()

    const tabContents = wrapper.findAll('[data-test="tab-content"]')

    expect(tabContents).toHaveLength(tabs.length)

    tabs.forEach((tab, index) => {
      expect(tabContents[index].text()).toBe(tab)
    })
  })

  it('only shows the content for the active panel', async () => {
    const wrapper = mount(TabsWrapper[0], TabsWrapper[1])

    await wrapper.vm.$nextTick()

    const firstContent = wrapper.find('[data-test="tab-content"]:nth-child(1)')
    const secondContent = wrapper.find('[data-test="tab-content"]:nth-child(2)')

    expect(firstContent.isVisible()).toBe(true)
    expect(secondContent.isVisible()).toBe(false)
  })

  it('switches the content based on the tab clicked', async () => {
    const wrapper = mount(TabsWrapper[0], TabsWrapper[1])

    await wrapper.vm.$nextTick()

    // click second tab
    const secondTab = wrapper.find('[data-test="tab-title"]:nth-child(2)')
    secondTab.trigger('click')
    await wrapper.vm.$nextTick()

    // check if second tab content is visible
    const firstContent = wrapper.find('[data-test="tab-content"]:nth-child(1)')
    const secondContent = wrapper.find('[data-test="tab-content"]:nth-child(2)')

    expect(firstContent.isVisible()).toBe(false)
    expect(secondContent.isVisible()).toBe(true)

    // click third tab
    const thirdTab = wrapper.find('[data-test="tab-title"]:nth-child(3)')
    thirdTab.trigger('click')
    await wrapper.vm.$nextTick()

    // check if third tab content is visible
    const thirdContent = wrapper.find('[data-test="tab-content"]:nth-child(3)')
    expect(thirdContent.isVisible()).toBe(true)
    expect(secondContent.isVisible()).toBe(false)
  })
})
