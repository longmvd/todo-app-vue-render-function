<template>
  <ListItem v-model:items="items">
    <template #itemOrder="{ data }">
      <div class="m-r-12">{{ (data as any ?? 1) - 1 }}</div></template
    >
    <template #itemAction="{data}">
      {{customAction(data)}}
      {{getVnText(data.action.text)}}
    </template>
    <template #="{data}">
      <div style="color: red">{{data.text}}</div>
    </template>
  </ListItem>
  <!-- <htmlEl></htmlEl>
  <ListItemRenderFunc ></ListItemRenderFunc> -->
</template>
<script setup lang="ts">
import { reactive, ref, h, computed, watch, createVNode } from 'vue'
import ListItem from './demo/ListItem.vue'
import { IItem } from './demo/interface';

const items = ref<IItem[]>([
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
  {
    id: 3,
    text: 'Onii-chan no baka',
    order: 3
  }
])

const htmlEl = 
createVNode('div', {
  innerText: 'Chạm tôi', 
  style:{fontSize: '23px', color: 'blue', cursor: 'pointer'},
  onClick(e:any){
  window.alert('Onii-chan sukebe!! dameo!!')}
})


const ListItemRenderFunc = ()=> h('div',[
  h('div', {innerText: 'Tu-đu lít-sờ-tờ', style:{fontSize: '23px', color: 'red'}}),
  h(ListItem, {
  items: items.value,
  "onUpdate:items":(data)=>{
    items.value = data
  },
},
//slot
{
  default:({data}:{data: IItem})=>{
    return h('div', {style:"color: red", innerText: data.text}, )
  },
  itemOrder:({data}:{data: number})=>{
    return h('div', { innerText: (data ?? 1) - 1, class:"m-r-12"}, )
  },
  itemAction:({data}:{data: IItem})=>{
    customAction(data)
    return getVnText(data.action.text)
  },
}
)]);

// watch(()=> items.value, (val)=> {
//   console.log(val);
  
//   ListItemRenderFunc.
// })














// #region custom slot
function customAction(data:any){
  data.action.afterExecuted = (item: IItem)=> alert(data.action.text, item)
  console.log(data);
}


function getVnText(data: string){
  const dic:any = {
    ['Edit']: 'Sửa',
    ['Delete']: 'Xóa',
    ['Cancel']: 'Hủy',
    ['Save']: 'Lưu'
  }
  return dic[data];
}

function alert(action:string, e:IItem){
  const preMsg = ['Cancel', 'Save', 'Delete'].includes(action) ? 'Đã' : 'Bắt đầu';
  setTimeout(() => {
    window.alert(`${preMsg} ${getVnText(action)} ${e.text}`);
  }, 100)
}
//#endregion
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
  align-items: left;
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
