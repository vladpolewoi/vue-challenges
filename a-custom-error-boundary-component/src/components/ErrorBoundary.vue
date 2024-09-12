<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const error = ref<Error>()
const key = ref(0)

onErrorCaptured((err) => {
  error.value = err
  return false
})

function clearError() {
  error.value = undefined
  key.value = Math.random()
}
</script>
<template>
  <slot
    v-if="error"
    :error="error"
    :clearError="clearError"
    name="error"
  ></slot>
  <div v-show="!error" :key="key">
    <slot></slot>
  </div>
</template>
