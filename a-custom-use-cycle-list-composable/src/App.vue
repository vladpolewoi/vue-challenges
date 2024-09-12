<script setup lang="ts">
import { useCycleList } from "@/composables/useCycleList"
import { ref } from 'vue'
const items = [
  "1",
  "2",
]
const itemsRef = ref([
  "1",
  "2",
  "3"
])
const itemsGetter = () => ([
  "1",
  "2",
  "3",
  "4"
])
const { state, next, prev } = useCycleList(itemsGetter)
</script>

<template>
  <div class="page">
    <div>
      <h1>{{ state }}</h1>
      <div class="btn-wrapper">
        <button @click="prev">Previous</button>
        <button @click="next">Next</button>
      </div>
    </div>
  </div>
</template>
