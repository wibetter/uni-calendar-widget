<template>
  <view class="date-box">
    <view class="box-list">
      <view class="date-top">
        <view class="icon left-icon" @click="LastYear">
          <view class="iconfont icon-jiantou_xiangzuoliangci"></view>
        </view>
        <view class="conter-text">
          <view class="icon left-icon" @click="LastMonth">
            <view class="iconfont icon-xiangzuo1"></view>
          </view>
          <text class="month">{{ year }}年{{ month }}月</text>
          <view class="icon rigth-icon" @click="NextMonth">
            <view class="iconfont icon-xiangyou1"></view>
          </view>
        </view>
        <view class="icon rigth-icon" @click="NextYear">
          <view class="iconfont icon-jiantou_xiangyouliangci"></view>
        </view>
      </view>
      <view class="date-week">
        <view class="week-item" v-for="item in weekList" :key="item">
          <text>周{{ item }}</text>
        </view>
      </view>
      <view
        class="day-content"
        :style="{ height: isOpen ? '100rpx' : 'auto' }"
        v-if="dayList.length > 0"
      >
        <view class="day-item day-month" v-if="!isOpen"
          ><text>{{ month < 10 ? `0${month}` : month }}</text></view
        >
        <view
          class="day-item"
          v-for="(item, index) in dayList"
          :key="index"
          :data-index="index"
          @click="toActive(item, index)"
        >
          <text
            class="day-text"
            v-if="item.day"
            :class="{
              actives: item.day === day,
              current:
                item.day === now.day &&
                month === now.month &&
                year === now.year,
            }"
            :style="{
              backgroundColor:
                item.day === day ||
                (item.day === now.day &&
                  month === now.month &&
                  year === now.year)
                  ? activeColor
                  : undefined,
            }"
            >{{ item.day ? item.day : '' }}</text
          >
          <text
            class="value-text"
            v-if="item.data.tip"
            :style="{ color: item.data.color || color }"
            >{{ item.data.tip }}</text
          >
          <text
            class="day-dot"
            :style="{ backgroundColor: item.data.dotColor || dotColor }"
            v-if="item.data.dot"
          ></text>
        </view>
      </view>
      <view style="width: 100%" v-if="isShrink">
        <view class="toggle" v-if="isOpen" @click="toShrinkClose">
          <view class="iconfont icon-shousuo"></view>
        </view>
        <view class="toggle" v-else @click="toShrink">
          <view class="iconfont icon-zhankai"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
/* #ifndef H5 */
import { usePageStore } from '@/store/page';
/* #endif */

