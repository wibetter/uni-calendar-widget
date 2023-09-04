/**
 * @file 编辑器扩展, 增加自定义插件（组件物料面板展示需要）
 */
// @ts-ignore
import { registerPlugin } from 'vue3-aipage-widget/dist/index.umd';

const calendarPlugin = {
  name: '日历',
  description: '日历组件，支持搭配自由列表实现日程效果',
  componentId: 'uni-cus-calendar',
  id: 'uni-cus-calendar',
  tags: ['日历'], // 组件分类
  pluginIcon: 'chart-plugin',
  order: 1, // 展示顺序（从小到大展示）
  type: 'element', // 渲染器类型
  device: ['mobile', 'app'], // 设置类型，目前支持3种类型: pc、mobile、app
  docLink: '',
  demoProperties: {
    componentId: 'uni-cus-calendar',
    type: 'element',
    componentProperties: {
      data: {
      },
      style: {},
    },
  },
  panelControls: {
    type: 'tabs',
    tabs: [
      {
        title: '属性',
        controls: [
          {
            type: 'collapse',
            title: '数据',
            controls: [
              {
                name: 'data.items',
                type: 'setting-list',
                label: '日历数据',
                mode: 'normal',
                fullSize: true,
                setting: [
                  {
                    type: 'input-date',
                    name: 'date',
                    format: "YYYY-MM-DD",
                    label: '日期'
                  },
                  {
                    type: 'input-text',
                    name: 'tip',
                    label: '提示'
                  },
                  {
                    type: 'input-color',
                    name: 'color',
                    label: '文字颜色'
                  },
                  {
                    type: 'switch',
                    name: 'dot',
                    label: '显示圆点'
                  },
                  {
                    type: 'input-color',
                    name: 'dotColor',
                    visibleOn: 'this.dot',
                    label: '圆点颜色'
                  }
                ],
                enableDataBinding: true, // 有这个属性则组件会自动开启动态数据绑定
              },
              {
                type: 'select',
                label: '选中日期',
                name: 'data.selectDay',
                bindData: 'variable',
                required: true,
                desc: '选中日期将自动赋值给此页面变量',
              },
            ],
          },
        ],
      },
      {
        title: '外观',
        controls: [
          {
            title: '布局',
            type: 'collapse',
            controls: [
              {
                name: 'style',
                type: 'whSet',
                label: '宽高',
                options: [
                  {
                    label: '宽',
                    value: 'width',
                  },
                  {
                    label: '高',
                    value: 'height',
                  },
                ],
              },
            ],
          },
          {
            title: '组件',
            type: 'collapse',
            controls: [
              {
                name: 'style.color',
                type: 'input-color',
                label: '提示颜色'
              },
              {
                name: 'style.dotColor',
                type: 'input-color',
                label: '圆点颜色'
              },
              {
                name: 'style.activeColor',
                type: 'input-color',
                label: '激活色'
              },
            ],
          },
        ],
      },
      {
        title: '事件',
        controls: [
          {
            name: 'data.event',
            type: 'event',
            label: false,
            events: ['change'],
          },
        ],
      },
    ],
  },
};

// 注册自定义插件（aipage-editor组件物料面板需要）
registerPlugin(calendarPlugin);

export default calendarPlugin;
