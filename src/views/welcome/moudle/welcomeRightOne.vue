<template>
  <div class="welcomeRightOne">
    <div class="UserAvater">
      <PanThumb :image="image" />
    </div>
  </div>
</template>

<script>
import PanThumb from '../../../components/PanThumb/index.vue'
import { Cookie, Key } from '~/utils/cookie'
export default {
  name: 'PugePersonnelMattersSystemWelcomerightone',
  components: {
    PanThumb
  },
  data() {
    return {}
  },
  computed: {
    image() {
      return JSON.parse(Cookie.get(Key.userInfoKey)).imageUrl
    }
  },
  mounted() {
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.UserAvater {
	width: 20%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
