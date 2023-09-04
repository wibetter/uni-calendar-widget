/*! For license information please see uniCusCalendarPlugin.umd.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.aipageWidget=t():e.aipageWidget=t()}(this,(function(){return function(){"use strict";var e={"vue3-aipage-widget/dist/index.umd":function(e){e.exports=require("vue3-aipage-widget/dist/index.umd")}},t={};function n(o){var l=t[o];if(void 0!==l)return l.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return function(){n.r(o);var e={name:"日历",description:"日历组件，支持搭配自由列表实现日程效果",componentId:"uni-cus-calendar",id:"uni-cus-calendar",tags:["日历"],pluginIcon:"chart-plugin",order:1,type:"element",device:["mobile","app"],docLink:"",demoProperties:{componentId:"uni-cus-calendar",type:"element",componentProperties:{data:{},style:{}}},panelControls:{type:"tabs",tabs:[{title:"属性",controls:[{type:"collapse",title:"数据",controls:[{name:"data.items",type:"setting-list",label:"日历数据",mode:"normal",fullSize:!0,setting:[{type:"input-date",name:"date",format:"YYYY-MM-DD",label:"日期"},{type:"input-text",name:"tip",label:"提示"},{type:"input-color",name:"color",label:"文字颜色"},{type:"switch",name:"dot",label:"显示圆点"},{type:"input-color",name:"dotColor",visibleOn:"this.dot",label:"圆点颜色"}],enableDataBinding:!0},{type:"select",label:"选中日期",name:"data.selectDay",bindData:"variable",required:!0,desc:"选中日期将自动赋值给此页面变量"}]}]},{title:"外观",controls:[{title:"布局",type:"collapse",controls:[{name:"style",type:"whSet",label:"宽高",options:[{label:"宽",value:"width"},{label:"高",value:"height"}]}]},{title:"组件",type:"collapse",controls:[{name:"style.color",type:"input-color",label:"提示颜色"},{name:"style.dotColor",type:"input-color",label:"圆点颜色"},{name:"style.activeColor",type:"input-color",label:"激活色"}]}]},{title:"事件",controls:[{name:"data.event",type:"event",label:!1,events:["change"]}]}]}};(0,n("vue3-aipage-widget/dist/index.umd").registerPlugin)(e),o.default=e}(),o}()}));