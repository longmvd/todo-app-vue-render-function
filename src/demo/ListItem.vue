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
          @click="() => {action.callBack(item, action.afterExecuted)}"
        >
          <slot name="itemAction" :data="{action, item}">{{ action.text }}</slot>
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { h, computed, ref, toRef } from 'vue'
import { IItem } from '../demo/interface'
import { IButtonAction } from '../demo/interface'
import { ButtonActionEnum } from '../demo/enum'
const props = defineProps<{
  items: IItem[]
}>()

const mode = ref(ButtonActionEnum.None)

const internalItems = computed(() => props.items)
const emit = defineEmits<{
  (e: 'update:items', items: IItem[]): void
}>()
let backupData = {}
const itemEditing = ref<IItem>({})

const actions: IButtonAction[] = [
  {
    text: 'Add',
    actionType: ButtonActionEnum.Add,
    callBack: (item, afterExcecuted) => {
      const listUpdate = [...internalItems.value]
      item.order = listUpdate.length + 1
      item.id = listUpdate.length + 1
      listUpdate.push(item)
      emit('update:items', listUpdate)
      itemEditing.value = {}
      afterExcecuted && afterExcecuted(item)
    },
  },
  {
    text: 'Edit',
    actionType: ButtonActionEnum.Edit,
    callBack: (item, afterExcecuted) => {
      backupData = { ...item }
      item.state = ButtonActionEnum.Edit
      afterExcecuted && afterExcecuted(item)

    },
  },
  {
    text: 'Delete',
    actionType: ButtonActionEnum.Delete,
    callBack: (item, afterExcecuted) => {
      const itemUpdate = internalItems.value.filter((it) => it.id != item.id)
      console.log(itemUpdate)
      emit('update:items', itemUpdate)
      afterExcecuted && afterExcecuted(item)
    },
  },

  {
    text: 'Save',
    actionType: ButtonActionEnum.Save,
    callBack: (item, afterExcecuted) => {
      //const itemUpdate = internalItems.filter((it) => it.id != item.id)
      //emit('update:items', itemUpdate)
      item.state = ButtonActionEnum.None
      afterExcecuted && afterExcecuted(item)

    },
  },
  {
    text: 'Cancel',
    actionType: ButtonActionEnum.Cancel,
    callBack: (item, afterExcecuted) => {
      console.log(item)
      Object.entries(backupData).forEach(([key, value]) => {
        item[key] = value
      })

      item.state = ButtonActionEnum.None
      afterExcecuted && afterExcecuted(item)
    },
  },
]
</script>

<style></style>
