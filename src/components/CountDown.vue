<template>
  <div class="main">
    <div class="main-content">
      <span class="label">现在时间: </span>
      <span class="num">{{ currentHours }}</span>
      <span class="sub-label">时</span>
      <span class="num">{{ currentMinutes }}</span>
      <span class="sub-label">分</span>
      <span class="num">{{ currentSeconds }}</span>
      <span class="sub-label">秒</span>
      <span class="sub-day-label">&nbsp; {{ currentDay }}</span>
    </div>
    <div class="rest-six-content" v-show="restSixHours > -1">
      <span class="label">距离18:00还有: </span>
      <span class="num">{{ restSixHours }}</span>
      <span class="sub-label">小时</span>
      <span class="num">{{ restMinutes }}</span>
      <span class="sub-label">分钟</span>
      <span class="num">{{ restSeconds }}</span>
      <span class="sub-label">秒</span>
    </div>
    <div class="hasbeen-sixed" v-show="restSixHours <= -1">
      已经过了18:00啦!
    </div>
    <div
      class="rest-nine-content"
      v-show="restNineHours > -1 && restSixHours <= -1"
    >
      <span class="label">距离21:00还有: </span>
      <span class="num">{{ restNineHours }}</span>
      <span class="sub-label">小时</span>
      <span class="num">{{ restMinutes }}</span>
      <span class="sub-label">分钟</span>
      <span class="num">{{ restSeconds }}</span>
      <span class="sub-label">秒</span>
    </div>
    <div class="hasbeen-nined" v-show="restNineHours <= -1">
      已经过了21:00啦!
    </div>
    <div
      class="rest-twelve-content"
      v-show="restTwelveHours > -1 && restNineHours <= -1"
    >
      <span class="label">距离24:00还有: </span>
      <span class="num">{{ restTwelveHours }}</span>
      <span class="sub-label">小时</span>
      <span class="num">{{ restMinutes }}</span>
      <span class="sub-label">分钟</span>
      <span class="num">{{ restSeconds }}</span>
      <span class="sub-label">秒</span>
    </div>
    <!-- 到凌晨7点不再展示 -->
    <div class="hasbeen-nined" v-show="restTwelveHours >= 17">
      已经过了24:00啦!
    </div>
    <div v-show="restFiveDay !== 0" class="rest-fiveday-content">
      <span class="label">距离周五还有: </span>
      <span class="num">{{ restFiveDay }}</span>
      <span class="sub-label"> 天</span>
    </div>
    <div v-show="restFiveDay === 0" class="today-friday">今天是周五！！！</div>
  </div>
</template>

<script>
export default {
  name: "CountDown",
  data() {
    return {
      weekMapList: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      timer: null,
      restFiveDay: "0",
      restSixHours: 0,
      restNineHours: 0,
      restTwelveHours: 0,
      restMinutes: 0,
      restSeconds: 0,
      currentDay: 0,
      currentHours: 0,
      currentMinutes: 0,
      currentSeconds: 0,
    };
  },
  created() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const tarSixHours = 18;
      const tarNineHours = 21;
      const tarTwelveHours = 24;

      this.timer = setInterval(() => {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const curHours = currentDate.getHours();
        const curMinutes = currentDate.getMinutes();
        const curSeconds = currentDate.getSeconds();
        this.currentDay = this.weekMapList[currentDay - 1];
        this.restFiveDay = 5 >= currentDay ? 5 - currentDay : currentDay;
        this.restSixHours = this.formatNum(tarSixHours - curHours - 1);
        this.restNineHours = this.formatNum(tarNineHours - curHours - 1);
        this.restTwelveHours = this.formatNum(tarTwelveHours - curHours - 1);
        this.restMinutes = this.formatNum(60 - curMinutes - 1);
        this.restSeconds = this.formatNum(60 - curSeconds);
        this.currentHours = this.formatNum(curHours);
        this.currentMinutes = this.formatNum(curMinutes);
        this.currentSeconds = this.formatNum(curSeconds);
      }, 1000);
    },
    formatNum(v) {
      if (0 <= v && v < 10) {
        return "0" + v;
      }

      return v;
    },
  },
  unmounted() {
    clearInterval(this.timer);
    this.timer = null;
  },
  computed: {},
};
</script>

<style lang='less' scoped>
.main {
  .label {
    font-size: 30px;
    color: #99cc33;
  }

  .num {
    color: #ff9900;
    font-size: 40px;
    padding: 0 10px;
  }

  .sub-label {
    font-size: 30px;
    color: #ffcc00;
  }

  .sub-day-label {
    font-size: 30px;
    color: #ff9933;
  }

  .today-friday {
    color: #0099cc;
    font-size: 40px;
  }

  .hasbeen-sixed {
    font-size: 35px;
    color: #ff9900;
  }

  .hasbeen-nined {
    font-size: 45px;
    color: #cccc33;
  }
}
</style>
