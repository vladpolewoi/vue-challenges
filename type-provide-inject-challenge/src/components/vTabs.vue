<script setup lang="ts">
import { provide, ref, readonly } from "vue"

const tabs = ref<string[]>([])
const activeTab = ref<string>()

function activateTab(title: string) {
  activeTab.value = title
}

function registerTab(title: string) {
  if (tabs.value.includes(title)) return
  tabs.value.push(title)
}

provide(injectionKey, {
  registerTab,
  activateTab,
  activeTab: readonly(activeTab),
})
</script>
<script lang="ts">
import type { InjectionKey, Ref } from "vue"

// type the injection key here 👇
interface Injection {
  registerTab(title: string): void,
  activateTab(title: string): void
  activeTab: Readonly<Ref<string | undefined>>
}
export const injectionKey = Symbol("vTabs") as InjectionKey<Injection>
</script>
<template>
  <div class="tabs">
    <div class="tab-trigger-wrapper">
      <button v-for="tab in tabs" :key="tab" class="tab-trigger" :class="{
        active: activeTab === tab,
      }" @click="activateTab(tab)">
        {{ tab }}
      </button>
    </div>
    <div class="tab-content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
