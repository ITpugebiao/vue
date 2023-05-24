
<template>
  <div class="WelcomeFather">
    <div class="welcome">
      <div class="welcomeLeft stadus">
        <welcomeTopOne />
        <welcomeTopTwo />
        <welcomeTopThree />
      </div>
      <div class="welcomeRight">
        <welcomeRightOne />
        <div class="welcomeRightTwo">
          <welcomeRightTwoLeft />
          <welcomeRightTwoRight />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import welcomeTopOne from './moudle/welcomeTopOne.vue'
import welcomeTopTwo from './moudle/welcomeTopTwo.vue'
import welcomeTopThree from './moudle/welcomeTopThree.vue'
import welcomeRightOne from './moudle/welcomeRightOne.vue'
import welcomeRightTwoLeft from './moudle/welcomeRightTwoLeft.vue'
import welcomeRightTwoRight from './moudle/welcomeRightTwoRight.vue'
export default {
  name: 'PugePersonnelMattersSystemIndex',
  components: {
    welcomeTopOne,
    welcomeTopTwo,
    welcomeTopThree,
    welcomeRightTwoLeft,
    welcomeRightTwoRight,
    welcomeRightOne
  },

  data() {
    return {}
  },
  created() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/animation.scss';
@import '../../assets/styles/welcome.scss';

.state {
	animation: fBig 0.5s alternate 6;
}

.welcome > .welcomeRight > .welcomeRightOne {
	animation: rollInRight 1000ms both;
}
.welcome > .welcomeLeft > .welcomeRightOne {
	animation: rollInRight 1000ms both;
}
.welcome > .welcomeLeft > .welcomeTopOne {
	animation: rollInLeft 1000ms both;
}
.welcome > .welcomeLeft > .welcomeTopTwo {
	animation: zoomInUp 1000ms both;
}
.welcome > .welcomeLeft > .welcomeTopThree {
	animation: zoomInUp 1000ms both;
}
.welcomeRight > .welcomeRightTwo > .welcomeRightTwoRight {
	animation: bounceRotateInRight 1000ms both;
}
.welcomeRight > .welcomeRightTwo > .welcomeRightTwoLeft {
	animation: bounceInDown 1000ms both;
}
</style>
