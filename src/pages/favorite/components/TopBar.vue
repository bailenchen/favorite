<template>
  <div id="top-bar">
    <div class="menu">
      <div class="fold">
        <i class="iconfont icon-caidan"></i>
      </div>
      <div class="logo"></div>
      <div class="folder" :title="floderName">{{ floderName }}</div>
      <div class="search">
        <div class="search-icon">
          <i class="iconfont icon-sousuo"></i>
        </div>
        <input
          v-model="keyword"
          @keydown.enter="search"
          placeholder="搜索"
          value=""
        />
      </div>
    </div>
    <div class="card">
      <div class="add">
        <i
          class="iconfont icon-tianjia3"
          style="font-size: 30px;"
          @click="add"
        ></i>
      </div>
      <div class="user">
        <div class="face"></div>
        <div class="username" @click="userPlaneVisible = !userPlaneVisible">
          {{ userInfo }}
          <m-plane
            class="user-plane"
            :items="items"
            @a1="handleClick"
            :visible="userPlaneVisible"
          ></m-plane>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mplane from '@/components/Plane.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      limit: 10,
      keyword: '',
      floderName: '我的收藏',
      addPlaneVisible: false, // 小面板显示与否
      userPlaneVisible: false, // 小面板显示与否
      items: [
        {
          icon: 'el-icon-user',
          text: '用户中心'
        },
        {
          icon: 'el-icon-switch-button',
          text: '退出登录'
        }
      ]
    }
  },
  created() {
    this.floderName = this.$route.query.floder
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    ...mapActions('collect', ['set_addUrl', 'getCollects']),
    add() {
      this.set_addUrl()
    },
    async search() {
      this.$router.push({
        path: '/favorite/search',
        query: { q: this.keyword }
      })
      var { data } = await this.$http({
        url: '/favorite/search',
        params: {
          keyword: encodeURI(this.keyword),
          start: 0,
          limit: this.limit
        }
      })
      if (data.code === 200) this.getCollects(data)
    },
    handleClick(index) {
      switch (index) {
        case 0:
          // this.$router.push('/user')
          break
        case 1:
          // 清理sessionStorage中的登录信息
          sessionStorage.clear()
          this.$router.push('/login')
          break
      }
    }
  },
  watch: {
    $route(to, from) {
      this.floderName = to.query.floder
    }
  },
  components: {
    'm-plane': Mplane
  }
}
</script>

<style lang="less" scoped>
#top-bar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 8px;
  z-index: 9;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  filter: none;
  background: rgb(255, 255, 255);
  padding: 0px 30px;
  transition: background-color 0.4s ease 0s;

  .menu {
    height: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex: 1 1 0%;
  }
}
.fold {
  height: 40px;
  width: 40px;
  cursor: pointer;
  margin-left: -11px;
  margin-right: 20px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 50%;
  transition: all 0.4s ease 0s;
}
.fold:hover {
  background-color: rgb(245, 245, 245);
}

.logo {
  height: 40px;
  cursor: pointer;
  width: 60px;
  padding-left: 38px;
  padding-right: 20px;
  font-size: 22px;
  color: #3d4bf9;
  line-height: 40px;
  background: url(~@/assets/logo.png);
  background-position: left center;
  background-size: 118px 40px;
}

.folder {
  font-size: 17px;
  color: rgb(61, 75, 249);
  line-height: 30px;
  display: block;
  max-width: 120px;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0px 20px;
  border-left: 1px solid rgb(222, 222, 222);
  overflow: hidden;
}

.search {
  height: 44px;
  max-width: 1000px;
  margin-left: 12px;
  display: flex;
  flex: 1 1 0%;
  background: rgba(0, 0, 0, 0.04);
  transition: background 100ms ease-in 0s, width 100ms ease-out 0s;
  border-radius: 4px;
}

.search .search-icon {
  width: 54px;
  height: 100%;
  cursor: pointer;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.search input {
  outline: none;
  height: 100%;
  color: rgb(0, 0, 0);
  font-size: 16px;
  flex: 1 1 0%;
  background: transparent;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
}

.card {
  margin-left: 50px;
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.add {
  position: relative;
  display: flex;
  height: 100%;
  width: 48px;
  cursor: pointer;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.user {
  position: relative;
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
}

.face {
  position: relative;
  width: 30px;
  height: 30px;
  margin-right: 12px;
  border-radius: 17px;
  background: url('~@/assets/face.jpg') center center / cover no-repeat;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
}

.username {
  color: rgb(61, 75, 249);
  text-align: right;
  font-size: 16px;
  position: relative;
}
</style>