export default {
  name: 'cusCalendar',
  inject: ['pageId'],
  props: {
    weekList: {
      type: Array,
      default: () => ['日', '一', '二', '三', '四', '五', '六'],
    },
    date: {
      type: Object,
      default: () => {
        return {
          year: new Date().getFullYear(),
          month: parseInt(new Date().getMonth() + 1),
          day: parseInt(new Date().getDate()),
        };
      },
    },
    isShrink: {
      type: Boolean,
      default: false,
    },
    isUnfold: {
      type: Boolean,
      default: false,
    },
    componentProperties: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      color: '#dd6161',
      dotColor: '#dd6161',
      activeColor: 'red',
      extraData: [],
      dayList: [],
      year: 2022,
      month: 10,
      day: 10,
      now: {},
      isOpen: false,
    };
  },
  onLoad() {},
  created() {
    this.isOpen = this.isUnfold;
    this.extraData = this.componentProperties?.data?.items || [];
    this.initColor();

    const { year, month, day } = this.date;
    this.year = year;
    this.month = month;
    this.day = day;
    this.now = this.getTimeNowDate();
    this.initApi(this.year, this.month);
    setTimeout(() => {
      this.selectDay();
    }, 300);
  },
  beforeUpdate() {
    // 确保编辑器端，右侧属性配置面板调整后图表会及时更新
    this.extraData = this.componentProperties?.data?.items || [];
    this.initColor();
    this.initApi(this.year, this.month);
  },
  methods: {
    initColor() {
      let { color, dotColor, activeColor } =
        this.componentProperties?.style || {};

      if (dotColor) {
        this.dotColor = dotColor;
      }
      if (color) {
        this.color = color;
      }
      if (activeColor) {
        this.activeColor = activeColor;
      }
    },
    toShrink() {
      let falg = null;
      const dateArr = this.getTime(this.year, this.month);
      const line = dateArr.map((item, index) => {
        if (this.day == item.day) {
          falg = Math.floor(index / 7);
          return Math.floor(index / 7);
        }
      });
      this.dayList = dateArr.slice(falg * 7, (falg + 1) * 7);
      this.isOpen = true;
    },
    toShrinkClose() {
      this.dayList = this.getTime(this.year, this.month);
      this.isOpen = false;
    },
    getTimeNowDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = parseInt(date.getMonth() + 1);
      var day = date.getDate();
      if (month < 10) {
        month = '0' + month;
      }

      if (day < 10) {
        day = '0' + day;
      }

      const resultDate = {
        year: year,
        month: parseInt(month),
        day: parseInt(day),
      };

      return resultDate;
    },

    initApi(year, month) {
      if (this.isShrink && this.isOpen) {
        this.toShrink();
      } else {
        this.dayList = this.getTime(year, month);
      }
    },
    getTime(year, month) {
      return this.creatDayList(year, month);
    },
    creatDayList(year, month) {
      const count = this.getDayNum(year, month);
      const week = new Date(year + '/' + month + '/1').getDay();
      let list = [];
      for (let i = 1; i <= count; i++) {
        let data = {};
        for (let item of this.extraData) {
          let dateString = item.date;
          let dateArr =
            dateString.indexOf('-') !== -1
              ? dateString.split('-')
              : dateString.indexOf('/') !== -1
              ? dateString.split('/')
              : [];
          if (
            dateArr.length === 3 &&
            Number(dateArr[0]) === Number(this.year) &&
            Number(dateArr[1]) === Number(this.month) &&
            Number(dateArr[2]) === Number(i)
          ) {
            data = item;
          }
        }

        let obj = { day: i, data };
        list.push(obj);
      }
      for (let i = 0; i < week; i++) {
        // list.unshift(this.getDayNum(year, month - 1) -i)
        list.unshift({ day: null, data: {} });
      }
      return list;
    },

    getDayNum(year, month) {
      let dayNum = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if ((year % 4 !== 0 && year % 100 === 0) || year % 400 !== 0) {
        dayNum[1] = 28;
      }
      return dayNum[month - 1];
    },

    toActive(item, index) {
      this.day = item.day;
      this.selectDay();
    },

    toTask(item, index) {
      this.$emit('click-task', { row: item, index: index });
    },

    selectDay() {
      this.$emit('click-active', {
        year: this.year,
        month: this.month,
        day: this.day,
        date: this.year + '-' + this.month + '-' + this.day,
      });

      let output = this.componentProperties?.data?.selectDay;
      let month = this.month < 10 ? `0${this.month}` : this.month;
      let day = this.day < 10 ? `0${this.day}` : this.day;
      if (output) {
        this.store?.setVariableValue(
          output,
          this.year + '-' + month + '-' + day,
        );
      }
      this.store?.handleAction('change', this);
    },

    LastMonth() {
      if (this.month > 1) {
        this.month = this.month - 1;
        this.initApi(this.year, this.month);
      } else {
        this.LastYear(false);
        this.month = 12;
        this.initApi(this.year, this.month);
      }
      this.$emit('last-month', { year: this.year, month: this.month });
      this.selectDay();
    },

    NextMonth() {
      if (this.month < 12) {
        this.month = this.month + 1;
      } else {
        this.NextYear(false);
        this.month = 1;
      }
      this.initApi(this.year, this.month);
      this.$emit('next-month', { year: this.year, month: this.month });
      this.selectDay();
    },

    LastYear(flag = true) {
      if (this.year > 2000) {
        this.year = this.year - 1;
        if (flag) {
          this.initApi(this.year, this.month);
        }
        this.$emit('last-year', {
          year: this.year,
          month: this.month,
          day: this.day,
        });
        this.selectDay();
      }
    },

    NextYear(flag = true) {
      this.year = this.year + 1;
      this.initApi(this.year, this.month);
      this.$emit('next-year', {
        year: this.year,
        month: this.month,
        day: this.day,
      });
      this.selectDay();
    },

    confirm() {
      this.$emit('confirm');
    },

    cancel() {
      this.$emit('cancel');
    },

    close() {
      this.$emit('close');
    },
  },
  computed: {
    store() {
      const store = usePageStore(this.pageId);
      return store;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'iconfont.css';
.date-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  color: #444;
  .box-list {
    border-radius: 20rpx;
    .date-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 20rpx;
      .icon {
        width: 50rpx;
        height: 50rpx;
        line-height: 50rpx;
        image {
          width: 50rpx;
          height: 50rpx;
        }
      }
      .conter-text {
        font-size: 32rpx;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .month {
          padding: 0 40rpx;
        }
      }
    }
    .date-week {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      padding: 20rpx;
      border-bottom: 1rpx solid #f3f4f6;
      .week-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100% / 7);
        height: 52rpx;
        text-align: center;
        font-size: 30rpx;
        color: #909193;
      }
    }
    .day-content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      padding: 10rpx 20rpx;
      position: relative;
      .day-item {
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        width: calc(100% / 7);
        height: 95rpx;
        text-align: center;
        font-size: 32rpx;
        z-index: 2;
        position: relative;
        .day-text {
          width: 65rpx;
          height: 65rpx;
          line-height: 65rpx;
          // margin-bottom: 5rpx;

          &.current {
            opacity: 0.4;
          }

          &.actives,
          &.current {
            color: #fff;
            box-sizing: border-box;
            border-radius: 6rpx;
            border-radius: 50%;
          }

          &.actives {
            opacity: 1;
          }
        }
        .value-text {
          font-size: 24rpx;
          color: #18b566;
          &.text-red {
            color: #dd6161;
          }
        }
        .day-dot {
          margin-top: 5rpx;
          background: #dd6161;
          border-radius: 50%;
          padding: 6rpx;
          position: absolute;
          bottom: 36rpx;
          &.dot-gray {
            background: #18b566;
          }
        }
      }
      .day-month {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        // color: rgba(231,232,234,.83);
        font-size: 200px;
        font-weight: 700;
        color: #999;
        opacity: 0.1;
        text-align: center;
        line-height: 1;
        z-index: 1;
      }
    }
    .toggle {
      position: relative;
      padding: 10rpx 0;
      margin: 10rpx 20rpx 0;
      display: flex;
      justify-content: center;
      &:before {
        width: calc(50% - 30rpx);
        border-top: solid 1px #eaeaea;
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      &:after {
        width: calc(50% - 30rpx);
        border-top: solid 1px #eaeaea;
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
