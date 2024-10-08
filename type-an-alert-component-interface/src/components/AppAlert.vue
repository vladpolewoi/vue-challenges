<script setup lang="ts">
import { computed, ref } from "vue"
import { Icon } from "@iconify/vue"

interface Props {
  type: 'info' | 'success' | 'warning' | 'error'
  dismissible: boolean
}
const {
  type = 'info',
  dismissible = false
} = defineProps<Props>()

const emit = defineEmits<{
  dismiss: [payload: true]
}>()

const classes = computed(() => {
  const map = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  }

  return `alert ${map[type]}`
})

const dismissed = ref(false)

const transitionDuration = 500
const transitionCssRule = `all ${transitionDuration}ms`

function handleDismiss() {
  dismissed.value = true
  setTimeout(() => {
    emit("dismiss", true)
  }, transitionDuration)
}

const icon = computed(() => {
  if (!type) return "carbon:information"
  return {
    info: "carbon:information",
    success: "carbon:checkmark-outline",
    warning: "carbon:warning",
    error: "carbon:error",
  }[type]
})
</script>
<template>
  <Transition>
    <div v-if="!dismissed" role="alert" class="alert" :class="classes">
      <Icon :icon="icon" width="1.5rem" />
      <span>
        <slot></slot>
      </span>
      <button @click="handleDismiss" v-if="dismissible" type="button" class="text-lg close" data-dismiss="alert"
        aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </Transition>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: v-bind(transitionCssRule);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
