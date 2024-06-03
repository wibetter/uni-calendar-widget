// 注册自定义组件（aipage-editor渲染器需要）
// @ts-ignore
import { registerRenderer } from 'vue3-aipage-widget';
// @ts-ignore
import calendar from '../src/components/uni-cus-calendar/uni-cus-calendar.vue';

registerRenderer(calendar, {
  type: 'uni-cus-calendar',
  framework: 'vue3',
});
