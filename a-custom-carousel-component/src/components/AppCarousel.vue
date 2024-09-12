<script setup lang="ts">
import { useCycleList } from '@/composables/useCycleList'
import { useInterval } from '@/composables/useInterval'

interface Props {
  urls: string[]
  duration?: number
}
const { urls, duration = 1000 } = defineProps<Props>()

const { state, next } = useCycleList(urls)

useInterval(next, duration)
</script>
<template>
  <!-- extra container to make prev image behind not 2 images at the same time -->
  <div class="relative">

    <!-- key is needed for transition to work -->
    <Transition>
      <img :src="state" :key="state" data-test="active-img">
    </Transition>

    <div v-show="false">
      <img v-for="url in urls" :key="url" :src="url" />
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity .5s ease;
}

.v-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
