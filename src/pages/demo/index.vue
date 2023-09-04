<template>
  <div class="content">
    <UniCalendar :extraData="extraData" @click-active="clickActive" />
  </div>
</template>

<script setup lang="ts">
import UniCalendar from '../../components/uni-cus-calendar/uni-cus-calendar.vue'; // 导入组件

const extraData = [
  {
    date: '2023-3-12',
    tip: '签到',
    color: 'yellow',
    dotColor: 'green',
    dot: true,
  },
  {
    date: '2023-03-14',
    tip: 'test',
    color: 'red',
    dot: true,
  },
];

function clickActive(options: any) {
  console.log('click date', options);
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
