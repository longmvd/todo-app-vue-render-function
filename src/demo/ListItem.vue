<template>
  <div>
    <div class="flex p-l-40">
      <input class="mw-200" v-model="itemEditing.text" @keydown.enter="() => actions[0].callBack(itemEditing)" />
      <button class="m-l-12" @click="() => actions[0].callBack(itemEditing)">
        <slot name="addButton" :data="actions[0]">{{ actions[0].text }}</slot>
      </button>
    </div>
    <ul>
      <li v-for="item in internalItems" class="flex m-b-12">
        <div class="flex mw-200">
          <slot :data="item.order" name="itemOrder"
            ><div class="m-r-12">{{ item.order }}</div></slot
          >
          <div v-if="item.state == ButtonActionEnum.Edit"><input v-model="item.text" /></div>
          <slot :data="item" v-else>{{ item.text }}</slot>
        </div>

        <button
          v-for="action in item.state == ButtonActionEnum.Edit ? actions.slice(3) : actions.slice(1, 3)"
          class="m-l-12"
          @click="() => action.callBack(item)"
        >
          <slot name="itemAction" :data="action">{{ action.text }}</slot>
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { h, computed, ref, toRef } from 'vue'
import { IItem } from './demo/interface.ts'
import { IButtonAction } from './interface.ts'
import { ButtonActionEnum } from './enum.ts'
const props = defineProps<{
  items: IItem[]
}>()

const mode = ref(ButtonActionEnum.None)

const internalItems = computed(() => props.items)
const emit = defineEmits<{
  (e: 'update:items', items: IItem[]): void
}>()
let backupData = {}
const itemEditing = ref({})

const actions: IButtonAction = [
  {
    text: 'Add',
    actionType: ButtonActionEnum.Add,
    callBack: (item) => {
      item.order = internalItems.value.length + 1
      item.id = internalItems.value.length + 1
      internalItems.value.push(item)
      emit('update:items', internalItems.value)
      itemEditing.value = {}
    },
  },
  {
    text: 'Edit',
    actionType: ButtonActionEnum.Edit,
    callBack: (item) => {
      backupData = { ...item }
      item.state = ButtonActionEnum.Edit
      console.log(item)
    },
  },
  {
    text: 'Delete',
    actionType: ButtonActionEnum.Delete,
    callBack: (item) => {
      const itemUpdate = internalItems.value.filter((it) => it.id != item.id)
      console.log(itemUpdate)
      emit('update:items', itemUpdate)
    },
  },

  {
    text: 'Save',
    actionType: ButtonActionEnum.Save,
    callBack: (item) => {
      //const itemUpdate = internalItems.filter((it) => it.id != item.id)
      //emit('update:items', itemUpdate)
      item.state = ButtonActionEnum.None
    },
  },
  {
    text: 'Cancel',
    actionType: ButtonActionEnum.Cancel,
    callBack: (item) => {
      console.log(item)
      Object.entries(backupData).forEach(([key, value]) => {
        item[key] = value
      })

      item.state = ButtonActionEnum.None
    },
  },
]
</script>

<style></style>
