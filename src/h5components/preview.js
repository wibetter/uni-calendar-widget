import * as React from 'react';
import ReactDOM from 'react-dom';
import VueCalendar from './uni-cus-calendar/calendar.vue'; // 导入组件
import { createVue3Component } from 'vue3-aipage-widget';
const UniCalendar = createVue3Component(VueCalendar);

ReactDOM.render(
  <>
    <UniCalendar />
  </>,
  document.getElementById('root'),
);
