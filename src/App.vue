<template>
  <ListItem v-model:items="items">
    <template #itemOrder="{ data }">
      <div class="m-r-12">{{ data - 1 }}</div></template
    >
  </ListItem>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import ListItem from './demo/ListItem.vue'

const items = ref([
  {
    id: 1,
    text: 'Car',
    order: 1,
  },
  {
    id: 2,
    text: 'Truck-kun',
    order: 2,
  },
])

// const list = h(ListItemRenderFuction, {items: }) -->
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.flex {
  display: flex;
}
.m-r-12 {
  margin-right: 12px;
}

.m-l-12 {
  margin-left: 12px;
}

.items-left {
  align-item: left;
}

.p-l-40 {
  padding-left: 40px;
}
.m-x-12 {
  margin: 0 12px;
}

.mw-200 {
  min-width: 200px;
}

.m-b-12 {
  margin-bottom: 12px;
}
</style>
