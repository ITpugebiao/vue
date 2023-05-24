<template>
  <div class="layout-navbars-breadcrumb-user">
    <el-tooltip
      effect="dark"
      :content="$t('navbar.eliminate')"
      placement="bottom"
    >
      <div class="top-item">
        <i
          class="el-icon-refresh"
          @click="clearAway"
        />
      </div>
    </el-tooltip>
    <!-- <el-tooltip
      effect="dark"
      :content="$t('navbar.language')"
      placement="bottom"
    >
      <div class="top-item top-item-show">
        <top-lang />
      </div>
    </el-tooltip> -->
    <el-tooltip
      v-if="showFullScren"
      effect="dark"
      :content="isFullScren?$t('navbar.screenfullF'):$t('navbar.screenfull')"
      placement="bottom"
    >
      <div class="top-item">
        <i
          class="basic-icon"
          :class="isFullScren?'basic-icon-tuichuquanping-copy':'basic-icon-quanping'"
          @click="handleScreen"
        />
      </div>
    </el-tooltip>

    <img
      class="top-img"
      :src="userInfo.avatar || 'https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'"
      onerror="src='https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'"
    >
    <el-dropdown slot="dropdown">
      <span class="el-dropdown-link">
        <i class="el-icon-caret-bottom" />
      </span>
      <el-dropdown-menu>
        <el-dropdown-item>
          <router-link to="/">
            {{ $t('navbar.dashboard') }}
          </router-link>
        </el-dropdown-item>
        <el-dropdown-item
          divided
          @click.native="logout"
        >
          {{ $t('navbar.logOut') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, listenerfullscreen } from '~/utils/util'
// import topLang from './topLang.vue'
import { ClearTestEnvironment, ClearProdEnvironment } from '~/api/eliminate'
import {
  Cookie,
  Key
} from '../../../utils/cookie'

export default {
  components: {
    // topLang
  },
  data() {
    return {
      showColor: true,
      showDebug: true,
      showTheme: true,
      showFullScren: true,
      userInfo: {
        avatar: ''
      }
    }
  },

  computed: {
    ...mapState({

    }),
    ...mapGetters([
      'isCollapse',
      'isFullScren',
      'themeConfig'
    ]),
    setHeaderHeight() {
      const { layout } = this.themeConfig
      if (layout !== 'classic') {
        return '84px'
      }
      return '100px'
    }
  },

  mounted() {
    listenerfullscreen(this.setScreen)
    console.log(JSON.parse(Cookie.get(Key.userInfoKey)))
    this.ImageUrl()
  },

  methods: {
    setCollapse() {
      this.$store.commit('common/SET_COLLAPSE')
    },
    ImageUrl() {
      this.userInfo.avatar = JSON.parse(Cookie.get(Key.userInfoKey)).imageUrl
    },
    logout() {
      this.$confirm(this.$t('logoutTip'), this.$t('tip'), {
        confirmButtonText: this.$t('submitText'),
        cancelButtonText: this.$t('cancelText'),
        type: 'warning'
      }).then(() => {
        window.location.href = `${process.env.VUE_APP_AUTH_URL}/logout?redirectURL=${window.location.href}`
      }).catch(() => {})
    },

    setScreen() {
      this.$store.commit('common/SET_FULLSCREN')
    },

    handleScreen() {
      fullscreenToggel()
    },
    clearAway() {
      if (process.env.NODE_ENV === 'production') {
        ClearProdEnvironment().then(() => {
          this.$message.success('清除缓存成功')
        })
      } else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
        ClearTestEnvironment().then(() => {
          this.$message.success('清除缓存成功')
        })
      }
    }
  }
}
</script>

<style lang="scss">
.layout-navbars-breadcrumb-user {
    display: flex;
	align-items: center;
	justify-content: flex-end;
}
.top-right {
    height: 64px;
    position: absolute;
    top: 0;
    i{
        line-height: 64px;
    }
}

.top-left {
    left: 20px;
}

.top-right {
    right: 25px;
    display: flex;
    align-items: center;
}

.top-item {
    position: relative;
    height: 64px;
    margin:0 10px;
    font-size: 16px;
    align-items: center;
    display: flex;
    .el-badge__content.is-fixed{
        top:12px;
        right: 5px;
    }
}

.top-img {
  margin: 0 8px 0 5px;
  padding: 2px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 1px solid #eee;
  vertical-align: middle;
}

</style>
