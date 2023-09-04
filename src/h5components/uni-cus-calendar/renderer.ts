// 注册自定义组件（aipage-editor渲染器需要）
// @ts-ignore
import { registerRenderer } from 'vue3-aipage-widget/dist/index.umd';
// @ts-ignore
import calendar from './calendar.vue';

registerRenderer(calendar, {
  type: 'uni-cus-calendar',
  framework: 'vue3',
});
