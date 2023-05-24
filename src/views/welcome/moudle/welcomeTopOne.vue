<template>
  <div class="welcomeTopOne">
    <div id="clock">
      <div id="time">
        <div>
          <span id="hour">{{ h }}</span>
        </div>
        <div>
          <span id="minute">{{ m }}</span>
        </div>
        <div>
          <span id="second">{{ s }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PugePersonnelMattersSystemClock',

  data() {
    return {
      h: '',
      m: '',
      s: ''
    }
  },

  mounted() {
    this.getTime()
    setInterval(() => {
      this.getTime()
    }, 1000)
  },

  methods: {
    getTime() {
      this.h = new Date().getHours()
      this.m = new Date().getMinutes()
      this.s = new Date().getSeconds()
      if (this.h < 10) {
        this.h = '0' + this.h
      }
      if (this.m < 10) {
        this.m = '0' + this.m
      }
      if (this.s < 10) {
        this.s = '0' + this.s
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#time div {
	width: 70px;
	height: 70px;
	float: left;
}

#clock {
	min-height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
}

#clock #time div {
	position: relative;
	margin: 0 15px;
}

#clock #time div span {
	position: relative;
	display: block;
	width: 70px;
	height: 70px;
	background: #ec0062;
	color: #fff;
	font-weight: 300;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2.5em;
	z-index: 10;
	border-radius: 15px;
}

#clock #time div span:nth-child(2) {
	height: 30px;
	font-size: 0.8em;
	letter-spacing: 0.2em;
	font-weight: 500;
	z-index: 9;
	box-shadow: none;
	text-transform: uppercase;
}
#clock #time div:nth-child(2) span {
	background: #0099ff;
}

#clock #time div:last-child span {
	background: #99ccff;
}
</style>
