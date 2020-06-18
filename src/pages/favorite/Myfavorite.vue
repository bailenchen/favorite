<template>
  <div>
    <top-bar></top-bar>
    <div class="container">
      <collect-bar></collect-bar>
      <main class="main">
        <div class="main-menu">
          <div class="main-menu-left">
            <div class="main-menu-left-active"><span>全部</span></div>
            <div class="main-menu-left-item"><span>网页</span></div>
            <div class="main-menu-left-item"><span>图片</span></div>
            <div class="main-menu-left-item"><span>文本</span></div>
          </div>
        </div>
        <router-view></router-view>
      </main>
    </div>
    <div
      ref="shade1"
      class="shade"
      v-show="isShow_addUrl"
      @click.stop="cancelShade1"
    >
      <add-url @click.stop=""></add-url>
    </div>

    <div
      ref="shade2"
      class="shade"
      v-show="isShow_editUrl"
      @click.stop="cancelShade2"
    >
      <edit-url @click.stop=""></edit-url>
    </div>
    <div
      ref="shade3"
      class="shade"
      v-show="isShow_editFloder"
      @click.stop="cancelShade3"
    >
      <edit-floder></edit-floder>
    </div>
  </div>
</template>

<script>
import Topbar from './components/TopBar.vue'
import Collectbar from './components/CollectBar.vue'
import addUrl from './components/addUrl.vue'
import editUrl from './components/editUrl.vue'
import editFloder from './components/editFloder.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      limit: 10
    }
  },
  computed: {
    ...mapState('collect', [
      'total',
      'isShow_addUrl',
      'isShow_editUrl',
      'isShow_editFloder'
    ])
  },

  methods: {
    ...mapActions('collect', [
      'getCollects',
      'set_addUrl',
      'set_editUrl',
      'set_editFloder',
      'isHave'
    ]),

    cancelShade1(e) {
      if (e.target === this.$refs.shade1) {
        this.set_addUrl()
      }
    },
    cancelShade2(e) {
      if (e.target === this.$refs.shade2) {
        this.set_editUrl()
      }
    },
    cancelShade3(e) {
      if (e.target === this.$refs.shade3) {
        this.set_editFloder()
      }
    }
  },
  components: {
    'top-bar': Topbar,
    'collect-bar': Collectbar,
    'add-url': addUrl,
    'edit-url': editUrl,
    'edit-floder': editFloder
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}

.container .main {
  flex-grow: 1;
  background: #f5f5f5;
}

.shade {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.main-menu {
  display: flex;
  position: relative;
  width: 100%;
  height: 50px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 20px;
  box-sizing: border-box;
  padding: 0px 20px;
}
.main-menu-left {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.main-menu-left-active {
  height: 100%;
  font-size: 13px;
  box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px,
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px;
  color: rgb(61, 75, 249);
  cursor: pointer;
  white-space: nowrap;
  background-color: rgb(255, 255, 255);
  margin: 0px 10px;
  padding: 6px 18px;
  border-radius: 100px;
}

.main-menu-left-item {
  height: 100%;
  font-size: 13px;
  box-shadow: none;
  color: rgb(0, 0, 0);
  cursor: pointer;
  white-space: nowrap;
  margin: 0px 10px;
  padding: 6px 18px;
  border-radius: 100px;
}
</style>
